import { MessageSender } from "../enums/Messages";

export interface ChatSession {
  id: string;
  title: string;
  createdAt: Date;
}

export interface MessageBase {
  content: string | string[];
  createdAt: Date;
  sender: MessageSender;
}

export interface BotMessage extends MessageBase {
  content: string[];
  sender: MessageSender.Bot;
}

export interface UserMessage extends MessageBase {
  content: string;
  sender: MessageSender.User;
}

export type Message = BotMessage | UserMessage;

export interface Question {
  questionTitle: string;
  answer: string;
  wordLimit: number;
  index: number;
}

export interface QuestionRegenerateResponse extends Partial<Question> {
  index: number;
}


