import Chat from "../../components/chat/Chat";
import ChatTitleBar from "../../components/chatTitleBar/ChatTitleBar";
import QuestionsDisplay from "../../components/questionsDisplay/QuestionsDisplay";
import styles from "./Demo.module.scss";

const Demo: React.FC = () => {
  return (
    <div className="text-left h-100 mh-100 d-flex flex-column overflow-y-auto px-4">
      <ChatTitleBar />
      <div className={styles.content}>
        <Chat />
        <QuestionsDisplay className="flex-grow-1" />
      </div>
    </div>
  );
};

export default Demo;
