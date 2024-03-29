import clsx from "clsx";
import { HTMLProps, useEffect, useRef } from "react";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import ChatControlValues from "../../constants/ChatControlValues";
import { ChatControl, InputType } from "../../enums/API";
import { MessageSender } from "../../enums/Messages";
import useTempSyncStoreAuth from "../../hooks/helpers/useTempSyncStoreAuth";
import useStore from "../../hooks/useStore";
import ChatMainInput from "../chatControls/chatMainInput/ChatMainInput";
import ChatWordLimitControl from "../chatControls/chatWordLimitControl/ChatWordLimitControl";
import ChatMessage from "../chatMessage/ChatMessage";
import UserDocumentsDisplay from "../chatControls/userDocumentsDisplay/UserDocumentsDisplay";
import styles from "./Chat.module.scss";
import useStoreApi from "../../hooks/useStoreApi";
import ChatSessionDTO from "../../db/DTOs/ChatSessionDTO";
import useDB from "../../hooks/useDB";
import useFetchAndSaveSession from "../../hooks/helpers/useFetchAndSaveSession";
import useDebounce from "../../hooks/helpers/useDebounce";

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
  const messages = useStore((state) => state.messages);
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
  const setUserInput = useStore((state) => state.setUserInput);
  const fetchChat = useStore((state) => state.fetchChat);
  const currentUser = useStore((state) => state.currentUser);
  const { setState, getState } = useStoreApi();
  const { getLastUserChatSession, updateSession } = useDB();
  const fetchAndSaveSession = useFetchAndSaveSession();
  const debounceUpdateSession = useDebounce(updateSession, 1000);
  useTempSyncStoreAuth();

  useEffect(() => {
    if (!currentUser) return;
    getLastUserChatSession(currentUser).then((lastSession) => {
      if (lastSession) {
        const s = ChatSessionDTO.toState(lastSession);
        setState(s);
      } else {
        fetchAndSaveSession(currentUser);
      }
    });
  }, [currentUser, setState, fetchAndSaveSession, getLastUserChatSession]);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current?.scrollHeight || 0);
  }, [messages]);

  useEffect(() => {
    const { currentChatSession, messages } = getState();
    if (!currentChatSession?.id || !currentControls.length) return;
    debounceUpdateSession(
      currentChatSession.id,
      ChatSessionDTO.fromPartialState({ currentControls, messages })
    );
  }, [currentControls, debounceUpdateSession, getState]);

  useEffect(() => {
    const { currentChatSession, currentControls } = getState();
    if (!currentChatSession?.id || !messages.length) return;
    debounceUpdateSession(
      currentChatSession.id,
      ChatSessionDTO.fromPartialState({ messages, currentControls })
    );
  }, [messages, debounceUpdateSession, getState]);

  return (
    <Form
      id="chat-form"
      ref={formRef}
      onSubmit={(e) => e.preventDefault()}
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
            key={index}
            className={clsx(
              "border-0",
              message.sender === MessageSender.Bot && "p-0"
            )}
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
            <Form.Group className="d-flex gap-1 justify-content-center flex-wrap">
              {currentButtonControls.map((control, index) => {
                const { label, variant } = ChatControlValues[control];
                return (
                  <Button
                    key={index}
                    disabled={isFetching || isEditMode}
                    onClick={() => {
                      setUserInput({
                        input_type: InputType.Button,
                        input_value: control,
                      });
                      fetchChat();
                    }}
                    value={control}
                    variant={variant}
                    className="fw-bold btn-md px-4 rounded rounded-pill"
                  >
                    {label}
                  </Button>
                );
              })}
            </Form.Group>
          </ListGroupItem>
        )}
        {currentControls.includes(ChatControl.WORD_LIMIT) && (
          <ListGroupItem as="li" className="py-3" key="buttons">
            <ChatWordLimitControl className={styles.wordLimitControl} />
          </ListGroupItem>
        )}
      </ListGroup>
      <ChatMainInput />
    </Form>
  );
}

export default Chat;
