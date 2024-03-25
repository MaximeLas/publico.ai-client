import { useRef, HTMLProps, useEffect } from "react";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import ChatMessage from "../chatMessage/ChatMessage";
import clsx from "clsx";
import useStore from "../../hooks/useStore";
import useChatHelper from "../../hooks/helpers/useChatHelper";
import { ChatControl } from "../../enums/API";
import ChatControlLabels from "../../constants/ChatControlLabels";
import ChatMainInput from "../chatControls/chatMainInput/ChatMainInput";
import { MessageSender } from "../../enums/Messages";
import ChatWordLimitControl from "../chatControls/chatWordLimitControl/ChatWordLimitControl";
import styles from "./Chat.module.scss";
import UserDocumentsDisplay from "../userDocumentsDisplay/UserDocumentsDisplay";

const buttonChatControls = [
  ChatControl.YES,
  ChatControl.NO,
  ChatControl.START,
  ChatControl.ADD_GUIDANCE,
  ChatControl.EDIT_IT,
  ChatControl.GOOD_AS_IS,
  ChatControl.OF_COURSE,
];

export interface ChatProps
  extends Omit<
    HTMLProps<HTMLFormElement>,
    "onSubmit" | "children" | "as" | "ref"
  > {}

function Chat({ className, ...rest }: ChatProps) {
  const { messages } = useStore();
  const {
    handleSubmit,
    handleInputChange,
    handleButtonClick,
    handleChatInputKeyDown,
  } = useChatHelper();
  const currentControls = useStore((state) => state.currentControls);
  const currentButtonControls = currentControls.filter((control) =>
    buttonChatControls.includes(control)
  );
  const userDocuments = useStore((state) => state.filesInput);
  const formRef = useRef<HTMLFormElement>(null);
  const rootClassName = clsx(
    "bg-light-subtle pt-1 border rounded rounded-2 d-flex flex-column",
    styles.root,
    className
  );
  const listGroupClassName = clsx("overflow-auto", styles.listGroup);
  const listRef = useRef<HTMLUListElement>(null);
  const isFetching = useStore((state) => state.isFetching);
  const isEditMode = useStore((state) => state.isEditMode);

  useEffect(() => {
    if (!isFetching)
      listRef.current?.scrollTo(0, listRef.current?.scrollHeight || 0);
  }, [messages, isFetching]);
  return (
    <Form
      id="chat-form"
      ref={formRef}
      onSubmit={handleSubmit}
      className={rootClassName}
      {...rest}
    >
      <ListGroup
        ref={listRef}
        as="ul"
        className={listGroupClassName}
        variant="flush"
      >
        {messages.map((message, index) => (
          <ListGroupItem
            as="li"
            className={clsx(
              message.sender === MessageSender.User && styles.userMessage
            )}
            key={index}
          >
            <ChatMessage message={message} />
          </ListGroupItem>
        ))}
        {!!userDocuments.length && (
          <ListGroupItem as="li" key="user-documents">
            <UserDocumentsDisplay />
          </ListGroupItem>
        )}
        {!!currentButtonControls.length && (
          <ListGroupItem as="li" key="buttons">
            <Form.Group className="d-flex gap-1">
              {currentButtonControls.map((control, index) => (
                <Button
                  key={index}
                  disabled={isFetching || isEditMode}
                  onClick={handleButtonClick}
                  value={control}
                  variant="primary"
                  className="fw-bold btn-md w-25 rounded rounded-pill"
                >
                  {ChatControlLabels[control]}
                </Button>
              ))}
            </Form.Group>
          </ListGroupItem>
        )}
        {currentControls.includes(ChatControl.WORD_LIMIT) && (
          <ListGroupItem as="li" className="py-3" key="buttons">
            <ChatWordLimitControl
              disabled={isFetching || isEditMode}
              onKeyDown={handleChatInputKeyDown}
              onChange={handleInputChange}
            />
          </ListGroupItem>
        )}
      </ListGroup>
      <ChatMainInput
        onKeyDown={handleChatInputKeyDown}
        onChange={handleInputChange}
      />
    </Form>
  );
}

export default Chat;
