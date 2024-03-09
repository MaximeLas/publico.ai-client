import { useCallback, useEffect, useState, createContext, useRef } from "react";
import { MessageSender } from "../enums/Messages";
import { Message } from "../types/Messages";

interface ChatContext {
  messages: Message[];
  inputValue: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const chatContext = createContext({} as ChatContext);

//TODO: remove this
const botMessages = [
  "Hello there!",
  //   "How are you?",
  //   "I'm a bot",
  //   `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Tritani reprehendunt pro an, his ne liber iusto. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Vivendum intellegat et qui, ei denique consequuntur vix. Tritani reprehendunt pro an, his ne liber iusto. Ad doctus gubergren duo, mel te postea suavitate. Vivendum intellegat et qui, ei denique consequuntur vix. Vivendum intellegat et qui, ei denique consequuntur vix. Id mundi quando mandamus sit, est vide option accusata et. Offendit eleifend moderatius ex vix, quem odio mazim et qui, purto expetendis cotidieque quo cu, veri persius vituperata ei nec. Electram intellegat voluptaria et eam, eam ex aperiri temporibus scriptorem. Vivendum intellegat et qui, ei denique consequuntur vix. Pri posse graeco definitiones cu, id eam populo quaestio adipiscing, usu quod malorum te. Ex nam agam veri, dicunt efficiantur ad qui, ad legere adversarium sit.
  // `,
  //   "Hello there!",
  //   "How are you?",
  //   "I'm a bot",
  //   "Hello there!",
  //   "How are you?",
  //   "I'm a bot",
];

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [botRes, setBotRes] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    botMessages.map((m) => ({
      content: [m],
      createdAt: new Date(),
      sender: MessageSender.Bot,
    }))
  );
  const didInputChange = useRef(false);

  const addMessages = (...messages: Message[]) => {
    setMessages((m) => [...m, ...messages]);
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (didInputChange.current) {
        setInput("");
        addMessages(
          {
            content: input,
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
    [input]
  );

  useEffect(() => {
    if (!botRes.length) return;
    setMessages((m) => {
      const lastMessage = { ...m[m.length - 1] };
      if (lastMessage.sender === MessageSender.Bot) {
        lastMessage.content = botRes;
        const newMessages = [...m];
        newMessages[m.length - 1] = lastMessage;
        return newMessages;
      } else {
        return [
          ...m,
          {
            content: botRes,
            createdAt: new Date(),
            sender: MessageSender.Bot,
          },
        ];
      }
    });
  }, [botRes]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    didInputChange.current = true;
  };

  return (
    <chatContext.Provider
      value={{ messages, handleSubmit, handleInputChange, inputValue: input }}
    >
      {children}
    </chatContext.Provider>
  );
};

const ChatConsumer = chatContext.Consumer;

export { chatContext, ChatProvider, ChatConsumer };
export default chatContext;
