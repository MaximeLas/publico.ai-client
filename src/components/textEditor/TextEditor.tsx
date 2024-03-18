import { EditorProvider, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import BubbleMenu from "./BubbleMenu";

const extensions = [StarterKit, Markdown];

export interface TextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
}

function TextEditor({ content, onChange }: TextEditorProps) {
  return (
    <>
      {/* <div ref={r }></div> */}
      <EditorProvider
        // element={ref.current}
        editorProps={{ scrollThreshold: 100 }}
        onUpdate={(e) => onChange?.(e.editor.storage.markdown.getMarkdown())}
        extensions={extensions}
        content={content}
      >
        <div>
          <FloatingMenu>This is the floating menu</FloatingMenu>
        </div>
        <div>
          <BubbleMenu />
        </div>
      </EditorProvider>
    </>
  );
}

export default TextEditor;
