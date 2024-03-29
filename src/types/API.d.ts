import { ChatControl, InputType } from "../enums/API";

export interface UserInputBase {
  input_type: InputType;
  input_value: string | ChatControl | number | null;
}

export interface UserInputButton extends UserInputBase {
  input_type: InputType.Button;
  input_value: ChatControl | null;
}

export interface UserInputText extends UserInputBase {
  input_type: InputType.Chatbot;
  input_value: ChatControl.FILES | string | null;
}

export interface UserInputNumber extends UserInputBase {
  input_type: InputType.NumberInput;
  input_value: number | null;
}

export type UserInput = UserInputButton | UserInputText | UserInputNumber;

export interface ChatRequest {
  session_id: string;
  user_input: UserInput;
}

export interface NewSessionResponse {
  session_id: string;
  initial_message: string;
  components: Set<ChatControl>;
}

export interface UpdatedEditorContent {
  question_index: number;
  question?: string;
  word_limit?: number;
  answer?: string;
}

export interface AfterChatResponse {
  initial_message: string;
  components: Set<ChatControl>;
  updated_content?: UpdatedEditorContent;
}

export interface AfterChatRequest {
  session_id: string;
}

export interface EditAnswerRequest {
  session_id: string;
  question_index: int;
  answer: str;
}
