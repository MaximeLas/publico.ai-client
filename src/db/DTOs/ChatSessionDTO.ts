import ChatSessionModel from "../Models/Chat/ChatSession";
import { Timestamp } from "../Abstractions";
import IStateDTO from "./IStateDTO";
import { RootState } from "../../state/types";
import MessageDataDTO from "./MessageDataDTO";

const ChatSessionDTO: IStateDTO<RootState, ChatSessionModel> = {
  fromState(state) {
    const {
      currentChatSession,
      user,
      filesInput,
      questions,
      messages,
      currentControls,
      editorState
    } = state;
    if (!user || !currentChatSession) return null;
    return {
      id: currentChatSession.id,
      userId: user.id,
      title: currentChatSession.title,
      messages: messages.map(MessageDataDTO.toModel),
      implicitQuestions: questions,
      createdAt: Timestamp.fromDate(currentChatSession.createdAt),
      uploadedFiles: filesInput.map((file) => file.name),
      currentControls,
      editorState
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
      editorState,
    } = model;
    return {
      currentChatSession: {
        id,
        title,
        createdAt: createdAt.toDate(),
      },
      questions: implicitQuestions,
      editorState,
      messages: messages.map(MessageDataDTO.fromModel),
      currentControls: currentControls,
    };
  },
  fromPartialState(state) {
    const {
      questions,
      messages,
      currentChatSession,
      filesInput,
      currentControls,
      editorState
    } = state;
    const result: Partial<ChatSessionModel> = {};
    if (currentChatSession) {
      result.id = currentChatSession.id;
      result.title = currentChatSession.title;
      result.createdAt = Timestamp.fromDate(currentChatSession.createdAt);
    }
    if (filesInput?.length) result.uploadedFiles = filesInput.map((file) => file.name);
    if (currentControls?.length) result.currentControls = currentControls;
    if (messages?.length) result.messages = messages.map(MessageDataDTO.toModel);
    if (questions?.length) result.implicitQuestions = questions;
    if (editorState) result.editorState = editorState;
    return result;
  },
};

export default ChatSessionDTO;
