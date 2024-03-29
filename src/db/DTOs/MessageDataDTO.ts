import { MessageSender } from "../../enums/Messages";
import { Message } from "../../types/Messages";
import { Timestamp } from "../Abstractions";
import MessageData from "../Models/Chat/MessageData";
import IModelDTO from "./IModelDTO";

const MessageDataDTO: IModelDTO<Message, MessageData> = {
  fromModel(model: MessageData): Message {
    if (model.sender === MessageSender.User) {
      return {
        content: model.content,
        createdAt: model.createdAt.toDate(),
        sender: MessageSender.User,
      };
    } else {
      return {
        content: [model.content],
        createdAt: model.createdAt.toDate(),
        sender: MessageSender.Bot,
      };
    }
  },
  toModel(instance: Message): MessageData {
    return {
      content:
        instance.sender === MessageSender.User
          ? instance.content
          : instance.content.join(" "),
      createdAt: Timestamp.fromDate(instance.createdAt),
      sender: instance.sender,
    };
  },
};

export default MessageDataDTO;
