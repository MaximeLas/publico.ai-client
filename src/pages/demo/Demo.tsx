import { Button } from "react-bootstrap";
import Chat from "../../components/chat/Chat";
import QuestionsDisplay from "../../components/questionsDisplay/QuestionsDisplay";
import styles from "./Demo.module.scss";

const Demo: React.FC = () => {
  return (
    <div className="text-left mx-4 h-100 mh-100 d-flex flex-column">
      <div className="d-flex flex-wrap justify-content-start mb-2 px-3 py-2">
        <h1 className="mb-0 me-2">DoGood Grant_2023</h1>
        <span className="d-flex flex-grow-1 mt-auto">
          <p className="mb-0">
            <strong>Version</strong>
          </p>
          <p className="mb-0">- Dec 30, 2023</p>
        </span>
        <span className="mt-auto">
          <Button size="sm" variant="primary-dark" className="me-1 rounded-5 px-4">
            View Mode
          </Button>
          <Button
            size="sm"
            variant="outline-primary"
            className="rounded-5 px-4"
          >
            Edit Mode
          </Button>
        </span>
      </div>
      <div className={styles.content}>
        <Chat />
        <div className={styles.questionsWrapper}>
          <QuestionsDisplay />
        </div>
      </div>
    </div>
  );
};

export default Demo;
