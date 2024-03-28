import { BotMessage } from "../../../types/Messages";
import Markdown, { Components } from "react-markdown";
import ChatMessageContent from "../chatMessageContent/ChatMessageContent";
import styles from "./BotChatMessage.module.css";

export interface BotChatMessageProps {
  message: BotMessage;
}

const markdownComponents: Partial<Components> = {
  p: ({ children }) => <ChatMessageContent content={children} />,
};

function BotChatMessage({ message }: BotChatMessageProps) {
  return (
    <div className={styles.root}>
      {message.content.length ? (
        <Markdown
          components={markdownComponents}
          children={message.content.join("")}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BotChatMessage;
