import { useRef, HTMLProps } from "react";
import { Form, ListGroup, ListGroupItem } from "react-bootstrap";
import ChatMessage from "../chatMessage/ChatMessage";
import clsx from "clsx";
import styles from "./Chat.module.css";
import useStore from "../../hooks/useStore";
import useChatHelper from "../../hooks/useChatHelper";
import ChatControlDisplay from "../chatControlDisplay/ChatControlDisplay";
import { ChatControls } from "../../enums/Messages";

export interface ChatProps
  extends Omit<
    HTMLProps<HTMLFormElement>,
    "onSubmit" | "children" | "as" | "ref"
  > {}

function Chat({ className, ...rest }: ChatProps) {
  const { messages } = useStore();
  const { handleSubmit } = useChatHelper();
  const formRef = useRef<HTMLFormElement>(null);
  const rootClassName = clsx(
    "bg-light d-flex flex-column",
    styles.root,
    className
  );
  const listGroupClassName = clsx("overflow-auto", styles.listGroup);
  return (
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
      className={rootClassName}
      {...rest}
    >
      <ListGroup as="ul" className={listGroupClassName} variant="flush">
        {messages.map((message, index) => (
          <ListGroupItem as="li" className="border border-0" key={index} action>
            <ChatMessage message={message} />
          </ListGroupItem>
        ))}
      </ListGroup>
      <ChatControlDisplay
        controls={[
          ChatControls.File,
          ChatControls.Yes,
          ChatControls.Text,
          ChatControls.Yes,
          ChatControls.No,
        ]}
      />
    </Form>
  );
}

export default Chat;
