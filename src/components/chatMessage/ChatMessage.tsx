import clsx from "clsx";
import { Fade } from "react-bootstrap";
import { MessageSender } from "../../enums/Messages";
import { MessageProps } from "../../types/Messages";
import styles from "./ChatMessage.module.css";
import Markdown from "react-markdown";

function ChatMessageContent({ content }: { content: React.ReactNode, alternative?: boolean }) {
  return (
    <Fade appear in>
      <p>{content}</p>
    </Fade>
  );
}

function ChatMessage({ message }: MessageProps) {
  const messageCls = clsx(
    "mb-0",
    styles.messageText
  );
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
