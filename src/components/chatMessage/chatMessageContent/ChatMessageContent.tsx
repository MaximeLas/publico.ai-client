import { Fade } from "react-bootstrap";
import styles from "./ChatMessageContent.module.css";

function ChatMessageContent({
  content,
}: {
  content: React.ReactNode;
  alternative?: boolean;
}) {
  return (
    <Fade appear in>
      <p className={styles.text}>
        {content}
      </p>
    </Fade>
  );
}

export default ChatMessageContent;
