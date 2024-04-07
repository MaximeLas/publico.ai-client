import clsx from 'clsx';
import { useEffect, useRef } from "react";
import useOnSessionTitleChange from '../../../hooks/FormHandlers/useOnSessionTitleChange';
import useStore from "../../../hooks/state/useStore";
import styles from "./ChatSessionTitle.module.css";

function ChatSessionTitle() {
    const clsn = clsx("h1 mb-0 me-2", styles.title);
  const sessionTitle = useStore((state) => state.currentChatSession?.title);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const onSessionTitleChange = useOnSessionTitleChange();

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
    <p
      ref={titleRef}
      contentEditable={true}
      onBlur={(e) => onSessionTitleChange(e.currentTarget.textContent)}
      className={clsn}
    />
  );
}

export default ChatSessionTitle;
