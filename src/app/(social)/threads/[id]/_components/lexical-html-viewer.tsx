'use client';
import { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// HTML을 Lexical 노드로 변환하는 데 필요한 유틸리티
import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes } from 'lexical';

// 기본적인 Lexical 노드들
import { ParagraphNode, TextNode } from 'lexical';
import { editorTheme } from '@/app/(social)/_components/create-post';

const editorConfig = {
  namespace: 'html-viewer-editor',
  editable: false,
  nodes: [ParagraphNode, TextNode],
  theme: editorTheme,
  onError(error: unknown) {
    console.error('Lexical Viewer Error:', error);
  },
};

function HtmlContentLoader({ htmlString }: { htmlString: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!htmlString) {
      editor.update(() => {
        $getRoot().clear();
      });
      return;
    }

    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(htmlString, 'text/html');
      const nodes = $generateNodesFromDOM(editor, dom);
      const root = $getRoot();
      root.clear();
      root.selectEnd();
      $insertNodes(nodes);
    });
  }, [editor, htmlString]);

  return null;
}

export default function LexicalHtmlViewer({
  htmlContent,
}: {
  htmlContent: string;
}) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="lexical-content-editable min-h-[90px] outline-none cursor-default select-text whitespace-pre-wrap break-words" />
        }
        placeholder={
          <div className="absolute top-4 left-4 text-gray-400 select-none pointer-events-none">
            {'No Content Available'}
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HtmlContentLoader htmlString={htmlContent} />
    </LexicalComposer>
  );
}

// 사용 예시는 이전과 동일합니다.
// <LexicalHtmlViewer htmlContent={sampleHtmlContent} />
