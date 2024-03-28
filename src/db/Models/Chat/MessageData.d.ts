import { MessageSender } from "../../../enums/Messages";
import { Timestamp } from "../../Abstractions";

export default interface MessageData {
  content: string;
  sender: MessageSender;
  createdAt: Timestamp;
}
