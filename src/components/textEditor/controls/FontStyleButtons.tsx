import { Editor } from "@tiptap/react";
import clsx from "clsx";
import { Button, ButtonGroup } from "react-bootstrap";

function FontStyleButtons({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  return (
    <ButtonGroup>
      <Button
        variant="outline-secondary"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={clsx(editor.isActive("bold") && "fw-bold")}
      >
        B
      </Button>
      <Button
        variant="outline-secondary"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={clsx(editor.isActive("italic") && "fst-italic")}
      >
        i
      </Button>
      <Button
        variant="outline-secondary"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={clsx(
          editor.isActive("strike") && "text-decoration-line-through"
        )}
      >
        S
      </Button>
    </ButtonGroup>
  );
}

export default FontStyleButtons;
