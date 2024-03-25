import { useRef, useEffect } from "react";
import Chat from "../../components/chat/Chat";
import QuestionsDisplay from "../../components/questionsDisplay/QuestionsDisplay";
import useStore from "../../hooks/useStore";
import styles from "./Demo.module.scss";

const Demo: React.FC = () => {
  const sessionTitle = useStore((state) => state.currentChatSession?.title);
  const setSessionTitle = useStore((state) => state.setCurrentSessionTitle);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.textContent = "Untitled session";
    }
  }, []);

  useEffect(() => {
    if (sessionTitle && titleRef.current) {
      titleRef.current.textContent = sessionTitle;
    }
  }, [sessionTitle]);

  return (
    <div className="text-left h-100 mh-100 d-flex flex-column overflow-y-auto px-4">
      <div className="d-flex flex-wrap justify-content-start mb-2 px-3 py-2">
        <p
          ref={titleRef}
          contentEditable={true}
          onBlur={(e) => setSessionTitle(e.currentTarget.textContent || "")}
          className="h1 mb-0 me-2"
        />
        <span className="d-flex flex-grow-1 mt-auto">
          <p className="mb-0">
            <strong>Version</strong>
          </p>
          <p className="mb-0 ms-1">- Dec 30, 2023</p>
        </span>
        {/* <span className="d-flex flex-nowrap align-items-end my-1 ms-auto">
          <Form.Label className={clsx("my-0", !isEditMode && "text-secondary")}>
            View Mode
          </Form.Label>
          <Switch
            checked={isEditMode}
            className="mx-1"
            style={{ height: "60%" }}
            onChange={onEditModeChange}
          />
          <Form.Label className={clsx("my-0", isEditMode && "text-secondary")}>
            Edit Mode
          </Form.Label>
        </span> */}
      </div>
      <div className={styles.content}>
        <Chat />
        <QuestionsDisplay className="flex-grow-1" />
        {/* <span className="w-100 d-flex flex-nowrap justify-content-end align-items-center my-1 pe-1">
            <Form.Label
              className={clsx("my-0", !isEditMode && "text-secondary")}
            >
              View Mode
            </Form.Label>
            <Switch
              checked={isEditMode}
              className="mx-1"
              style={{ height: "60%" }}
              onChange={onEditModeChange}
            />
            <Form.Label
              className={clsx("my-0", isEditMode && "text-secondary")}
            >
              Edit Mode
            </Form.Label>
          </span> */}
      </div>
    </div>
  );
};

export default Demo;
