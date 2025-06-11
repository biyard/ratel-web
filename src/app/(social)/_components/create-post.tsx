'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  Fragment,
} from 'react';
import {
  ImagePlus,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  X,
} from 'lucide-react';

import DoubleArrowDown from '@/assets/icons/double-arrow-down.svg';
import UserCircleIcon from '@/assets/icons/user-circle.svg';
import Certified from '@/assets/icons/certified.svg';
import { cn } from '@/lib/utils';
import { useUserInfo } from '@/lib/api/hooks/users';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  EditorState,
  $getRoot,
  TextFormatType,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
  $createParagraphNode,
} from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import FileUploader from '@/components/file-uploader';
import { logger } from '@/lib/logger';
import { useApiCall } from '@/lib/api/use-send';
import { ratelApi } from '@/lib/api/ratel_api';
import {
  updateDraftRequest,
  UrlType,
} from '@/lib/api/models/feeds/update-draft-request';
import { Feed, FeedType } from '@/lib/api/models/feeds';
import Image from 'next/image';

const editorTheme = {
  ltr: 'text-left',
  rtl: 'text-right',
  paragraph: 'relative mb-1',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
  },
  placeholder:
    'absolute top-0 left-0 text-neutral-500 pointer-events-none select-none inline-block',
};

const editorConfig = {
  namespace: 'CreatePostEditor',
  theme: editorTheme,
  onError(error: Error) {
    console.error(error);
  },
};

function ToolbarPlugin({
  onImageUpload,
}: {
  onImageUpload: (url: string) => void;
}) {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return activeEditor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [activeEditor, updateToolbar]);

  const formatText = (format: TextFormatType) => {
    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <div className="flex items-center gap-4 [&>button]:size-6 [&>button]:rounded [&>button]:hover:bg-neutral-700">
      <button
        onClick={() => formatText('bold')}
        className={cn(isBold && 'bg-neutral-600 text-white')}
        aria-label="Format text as bold"
      >
        <Bold />
      </button>
      <button
        onClick={() => formatText('italic')}
        className={cn(isItalic && 'bg-neutral-600 text-white')}
        aria-label="Format text as italics"
      >
        <Italic />
      </button>
      <button
        onClick={() => formatText('underline')}
        className={cn(isUnderline && 'bg-neutral-600 text-white')}
        aria-label="Format text to underlined"
      >
        <Underline />
      </button>
      <button
        onClick={() => formatText('strikethrough')}
        className={cn(isStrikethrough && 'bg-neutral-600 text-white')}
        aria-label="Format text with a strikethrough"
      >
        <Strikethrough />
      </button>
      <FileUploader onUploadSuccess={onImageUpload}>
        <ImagePlus />
      </FileUploader>
    </div>
  );
}

