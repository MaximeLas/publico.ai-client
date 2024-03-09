import { useRef } from "react";
import { EditorProvider, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenu from "./BubbleMenu";

const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

export interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

function TextEditor() {
  const ref = useRef<HTMLDivElement>();
  return (
    <>
      {/* <div ref={r }></div> */}
      <EditorProvider
        // element={ref.current}
        editorProps={{ scrollThreshold: 100 }}
        onUpdate={(e) => console.log(e.editor.getJSON())}
        extensions={extensions}
        content={content}
      >
        <FloatingMenu>This is the floating menu</FloatingMenu>
        <BubbleMenu />
      </EditorProvider>
    </>
  );
}

export default TextEditor;
