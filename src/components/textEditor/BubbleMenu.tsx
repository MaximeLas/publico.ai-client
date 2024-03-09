import {
  useCurrentEditor,
  BubbleMenu as TiptapBubbleMenu,
} from "@tiptap/react";

function BubbleMenu() {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <TiptapBubbleMenu>
      <button
        className="btn btn-secondary fw-bold"
        onClick={() => editor.chain().toggleBold()}
      >
        B
      </button>
    </TiptapBubbleMenu>
  );
}

export default BubbleMenu;
