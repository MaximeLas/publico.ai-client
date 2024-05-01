import { useEditor, EditorContent, EditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
// import BubbleMenu from "./BubbleMenu";
// import EditorControlBar from "./EditorControlBar";

const extensions = [StarterKit, Markdown];

export interface TextEditorProps
  extends Omit<Partial<EditorOptions>, "editorProps" | "extensions"> {
  onMarkdownChange?: (content: string) => void;
}

function TextEditor({
  onMarkdownChange,
  onUpdate,
  ...rest
}: TextEditorProps) {
  const editor = useEditor({
    onUpdate: (e) => {
      onUpdate?.(e);
      onMarkdownChange?.(e.editor.storage.markdown.getMarkdown());
    },
    extensions,
    ...rest
  });
  return (
    <EditorContent editor={editor} />
  );
}

export default TextEditor;
