import { ChatControl } from "../enums/API";
import { UserInput } from "../types/API";
import { GuidingQuestion, Message } from "../types/Messages";

export interface ChatState {
  messages: Message[];
  initialMessage: string | null;
  currentControls: ChatControl[];
  userInput: UserInput;
  isFetching: boolean;
}

export interface ChatActions {
  addMessages: (...messages: Message[]) => void;
  setMessages: (messages: Message[]) => void;
  setCurrentControls: (controls: ChatControl[]) => void;
  setUserInput: (input: UserInput) => void;
  setUserInputType: (inputType: UserInput["input_type"]) => void;
  setUserInputValue: (inputValue: UserInput["input_value"]) => void;
  setInitialMessage: (message: string | null) => void;
  setIsFetching: (isFetching: boolean) => void;
}

export interface ChatSliceState extends ChatState, ChatActions {}

export interface QuestionsState {
  questions: GuidingQuestion[];
  currentQuestion: GuidingQuestion | null;
}

export interface QuestionsActions {
  onQuestionEdit: (index: number, question: GuidingQuestion) => void;
  onQuestionSelect: (index: number) => void;
}

export interface QuestionsSliceState extends QuestionsState, QuestionsActions {}

export interface UserState {
  currentChatSession: string | null;
}

export interface UserActions {
  setCurrentChatSession: (session: string | null) => void;
  setInitChatSession: (session: string | null) => void;
}

export interface UserSliceState extends UserState, UserActions {}

export interface ApiState {
  isFetching: boolean;
}

export interface ApiActions {
  setIsFetching: (isFetching: boolean) => void;
  fetchNewSession: () => Promise<void>;
  fetchChat: (userInput: UserInput) => Promise<void>;
  fetchAfterChat: () => Promise<void>;
}

export interface ApiSliceState extends ApiState, ApiActions {}

export interface RootState
  extends ChatSliceState,
    QuestionsSliceState,
    UserSliceState {}
