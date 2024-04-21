import { ChatControl } from '../../../enums/API';
import { Timestamp, Question } from "../../Abstractions";
import MessageData from "./MessageData";

export default interface ChatSession {
  id: string;
  userId: string;
  title: string;
  createdAt: Timestamp;
  messages: MessageData[];
  questions: Question[];
  editorState: Question | null;
  uploadedFiles: string[];
  currentControls: ChatControl[];
}
