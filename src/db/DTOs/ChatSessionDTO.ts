import ChatSessionModel from "../Models/Chat/ChatSession";
import { Timestamp } from "../Abstractions";
import IStateDTO from "./IStateDTO";
import { RootState } from "../../state/types";
import MessageDataDTO from "./MessageDataDTO";

const ChatSessionDTO: IStateDTO<RootState, ChatSessionModel> = {
  fromState(state) {
    const {
      currentChatSession,
      currentUser: userId,
      filesInput,
      questions,
      messages,
      currentControls,
    } = state;
    if (!userId || !currentChatSession) return null;
    return {
      id: currentChatSession.id,
      userId,
      title: currentChatSession.title,
      messages: messages.map(MessageDataDTO.toModel),
      implicitQuestions: questions,
      createdAt: Timestamp.fromDate(currentChatSession.createdAt),
      uploadedFiles: filesInput.map((file) => file.name),
      currentControls,
    };
  },
  toState(model) {
    const {
      id,
      title,
      createdAt,
      messages,
      implicitQuestions,
      currentControls,
    } = model;
    return {
      currentChatSession: {
        id,
        title,
        createdAt: createdAt.toDate(),
      },
      questions: implicitQuestions,
      messages: messages.map(MessageDataDTO.fromModel),
      currentControls: currentControls,
    };
  },
  fromPartialState(state) {
    const { questions, messages, ...rest } = state;
    const result: Partial<ChatSessionModel> = { ...rest };
    if (messages) result.messages = messages.map(MessageDataDTO.toModel);
    if (questions) result.implicitQuestions = questions;
    return result;
  },
};

export default ChatSessionDTO;
