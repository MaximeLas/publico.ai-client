import { ChatControl } from "../enums/API";
import { UserInput } from "../types/API";
import { ChatSession, GuidingQuestion, Message } from "../types/Messages";

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
  isEditMode: boolean;
  questions: GuidingQuestion[];
  currentQuestion: GuidingQuestion | null;
}

export interface QuestionsActions {
  setIsEditMode: (isEditMode: boolean) => void;
  onQuestionEdit: (index: number, question: string) => void;
  onQuestionSelect: (index: number) => void;
}

export interface QuestionsSliceState extends QuestionsState, QuestionsActions {}

export interface UserState {
  currentChatSession: ChatSession | null;
}

export interface UserActions {
  setCurrentChatSession: (session: ChatSession | null) => void;
  setInitChatSession: (session: ChatSession | null) => void;
  setCurrentSessionTitle: (sessionTitle: string) => void;
}

export interface UserSliceState extends UserState, UserActions {}

// export interface ApiState {
//   isFetching: boolean;
// }

// export interface ApiActions {
//   setIsFetching: (isFetching: boolean) => void;
//   fetchNewSession: () => Promise<void>;
//   fetchChat: (userInput: UserInput) => Promise<void>;
//   fetchAfterChat: () => Promise<void>;
// }

// export interface ApiSliceState extends ApiState, ApiActions {}

export interface RootState
  extends ChatSliceState,
    QuestionsSliceState,
    UserSliceState {}
