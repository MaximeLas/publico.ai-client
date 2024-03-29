import clsx from "clsx";
import styles from "./ChatBubble.module.scss";

function ChatBubble({ className, ...rest }: React.HTMLProps<HTMLDivElement>) {
  const clsn = clsx(styles.bubble, className);
  return <div {...rest} className={clsn} />;
}

export default ChatBubble;
