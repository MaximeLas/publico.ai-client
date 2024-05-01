import clsx from "clsx";
import { HTMLProps, useEffect, useRef } from "react";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import ChatControlValues from "../../constants/ChatControlValues";
import { ChatControl, InputType } from "../../enums/API";
import useStore from "../../hooks/state/useStore";
import ChatMainInput from "../chatControls/chatMainInput/ChatMainInput";
import ChatWordLimitControl from "../chatControls/chatWordLimitControl/ChatWordLimitControl";
import ChatMessage from "../chatMessage/ChatMessage";
import UserDocumentsDisplay from "../chatControls/userDocumentsDisplay/UserDocumentsDisplay";
import styles from "./Chat.module.scss";
import useStoreApi from "../../hooks/state/useStoreApi";
import ChatSessionDTO from "../../db/DTOs/ChatSessionDTO";
import useDB from "../../hooks/useDB";
import useFetchAndSaveSession from "../../hooks/helpers/useFetchAndSaveSession";

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
  const isDisabled = isEditMode || isFetching;
  const setUserInput = useStore((state) => state.setUserInput);
  const fetchChat = useStore((state) => state.fetchChat);
  const currentUser = useStore((state) => state.user);
  const { setState } = useStoreApi();
  const { getLastUserChatSession } = useDB();
  const fetchAndSaveSession = useFetchAndSaveSession();

  useEffect(() => {
    if (!currentUser) return;
    getLastUserChatSession(currentUser.uid).then((lastSession) => {
      if (lastSession) {
        const s = ChatSessionDTO.toState(lastSession);
        if (s.editorState && s.questions) {
          s.questions = s.questions.map((q, i) =>
            q.index === s.editorState?.index ? s.editorState : q
          );
        }
        setState(s);
      } else {
        fetchAndSaveSession();
      }
    });
  }, [currentUser, setState, fetchAndSaveSession, getLastUserChatSession]);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current?.scrollHeight || 0);
  }, [messages]);

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
          <ListGroupItem as="li" key={index} className="border-0 p-0">
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
                    disabled={isDisabled}
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
            <ChatWordLimitControl className={styles.wordLimitControl} disabled={isDisabled}/>
          </ListGroupItem>
        )}
      </ListGroup>
      <ChatMainInput />
    </Form>
  );
}

export default Chat;
