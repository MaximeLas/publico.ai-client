import { ChatControl } from "../enums/API";
import { UserInput } from "../types/API";
import { User } from "../types/Auth";
import { ChatSession, GuidingQuestion, Message } from "../types/Messages";

export interface ChatState {
  messages: Message[];
  initialMessage: string | null;
  currentControls: ChatControl[];
  userInput: UserInput | null;
  filesInput: File[];
}

export interface ChatActions {
  addMessages: (...messages: Message[]) => void;
  setMessages: (messages: Message[]) => void;
  setCurrentControls: (controls: ChatControl[]) => void;
  setUserInput: (input: UserInput) => void;
  setUserInputType: (inputType: UserInput["input_type"]) => void;
  setUserInputValue: (inputValue: UserInput["input_value"]) => void;
  setInitialMessage: (message: string | null) => void;
  addFiles: (...files: File[]) => void;
  setFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
}

export interface ChatSliceState extends ChatState, ChatActions {}

export interface QuestionsState {
  isEditMode: boolean;
  questions: GuidingQuestion[];
  selectedQuestionIndex: number;
  currentQuestion: GuidingQuestion | null;
  editedQuestions: number[];
}

export interface QuestionsActions {
  setIsEditMode: (isEditMode: boolean) => void;
  setSelectedQuestionIndex: (index: number) => void;
  setQuestionAnswer: (index: number, answer: string) => void;
  setEditedQuestions: (editedQuestions: number[]) => void;
}

export interface QuestionsSliceState extends QuestionsState, QuestionsActions {}

export interface UserState {
  currentChatSession: ChatSession | null;
}

export interface UserActions {
  setCurrentChatSession: (session: ChatSession | null) => void;
  setInitChatSession: (session: ChatSession | null) => void;
  setCurrentSessionTitle: (sessionTitle: string) => void;
  clearChatSession: () => void;
}

export interface UserSliceState extends UserState, UserActions {}

export interface ApiState {
  isFetching: boolean;
}

export interface ApiActions {
  setIsFetching: (isFetching: boolean) => void;
  fetchNewSession: () => Promise<void>;
  fetchChat: () => Promise<void>;
  fetchEditQuestions: () => Promise<void>;
}

export interface ApiSliceState extends ApiState, ApiActions {}

export interface AuthState {
  user: User | null;
  isAuthInitialized: boolean;
  isAuthSubmitting: boolean;
}

export interface AuthActions {
  setUser: (user: User | null) => void;
  sendEmailLoginLink: (email: string) => Promise<void>;
  signInWithEmailLink: (email: string, url: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthSliceState extends AuthState, AuthActions {}

export interface RootState
  extends AuthSliceState,
    ChatSliceState,
    QuestionsSliceState,
    UserSliceState,
    ApiSliceState {}
