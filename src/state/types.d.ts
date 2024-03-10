import { GuidingQuestion, Message } from "../types/Messages";

export interface ChatState {
  messages: Message[];
  inputValue: string;
}

export interface ChatActions {
  addMessages: (...messages: Message[]) => void;
  setMessages: (messages: Message[]) => void;
  setInputValue: (value: string) => void;
  // handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  // handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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


export interface RootState extends ChatSliceState, QuestionsSliceState {}
