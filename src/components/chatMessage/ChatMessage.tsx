import clsx from "clsx";
import { Fade } from "react-bootstrap";
import { MessageSender } from "../../enums/Messages";
import { MessageProps } from "../../types/Messages";
import styles from "./ChatMessage.module.css";

function ChatMessageContent({ content }: { content: string }) {
  return (
    <Fade appear in>
      <span>{content}</span>
    </Fade>
  );
}

function ChatMessage({ message }: MessageProps) {
  const messageCls = clsx(
    "mb-0",
    message.sender === MessageSender.User && "text-align-right",
    styles.messageText
  );
  return (
    <div className="d-flex align-items-center">
      <div className="ms-2">
        <p className={messageCls}>
          {message.sender === MessageSender.User ? (
            <ChatMessageContent content={message.content} />
          ) : message.content.length ? (
            message.content.map((content, index) => (
              <ChatMessageContent key={index} content={content} />
            ))
          ) : (
            "Loading..."
          )}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;
