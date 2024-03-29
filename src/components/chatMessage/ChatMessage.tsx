import { MessageSender } from "../../enums/Messages";
import { Message } from "../../types/Messages";
import UserChatMessage from "./userChatMessage/UserChatMessage";
import BotChatMessage from "./botChatMessage/BotChatMessage";

export interface ChatMessageProps {
  message: Message;
}
function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div>
        {message.sender === MessageSender.User ? (
          <UserChatMessage message={message} />
        ) : (
          <BotChatMessage message={message} />
        )}
    </div>
  );
}

export default ChatMessage;
