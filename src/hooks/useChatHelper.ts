import { useCallback, useState, useRef, useEffect } from "react";
import { MessageSender } from "../enums/Messages";
import useStore from "./useStore";
import useStoreApi from "./useStoreApi";

export default function useChatHelper() {
  const [botRes, setBotRes] = useState<string[]>([]);
  const didInputChange = useRef(false);
  const storeApi = useStoreApi();
  const inputValue = useStore((state) => state.inputValue);
  const addMessages = useStore((state) => state.addMessages);
  const setInputValue = useStore((state) => state.setInputValue);
  const setMessages = useStore((state) => state.setMessages);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    didInputChange.current = !!event.target.value.trim();
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (didInputChange.current) {
        setInputValue("");
        addMessages(
          {
            content: inputValue,
            createdAt: new Date(),
            sender: MessageSender.User,
          },
          {
            content: [],
            createdAt: new Date(),
            sender: MessageSender.Bot,
          }
        );
        fetch("http://localhost:3001", { method: "POST" })
          .then(async (response) => {
            if (!response.ok || !response.body) {
              throw response.statusText;
            }

            // Here we start prepping for the streaming response
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            const loopRunner = true;

            while (loopRunner) {
              // Here we start reading the stream, until its done.
              const { value, done } = await reader.read();
              if (done) {
                setBotRes([]);
                break;
              }
              const decodedChunk = decoder.decode(value, { stream: true });
              setBotRes((r) => [...r, decodedChunk]);
            }
            didInputChange.current = false;
          })
          .catch(console.error);
      }
    },
    [inputValue, addMessages, setInputValue]
  );

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
  };
}
