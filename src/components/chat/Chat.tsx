import { useRef, HTMLProps, useEffect } from "react";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import ChatMessage from "../chatMessage/ChatMessage";
import clsx from "clsx";
import useStore from "../../hooks/useStore";
import useChatHelper from "../../hooks/useChatHelper";
import { ChatControl } from "../../enums/API";
import ChatControlLabels from "../../constants/ChatControlLabels";
import ChatTextInput from "../chatControls/chatTextInput/ChatTextArea";
import { MessageSender } from "../../enums/Messages";
import ChatWordLimitControl from "../chatControls/chatWordLimitControl/ChatWordLimitControl";
import styles from "./Chat.module.scss";
import ChatFileControl from "../chatControls/chatFileControl/ChatFileControl";

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
  const formRef = useRef<HTMLFormElement>(null);
  const rootClassName = clsx(
    "bg-light-subtle d-flex flex-column",
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
                  className="btn-md w-25 rounded rounded-pill"
                >
                  {ChatControlLabels[control]}
                </Button>
              ))}
            </Form.Group>
          </ListGroupItem>
        )}
        {currentControls.includes(ChatControl.WORD_LIMIT) && (
          <ListGroupItem as="li" className="border border-0 py-3" key="buttons">
            <ChatWordLimitControl
              disabled={isFetching || isEditMode}
              onKeyDown={handleChatInputKeyDown}
              onChange={handleInputChange}
            />
          </ListGroupItem>
        )}
        {currentControls.includes(ChatControl.FILES) && (
          <ListGroupItem as="li" className="border border-0 py-3" key="buttons">
            <ChatFileControl />
          </ListGroupItem>
        )}
      </ListGroup>
      <ChatTextInput
        disabled={
          isFetching ||
          isEditMode ||
          !currentControls.includes(ChatControl.CHATBOT)
        }
        onKeyDown={handleChatInputKeyDown}
        onChange={handleInputChange}
      />
    </Form>
  );
}

export default Chat;
