import { Fade } from "react-bootstrap";

function ChatMessageContent({
  content,
}: {
  content: React.ReactNode;
  alternative?: boolean;
}) {
  return (
    <Fade appear in>
      <p className="m-0">{content}</p>
    </Fade>
  );
}

export default ChatMessageContent;
