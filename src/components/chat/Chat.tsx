import { useRef, HTMLProps } from "react";
import { Form, ListGroup, ListGroupItem } from "react-bootstrap";
import useChat from "../../hooks/context/useChat";
import TextArea from "../../sharedComponents/textArea/TextArea";
import ChatMessage from "../chatMessage/ChatMessage";
import useHeadlessSubmit from "../../hooks/useHeadlessSubmit";
import clsx from "clsx";
import styles from "./Chat.module.css";

export interface ChatProps
  extends Omit<
    HTMLProps<HTMLFormElement>,
    "onSubmit" | "children" | "as" | "ref"
  > {}

function Chat({ className, ...rest }: ChatProps) {
  const {
    inputValue,
    messages,
    handleInputChange: handleChange,
    handleSubmit,
  } = useChat();
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useHeadlessSubmit(formRef);
  const rootClassName = clsx(
    "bg-body d-flex flex-column",
    styles.root,
    className
  );
  const listGroupClassName = clsx(
    "overflow-auto",
    styles.listGroup
  );
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
      <Form.Control
        type="submit"
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && submit()}
        as={TextArea}
        value={inputValue}
        className={styles.input}
      />
    </Form>
  );
}

export default Chat;
