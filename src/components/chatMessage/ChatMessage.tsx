import { Fade } from "react-bootstrap";
import { MessageSender } from "../../enums/Messages";
import { MessageProps } from "../../types/Messages";
import Markdown from "react-markdown";

function ChatMessageContent({ content }: { content: React.ReactNode, alternative?: boolean }) {
  return (
    <Fade appear in>
      <p>{content}</p>
    </Fade>
  );
}

function ChatMessage({ message }: MessageProps) {

  return (
    <div className="d-flex align-items-center">
      <div className="ms-2">
          {message.sender === MessageSender.User ? (
            <ChatMessageContent content={message.content} />
          ) : message.content.length ? (
            <Markdown children={message.content.join(" ")} />
          ) : (
            "Loading..."
          )}
      </div>
    </div>
  );
}

export default ChatMessage;
