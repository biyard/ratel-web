'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import ImageExtension from '@tiptap/extension-image';
import { useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import DoubleArrowDown from '@/assets/icons/double-arrow-down.svg';
import UserCircleIcon from '@/assets/icons/user-circle.svg';
import Certified from '@/assets/icons/certified.svg';
import { cn } from '@/lib/utils';
import { useUserInfo } from '../_hooks/user';
import { usePostDraft } from './post-draft-context';
import Image from 'next/image';
import Toolbar from '@/components/toolbar/toolbar-tip';
import { checkString } from '@/lib/string-filter-utils';
// import Link from '@tiptap/extension-link';

export function CreatePost() {
  const {
    expand,
    setExpand,
    title,
    setTitle,
    content,
    setContent,
    image,
    setImage,
    publishPost,
    status,
  } = usePostDraft();

  const { data: userInfo, isLoading } = useUserInfo();
  const editorRef = useRef(null);

  //Tiptap editor Initializtion
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Underline,
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg border border-neutral-600',
        },
      }),

      
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== content) {
        setContent(html);
      }
    },
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[60px] prose prose-invert max-w-none',
      },
    },
  });

  // Sync content with editor when  changes happensd externally
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  const removeImage = () => {
    setImage(null);
    if (editor) {
      editor.chain().focus().clearNodes().run();
    }
  };

  const handleImageUpload = (url: string) => {
    setImage(url);
    if (editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const isSubmitDisabled =
    !title.trim() ||
    checkString(title) ||
    checkString(content ?? '') ||
    status !== 'idle';

  if (isLoading || !expand) {
    return null;
  }

  return (
    <div className="w-full bg-neutral-900 border-t-6 border-x border-b border-primary rounded-t-lg overflow-hidden">
      {/* Header */}
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
          className={cn('cursor-pointer')}
          onClick={() => setExpand(!expand)}
        >
          <DoubleArrowDown />
        </div>
      </div>

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

        {/* Tiptap Content Area */}
        <div className="px-4 pt-2 min-h-[80px] relative text-neutral-300 text-[15px] leading-relaxed">
          <EditorContent editor={editor} />
          {!content && (
            <div className="absolute top-0 text-neutral-500 pointer-events-none select-none">
              Type here, Use Markdown, BB code, or HTML to format.
            </div>
          )}
        </div>

        {/* Image preview (for uploaded images) */}
        {image && (
          <div className="px-4 pt-2">
            <div className="relative inline-block">
              <Image
                width={100}
                height={100}
                src={image}
                alt="Uploaded content"
                className="object-cover rounded-lg border border-neutral-600 max-h-40"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-700 border-2 border-neutral-900"
                aria-label="Remove uploaded image"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        )}

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between p-4 text-neutral-400">
          <Toolbar
            editor={editor}
            onImageUpload={handleImageUpload}
            enableImage={true}
          />

          <div className="flex items-center gap-4">
            {/* Status indicator */}
            {status === 'saving' && (
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <Loader2 className="animate-spin" size={16} />
                <span>Saving...</span>
              </div>
            )}
            {status === 'error' && (
              <span className="text-sm text-red-500">Error saving!</span>
            )}

            <button
              onClick={publishPost}
              disabled={isSubmitDisabled}
              className={cn(
                'flex items-center gap-2 p-3 rounded-full font-medium text-sm transition-all',
                !isSubmitDisabled
                  ? 'bg-primary text-black hover:bg-primary/50'
                  : 'bg-neutral-700 text-neutral-500 cursor-not-allowed',
              )}
            >
              {status === 'publishing' ? (
                <Loader2 className="animate-spin" />
              ) : (
                <UserCircleIcon />
              )}
            </button>
          </div>
        </div>
      </>
    </div>
  );
}
