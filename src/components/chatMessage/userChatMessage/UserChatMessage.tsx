import ChatMessageContent from "../chatMessageContent/ChatMessageContent";
import { UserMessage } from "../../../types/Messages";
import ChatBubble from "../../chatBubble/ChatBubble";

export interface UserChatMessageProps {
  message: UserMessage;
}

function UserChatMessage({ message }: UserChatMessageProps) {
  return (
    <div className="d-flex justify-content-end ms-4 me-3 my-3">
      <ChatBubble>
        <ChatMessageContent content={message.content} />
      </ChatBubble>
    </div>
  );
}

export default UserChatMessage;
