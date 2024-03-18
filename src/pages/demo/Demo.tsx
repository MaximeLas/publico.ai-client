import clsx from 'clsx';
import { Form } from "react-bootstrap";
import Chat from "../../components/chat/Chat";
import QuestionsDisplay from "../../components/questionsDisplay/QuestionsDisplay";
import useStore from "../../hooks/useStore";
import Switch from "../../sharedComponents/switch/Switch";
import styles from "./Demo.module.scss";

const Demo: React.FC = () => {
  const isEditMode = useStore((state) => state.isEditMode);
  const setIsEditMode = useStore((state) => state.setIsEditMode);

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
        <span className="d-flex flex-nowrap align-items-end my-1 ms-auto">
          <Form.Label className={clsx("my-0", !isEditMode && "text-secondary")}>View Mode</Form.Label>
          <Switch
            checked={isEditMode}
            className="mx-1"
            style={{ height: "60%" }}
            onChange={(v) => setIsEditMode(v)}
          />
          <Form.Label  className={clsx("my-0", isEditMode && "text-secondary")}>Edit Mode</Form.Label>
        </span>
      </div>
      <div className={styles.content}>
        <Chat />
        <div className={styles.questionsWrapper}>
          <QuestionsDisplay isEditing={isEditMode} />
        </div>
      </div>
    </div>
  );
};

export default Demo;
