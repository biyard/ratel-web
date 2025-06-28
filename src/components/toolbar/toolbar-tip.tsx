'use client';
import {
  ImagePlus,
  Bold,
  Italic,
  Underline,
  Strikethrough,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import FileUploader from '@/components/file-uploader';
import { Editor } from '@tiptap/react';

interface ToolbarProps {
  editor: Editor | null;
  onImageUpload: (url: string) => void;
  enableImage?: boolean;
}

export default function Toolbar({
  editor,
  onImageUpload,
  enableImage = true,
}: ToolbarProps) {
  //   const setLink = useCallback(() => {
  //     if (!editor) return;
  //     const previousUrl = editor.getAttributes('link').href;
  //     const url = window.prompt('URL', previousUrl);

  //     if (url === null) return;
  //     if (url === '') {
  //       editor.chain().focus().extendMarkRange('link').unsetLink().run();
  //       return;
  //     }

  //     editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  //   }, [editor]);

  //   const addImage = useCallback(() => {
  //     if (!editor) return;
  //     const url = window.prompt('Enter the URL of the image:');
  //     if (url) {
  //       editor.chain().focus().setImage({ src: url }).run();
  //       onImageUpload(url);
  //     }
  //   }, [editor, onImageUpload]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 [&>button]:size-6 [&>button]:rounded [&>button]:hover:bg-neutral-700">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          editor.isActive('bold') ? 'bg-neutral-600 text-white' : '',
        )}
        aria-label="Format text as bold"
      >
        <Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          editor.isActive('italic') ? 'bg-neutral-600 text-white' : '',
        )}
        aria-label="Format text as italics"
      >
        <Italic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(
          editor.isActive('underline') ? 'bg-neutral-600 text-white' : '',
        )}
        aria-label="Format text to underlined"
      >
        <Underline />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={cn(
          editor.isActive('strike') ? 'bg-neutral-600 text-white' : '',
        )}
        aria-label="Format text with a strikethrough"
      >
        <Strikethrough />
      </button>

      {enableImage && (
        <FileUploader onUploadSuccess={onImageUpload}>
          <button type="button" aria-label="Insert image">
            <ImagePlus />
          </button>
        </FileUploader>
      )}
    </div>
  );
}