export function CreatePost() {
  const {
    expand,
    setExpand,
    title,
    setTitle,
    setContent: setEditorStateString,
    image,
    setImage,
    publishPost,
  } = usePostDraft();

  const { data: userInfo, isLoading } = useUserInfo();
  const editorRef = useRef<LexicalEditor | null>(null);

  const handleLexicalChange = (
    editorState: EditorState,
    editor: LexicalEditor,
  ) => {
    editorRef.current = editor;
    editorState.read(() => {
      const html = $generateHtmlFromNodes(editor, null);
      setEditorStateString(html);
      // const textContent = $getRoot().getTextContent();
    });
  };
  const clearEditor = () => {
    if (editorRef.current) {
      editorRef.current.update(() => {
        const root = $getRoot();
        root.clear();
        root.append($createParagraphNode());
      });
    }
  };
  const handleImageUpload = (url: string) => {
    setImage(url);
  };

  const removeImage = () => {
    setImage(null);
  };

  if (isLoading) {
    return <Fragment />;
  }

  const isSubmitDisabled = !title.trim();

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="w-full bg-neutral-900 border-t-6 border-x border-b border-primary rounded-t-lg overflow-hidden">
        {/* Header with user info */}
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="size-6 rounded-full">
              <Image
                width={40}
                height={40}
                src={userInfo?.profile_url || '/default-profile.png'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium text-lg">
                {userInfo?.nickname || 'Anonymous'}
              </span>
            </div>
            <Certified className="size-5" />
          </div>
          <div
            className={cn(
              'cursor-pointer transition-transform duration-300',
              expand ? '' : 'rotate-180',
            )}
            onClick={() => setExpand(!expand)}
          >
            <DoubleArrowDown />
          </div>
        </div>

        {expand && (
          <>
            {/* Title input */}
            <div className="px-4 pt-4">
              <input
                type="text"
                placeholder="Write a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-white text-xl font-semibold placeholder-neutral-500 outline-none border-none"
              />
            </div>

            {/* Lexical Content Area */}
            <div className="px-4 pt-2 min-h-[80px] relative text-neutral-300 text-[15px] leading-relaxed">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="outline-none resize-none w-full min-h-[60px]" />
                }
                placeholder={
                  <div className="absolute top-0 text-neutral-500 pointer-events-none select-none">
                    Type here, Use Markdown, BB code, or HTML to format.
                  </div>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <OnChangePlugin onChange={handleLexicalChange} />
              <HistoryPlugin />
            </div>

            {/* Image previews */}
            {image && (
              <div className="px-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  <div className="relative size-16">
                    <Image
                      width={64}
                      height={64}
                      src={image}
                      alt={`Uploaded image`}
                      className="object-cover rounded-lg border border-neutral-600"
                    />
                    <button
                      onClick={() => removeImage()}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-700 border-2 border-neutral-900"
                      aria-label={`Remove uploaded image`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom toolbar */}
            <div className="flex items-center justify-between p-4 text-neutral-400">
              <div className="flex items-center gap-4">
                <ToolbarPlugin onImageUpload={handleImageUpload} />
              </div>

              <button
                onClick={async () => {
                  await publishPost();
                  clearEditor();
                }}
                disabled={isSubmitDisabled}
                className={cn(
                  'flex items-center gap-2 p-3 rounded-full font-medium text-sm transition-all',
                  !isSubmitDisabled
                    ? 'bg-primary text-black hover:bg-primary/50'
                    : 'bg-neutral-700 text-neutral-500 cursor-not-allowed',
                )}
              >
                <UserCircleIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </LexicalComposer>
  );
}

export interface PostDraftContextType {
  expand: boolean;
  setExpand: (expand: boolean) => void;

  draftId: number | null;
  setDraftId: (id: number | null) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  image: string | null;
  setImage: (image: string | null) => void;

  isSaving: boolean;

  publishPost: () => Promise<void>;
  loadDraft: (id: number) => Promise<void>;
}

export const PostDraftContext = createContext<PostDraftContextType>({
  expand: false,
  setExpand: () => {},

  draftId: null,
  setDraftId: () => {},
  title: '',
  setTitle: () => {},
  content: '',
  setContent: () => {},
  image: '',
  setImage: () => {},
  isSaving: false,
  publishPost: async () => {},
  loadDraft: async () => {},
});

export const PostDraftProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expand, setExpand] = useState(false);
  const [draftId, setDraftId] = useState<number | null>(null);
  const [title, setTitleState] = useState('');
  const [content, setContentState] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const hasInput = useRef(false);
  const { get, post } = useApiCall();

  const loadDraft = useCallback(
    async (id: number) => {
      setIsSaving(true);
      try {
        setDraftId(null);
        setTitleState('');
        setContentState('');
        hasInput.current = false;

        const draft: Feed = await get(ratelApi.feeds.getFeedsByFeedId(id));

        setDraftId(draft.id);
        setTitleState(draft.title || '');
        setContentState(draft.html_contents);
        hasInput.current = true;
        logger.debug('Draft loaded:', draft);
      } catch (error: unknown) {
        logger.error('LoadDraft error:', error);
        setDraftId(null);
      } finally {
        setIsSaving(false);
      }
    },
    [get],
  );

  const createInitialDraftOnServer = useCallback(async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const data: Feed = await post(ratelApi.feeds.createDraft(), {
        create: {},
      });

      setDraftId(data.id);
    } catch (error: unknown) {
      logger.error('CreateInitialDraftOnServer error:', error);
      setDraftId(null);
    } finally {
      setIsSaving(false);
    }
  }, [post, isSaving]);

  useEffect(() => {
    console.log(draftId, title, content, hasInput.current);
    if (
      !draftId &&
      hasInput.current &&
      title.length > 0 &&
      content.length > 0 &&
      !isSaving
    ) {
      console.log('Creating initial draft on server');
      createInitialDraftOnServer();
    }
  }, [draftId, title, content, isSaving, createInitialDraftOnServer]);

  const saveDraft = useCallback(async () => {
    if (!draftId) {
      return;
    }

    setIsSaving(true);
    try {
      let url = '';
      let url_type = UrlType.None;
      if (image !== null && image !== '') {
        url = image;
        url_type = UrlType.Image;
      }
      await post(
        ratelApi.feeds.updateDraft(draftId),

        updateDraftRequest(
          FeedType.Post,
          content,
          1, // Default industry_id to 1 (Crpyto)
          title,
          0,
          [],
          url,
          url_type,
        ),
      );
    } catch (error: unknown) {
      logger.error('Update draft error:', error);
    } finally {
      setIsSaving(false);
    }
  }, [draftId, title, content, image, post]);

  useEffect(() => {
    if (!draftId || (!title.length && !content.length && !hasInput.current))
      return;

    const handler = setTimeout(() => {
      saveDraft();
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [title, content, draftId, saveDraft]);

  const publishPost = useCallback(async () => {
    if (!draftId || (!title.trim() && !content.trim()) || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      await saveDraft();
      await post(ratelApi.feeds.publishDraft(draftId), {
        publish: {},
      });

      setDraftId(null);
      setTitleState('');
      setContentState('');
      setImage(null);
      hasInput.current = false;
    } catch (error: unknown) {
      logger.error('Publish error:', error);
    } finally {
      setIsSaving(false);
    }
  }, [draftId, title, content, isSaving, saveDraft, post]);

  const setTitle = useCallback((newTitle: string) => {
    if (!hasInput.current) hasInput.current = true;
    setTitleState(newTitle);
  }, []);

  const setContent = useCallback((newContent: string) => {
    if (!hasInput.current) hasInput.current = true;
    setContentState(newContent);
  }, []);

  const contextValue = {
    expand,
    setExpand,
    draftId,
    setDraftId,
    title,
    setTitle,
    content,
    setContent,
    image,
    setImage,
    isSaving,
    publishPost,
    loadDraft,
  };

  return (
    <PostDraftContext.Provider value={contextValue}>
      {children}
    </PostDraftContext.Provider>
  );
};

export const usePostDraft = () => {
  const context = useContext(PostDraftContext);
  if (context === undefined) {
    throw new Error('usePostDraft must be used within a PostDraftProvider');
  }
  return context;
};
