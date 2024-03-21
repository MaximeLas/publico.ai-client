import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react";
import EditorControlBar from "./EditorControlBar";

function BubbleMenu() {
  return (
    <TiptapBubbleMenu>
      <EditorControlBar />
    </TiptapBubbleMenu>
  );
}

export default BubbleMenu;
