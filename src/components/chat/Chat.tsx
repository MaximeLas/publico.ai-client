import clsx from "clsx";
import { HTMLProps, useEffect, useRef, useState } from "react";
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
import { Message } from "../../types/Messages";
import EndSessionPopUp from "../endSessionPopUp/EndSessionPopUp";
import fetchNewSession from "../../state/slices/ApiSlice";
// import storeContext from "../../context/Store";

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
  const listGroupClassName = clsx("overflow-auto", styles.listGroup);
  const listRef = useRef<HTMLUListElement>(null);
  const isFetching = useStore((state) => state.isFetching);
  const isEditMode = useStore((state) => state.isEditMode);
  const isDisabled = isEditMode || isFetching;
  const setUserInput = useStore((state) => state.setUserInput);
  const fetchChat = useStore((state) => state.fetchChat);
  const currentUser = useStore((state) => state.user);
  const { setState, getState } = useStoreApi();
  const store = useStoreApi();
  const { getLastUserChatSession } = useDB();
  const fetchAndSaveSession = useFetchAndSaveSession();
  const rootClassName = clsx(
    "bg-light-subtle pt-1 border rounded rounded-2 d-flex flex-column",
    isEditMode ? styles.rootEditMode : styles.rootViewMode,
    className
  );

  const currentChatSession = useStore(
    (state) => state.currentChatSession
  );
  const clearChatSession = useStore((state) => state.clearChatSession);
  const [isEndOfSession, setIsEndOfSession] = useState(false);

  const findMessaageToEdit = (messages : Message []) => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].content.toString().startsWith("Here's what I found in your documents to answer this question:")) {
        return messages[i].content.toLocaleString().slice(messages[i].content.toLocaleString().indexOf(';')+3);
      }
    }
    return "";
  }

  const findIfEndOfSession = (messages : Message []) => {
      if (messages[messages.length - 1].content.toString().startsWith("Do you want to generate an answer for another question?")) {
        setIsEndOfSession(true);
        return true;
      } 
     else if (messages[messages.length - 1].content.toLocaleString().startsWith('No')) {
        setIsEndOfSession(true);
        return true;
     }
      else {
        setIsEndOfSession(false);
        return false;
      }
  }

  useEffect(() => {
    setIsEndOfSession(false);
    if (!currentUser || currentChatSession) return;
    fetchAndSaveSession();
  }, []);


  // useEffect(() => {
  //   if (!currentUser || currentChatSession) return;
  //   clearChatSession();
  //   fetchNewSession(setState, getState, store);
  //   fetchAndSaveSession();
    // getLastUserChatSession(currentUser.uid).then((lastSession) => {
    //   if (lastSession) {
    //     const s = ChatSessionDTO.toState(lastSession);
    //     if (s.editorState && s.questions) {
    //       s.questions = s.questions.map((q, i) =>
    //         q.index === s.editorState?.index ? s.editorState : q
    //       );
    //     }
    //     setState(s);
    //   } else {
    //     fetchAndSaveSession();
    //   }
    // });
  // }, [currentUser, setState, fetchAndSaveSession, getLastUserChatSession]);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current?.scrollHeight || 0);
  }, [messages]);

  const handleClosePopUp = () => {
    setIsEndOfSession(false);
  };

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
                    onClick={ async () => {
                      setUserInput({
                        input_type: InputType.Button,
                        input_value: control,
                      });
                      if (control === ChatControl.NO && findIfEndOfSession(messages)) await fetchChat(true);
                      // if (control === ChatControl.NO && messages[messages.length - 1] == "No") await fetchChat(true);
                      else await fetchChat(false);
                      if (control === ChatControl.EDIT_IT) {
                        setUserInput({
                          input_type: InputType.Chatbot,
                          input_value: findMessaageToEdit(messages),
                        });
                      }
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
      {isEndOfSession && <EndSessionPopUp onClose={handleClosePopUp}/>}
    </Form>
  );
} 

export default Chat;
