import { EditorProvider, EditorProviderProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
// import BubbleMenu from "./BubbleMenu";
// import EditorControlBar from "./EditorControlBar";

const extensions = [StarterKit, Markdown];

export interface TextEditorProps
  extends Omit<EditorProviderProps, "editorProps" | "extensions" | "children"> {
  onMarkdownChange?: (content: string) => void;
}

function TextEditor({
  onMarkdownChange,
  onUpdate,
  slotBefore,
  ...rest
}: TextEditorProps) {
  return (
    <EditorProvider
      {...rest}
      // slotBefore={
      //   <>
      //     <EditorControlBar />
      //     {slotBefore}
      //   </>
      // }
      onUpdate={(e) => {
        onUpdate?.(e);
        onMarkdownChange?.(e.editor.storage.markdown.getMarkdown());
      }}
      extensions={extensions}
    >
      {/* <div>
          <FloatingMenu>
            <Button>A</Button>
          </FloatingMenu>
        </div> */}
      {/* <div>
        <BubbleMenu />
      </div> */}
    </EditorProvider>
  );
}

export default TextEditor;
