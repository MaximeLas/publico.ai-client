import { useCallback, useState, useRef, useEffect } from "react";
import { ChatControl, InputType } from "../enums/API";
import { MessageSender } from "../enums/Messages";
import useAfterChatRoute from "./API/useAfterChatRoute";
import useChatRoute from "./API/useChatRoute";
import useNewSessionRoute from "./API/useNewSessionRoute";
import useStore from "./useStore";
import useStoreApi from "./useStoreApi";
import {
  AfterChatRequest,
  AfterChatResponse,
  NewSessionResponse,
} from "../types/API";
import store from "../state/store";
import ChatControlLabels from "../constants/ChatControlLabels";

const handleFetchNewSession = async (
  fetchSession: () => Promise<NewSessionResponse>
) => {
  if (store.getState().isFetching) return;
  store.setState({ isFetching: true });
  const response = await fetchSession();
  store.setState((state) => ({
    currentChatSession: {
      id: response.session_id,
      title: "",
    },
    currentControls: Array.from(response.components),
    isFetching: false,
    messages: [
      ...state.messages,
      {
        content: [response.initial_message],
        createdAt: new Date(),
        sender: MessageSender.Bot,
      },
    ],
  }));
};

const handleFetchAfterChat = async (
  fetchAfterChat: (body: AfterChatRequest) => Promise<AfterChatResponse>,
  sessionId: string
) => {
  if (store.getState().isFetching) return;
  store.setState({ isFetching: true });
  const response = await fetchAfterChat({ session_id: sessionId });
  store.setState((state) => {
    const questions = [...state.questions];
    const updatedContent = response.updated_content;
    if (updatedContent) {
      if (questions.length > updatedContent.question_index) {
        const question = { ...questions[updatedContent.question_index] };
        if (updatedContent.question)
          question.questionTitle = updatedContent.question;
        if (updatedContent.answer) {
          question.answer = "*" + updatedContent.answer + "*";
        }
        if (updatedContent.word_limit)
          question.wordLimit = updatedContent.word_limit;
        questions[updatedContent.question_index] = question;
      } else {
        questions.push({
          questionTitle: updatedContent.question!,
          answer: updatedContent.answer ? `*${updatedContent.answer!}*` : "",
          wordLimit: updatedContent.word_limit!,
          index: updatedContent.question_index!,
        });
      }
    }
    return {
      isFetching: false,
      currentControls: Array.from(response.components),
      questions,
      messages: [
        ...state.messages,
        {
          content: [response.initial_message],
          createdAt: new Date(),
          sender: MessageSender.Bot,
        },
      ],
    };
  });
};

export default function useChatHelper() {
  const [botRes, setBotRes] = useState<string[]>([]);
  const didInputChange = useRef(false);
  const storeApi = useStoreApi();
  const currentSession = useStore((state) => state.currentChatSession);
  const setInputValue = useStore((state) => state.setUserInputValue);
  const addMessages = useStore((state) => state.addMessages);
  const setMessages = useStore((state) => state.setMessages);
  const setCurrentControls = useStore((state) => state.setCurrentControls);
  const fetchNewSession = useNewSessionRoute({});

  useEffect(() => {
    if (!currentSession) {
      handleFetchNewSession(fetchNewSession);
    }
  }, [currentSession, fetchNewSession]);

  const fetchAfterChat = useAfterChatRoute({});

  const onNewToken = useCallback(
    (token: string) => {
      setBotRes((r) => [...r, token]);
    },
    [setBotRes]
  );

  const onStreamEnd = useCallback(() => {
    setBotRes([]);
    didInputChange.current = false;
    if (currentSession == null) return;
    handleFetchAfterChat(fetchAfterChat, currentSession.id);
  }, [currentSession, setBotRes, fetchAfterChat]);

  const fetchChatRoute = useChatRoute({ onNewToken, onStreamEnd });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
    didInputChange.current = !!event.target.value.trim();
  };

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!currentSession) return;
      let value = parseInt((e.target as HTMLButtonElement).value);
      if (isNaN(value)) return;
      addMessages({
        sender: MessageSender.User,
        content: ChatControlLabels[value as ChatControl],
        createdAt: new Date(),
      });
      setCurrentControls([]);
      fetchChatRoute({
        session_id: currentSession.id,
        user_input: {
          input_type: InputType.Button,
          input_value: value,
        },
      });
    },
    [fetchChatRoute, addMessages, setCurrentControls, currentSession]
  );
  const handleChatInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (currentSession && e.key === "Enter" && !e.shiftKey) {
        e?.preventDefault();
        const target = e.target as HTMLInputElement;
        const value = target.value;
        setCurrentControls([]);
        setInputValue("");
        addMessages({
          sender: MessageSender.User,
          content: value,
          createdAt: new Date(),
        });
        if (target.type === "number") {
          fetchChatRoute({
            session_id: currentSession.id,
            user_input: {
              input_type: InputType.NumberInput,
              input_value: parseInt(value),
            },
          });
        } else if (target.type === "textarea" || target.type === "text") {
          fetchChatRoute({
            session_id: currentSession.id,
            user_input: {
              input_type: InputType.Chatbot,
              input_value: value,
            },
          });
        }
      }
    },
    [
      fetchChatRoute,
      setCurrentControls,
      addMessages,
      setInputValue,
      currentSession,
    ]
  );

  const handleSubmit = (
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!botRes.length) return;
    const messages = [...storeApi.getState().messages];
    if (messages.length === 0) return;
    const lastMessage = { ...messages[messages.length - 1] };
    if (lastMessage.sender === MessageSender.Bot) {
      lastMessage.content = botRes;
      messages[messages.length - 1] = lastMessage;
    } else {
      messages.push({
        content: botRes,
        createdAt: new Date(),
        sender: MessageSender.Bot,
      });
    }
    setMessages(messages);
  }, [botRes, setMessages, storeApi]);

  return {
    handleInputChange,
    handleSubmit,
    handleButtonClick,
    handleChatInputKeyDown,
  };
}
