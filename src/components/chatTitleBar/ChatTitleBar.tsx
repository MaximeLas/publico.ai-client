import useStore from '../../hooks/useStore';
import ChatSessionTitle from "../chatControls/chatSessionTitle/ChatSessionTitle";

function ChatTitleBar() {
  const sessionCreateDate = useStore(
    (state) => state.currentChatSession?.createdAt
  );
  return (
    <div className="d-flex flex-wrap justify-content-start mb-2 px-3 py-2">
      <ChatSessionTitle />
      <span className="d-flex flex-grow-1 mt-auto">
        <p className="mb-0">
          <strong>Version</strong>
        </p>
        <p className="mb-0 ms-1">
          -{" "}
          {sessionCreateDate?.toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </span>
    </div>
  );
}

export default ChatTitleBar;
