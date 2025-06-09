'use client';

import { useState, useCallback, useEffect, useRef, Fragment } from 'react';
import {
  ImagePlus,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  X,
  ExpandIcon,
  Expand,
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
} from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import FileUploader from '@/components/file-uploader';

interface CreatePostProps {
  onSubmit: (data: {
    title: string;
    content: string;
    image: string | null;
  }) => void;
}

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

export function CreatePost({ onSubmit }: CreatePostProps) {
  const [expand, setExpand] = useState(false);
  const [title, setTitle] = useState('');
  const [editorStateString, setEditorStateString] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
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

  const handleImageUpload = (url: string) => {
    setImage(url);
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    // Check if content is effectively empty (might contain empty HTML tags like <p><br></p>)
    const isContentEmpty = !editorRef.current
      ?.getEditorState()
      .read(() => $getRoot().getTextContent().trim());

    if (!trimmedTitle && isContentEmpty) return;

    onSubmit({
      title: trimmedTitle,
      content: editorStateString,
      image: image || '',
    });

    // Reset form
    setTitle('');
    setImage(null);
    editorRef.current?.update(() => {
      $getRoot().clear();
    });
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
              <img
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
              expand ? 'rotate-180' : '',
            )}
            onClick={() => setExpand(!expand)}
          >
            <DoubleArrowDown />
          </div>
        </div>

        {!expand && (
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
                  <div className="relative">
                    <img
                      src={image}
                      alt={`Uploaded image`}
                      className="w-16 h-16 object-cover rounded-lg border border-neutral-600"
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
                onClick={handleSubmit}
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
