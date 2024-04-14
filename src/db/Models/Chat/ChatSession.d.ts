import { ChatControl } from '../../../enums/API';
import { Timestamp, ImplicitQuestion } from "../../Abstractions";
import MessageData from "./MessageData";

export default interface ChatSession {
  id: string;
  userId: string;
  title: string;
  createdAt: Timestamp;
  messages: MessageData[];
  implicitQuestions: ImplicitQuestion[];
  editorState: ImplicitQuestion | null;
  uploadedFiles: string[];
  currentControls: ChatControl[];
}
