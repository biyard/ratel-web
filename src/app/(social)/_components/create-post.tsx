'use client';

import { useEffect, Fragment } from 'react';
import { X, Loader2 } from 'lucide-react';
import Image from 'next/image';

import DoubleArrowDown from '@/assets/icons/double-arrow-down.svg';
import UserCircleIcon from '@/assets/icons/user-circle.svg';
import Certified from '@/assets/icons/certified.svg';
import { cn } from '@/lib/utils';
import { useUserInfo } from '../_hooks/user';
import { usePostDraft } from './post-draft-context';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

import ToolbarPlugin from '@/components/toolbar/toolbar';
import { checkString } from '@/lib/string-filter-utils';

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

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type here, Use Markdown, BB code, or HTML to format.',
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== content) {
        setContent(html);
      }
    },
  });

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  const removeImage = () => {
    setImage(null);
  };

  const isSubmitDisabled =
    !title.trim() ||
    checkString(title) ||
    checkString(content ?? '') ||
    status !== 'idle';

  if (isLoading || !expand) {
    return <Fragment />;
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

      {/* Tiptap Editor */}
      <div className="px-4 pt-2 min-h-[80px] relative text-neutral-300 text-[15px] leading-relaxed">
        <EditorContent
          editor={editor}
          className="outline-none resize-none w-full min-h-[60px]"
        />
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
                onClick={removeImage}
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
        <ToolbarPlugin onImageUpload={(url) => setImage(url)} />

        <div className="flex items-center gap-4">
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
              'flex items-center gap-2 p-3 rounded-full font-medium text-[16px] transition-all',
              !isSubmitDisabled
                ? 'bg-primary text-black hover:bg-primary/50'
                : 'bg-neutral-700 text-neutral-500 cursor-not-allowed',
            )}
          >
            {status === 'publishing' ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span className="flex flex-row px-2 gap-2">
                <UserCircleIcon />
                Post
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
