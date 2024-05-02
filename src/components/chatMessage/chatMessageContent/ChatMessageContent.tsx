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
        {content?.toString().startsWith('Successfully uploaded:') ? 
        <ul className={styles.listItems}>
          Successfully uploaded:
          {content
            .toString().replace("Successfully uploaded:", "")
            .split(",")
            .map((item, index) => (
              <li key={index}>{item}</li>
            ))}
        </ul>
        : content}
      </p>
    </Fade>
  );
}

export default ChatMessageContent;
