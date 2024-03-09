import clsx from "clsx";
import { MessageSender } from "../../enums/Messages";
import { MessageProps } from "../../types/Messages";
import styles from "./ChatMessage.module.css";

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
          {message.sender === MessageSender.User
            ? message.content
            : message.content.length
            ? message.content.map((content, index) => (
                <span key={index}>{content}</span>
              ))
            : "Loading..."}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;
