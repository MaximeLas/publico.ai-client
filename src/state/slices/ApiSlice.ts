import { StateCreator } from "zustand";
import { API_HOSTNAME } from "../../constants/API";
import ChatControlValues from "../../constants/ChatControlValues";
import { ApiRoute, ChatControl, InputType } from "../../enums/API";
import { MessageSender } from "../../enums/Messages";
import {
  AfterChatResponse,
  ChatRequest,
  EditAnswerRequest,
  NewSessionResponse,
} from "../../types/API";
import { ApiSliceState, RootState } from "../types";

const createApiSlice: StateCreator<RootState, [], [], ApiSliceState> = (
  set,
  get
) => ({
  isFetching: false,
  setIsFetching: (isFetching) => {
    set({ isFetching });
  },
  async fetchNewSession() {
    const { isFetching, currentChatSession } = get();
    if (isFetching || currentChatSession) return;
    set({ isFetching: true });
    const url = new URL(API_HOSTNAME);
    url.pathname = ApiRoute.NewSession;
    const response = await fetch(url, {
      method: "POST",
    });
    if (!response.ok) {
      throw response.statusText;
    }
    const resJson = await (response.json() as Promise<NewSessionResponse>);
    set((state) => ({
      ...state,
      currentChatSession: {
        id: resJson.session_id,
        title: "Untitled Session",
        createdAt: new Date(),
      },
      isFetching: false,
      currentControls: Array.from(resJson.components),
      messages: [
        ...state.messages,
        {
          content: [resJson.initial_message],
          createdAt: new Date(),
          sender: MessageSender.Bot,
        },
      ],
    }));
  },
  async fetchChat() {
    const { isFetching, currentChatSession, userInput } = get();
    if (isFetching || !currentChatSession || !userInput?.input_value) return;

    // Add user message
    set((state) => ({
      ...state,
      currentControls: [],
      userInput: null,
      isFetching: true,
      filesInput:
        userInput.input_type === InputType.Button &&
        userInput.input_value === ChatControl.FILES
          ? []
          : state.filesInput,
      messages: [
        ...state.messages,
        {
          sender: MessageSender.User,
          content:
            userInput.input_type === InputType.Button
              ? userInput.input_value === ChatControl.FILES
                ? "Successfully uploaded: " +
                  state.filesInput.map((file) => file.name).join(", ")
                : ChatControlValues[userInput.input_value!].label
              : userInput.input_value?.toString() ?? "",
          createdAt: new Date(),
        },
      ],
    }));

    const body: ChatRequest = {
      session_id: currentChatSession.id,
      user_input: userInput,
    };
    const url = new URL(API_HOSTNAME);
    url.pathname = ApiRoute.Chat;

    // Fetch chat route stream
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw response.statusText;
    if (!response.body) {
      throw new Error("Response body is empty");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const loopRunner = true;

    // Read stream and update last message with new tokens
    while (loopRunner) {
      // Here we start reading the stream, until its done.
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      set((state) => {
        const messages = [...state.messages];
        const lastMessage = { ...messages[messages.length - 1] };
        if (lastMessage && lastMessage.sender === MessageSender.Bot) {
          lastMessage.content.push(decodedChunk);
        } else {
          messages.push({
            sender: MessageSender.Bot,
            content: [decodedChunk],
            createdAt: new Date(),
          });
        }
        return { messages };
      });
    }

    // Fetch after chat route
    url.pathname = ApiRoute.AfterChat;
    const afterChatResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ session_id: currentChatSession.id }),
      headers: { "Content-Type": "application/json" },
    });
    if (!afterChatResponse.ok) {
      throw afterChatResponse.statusText;
    }
    const afterChatJson = (await afterChatResponse.json()) as AfterChatResponse;

    set((state) => {
      const questions = [...state.questions];
      let editorState = state.editorState;
      // Handle updated content
      const updatedContent = afterChatJson.updated_content;
      if (updatedContent) {
        // Update selected question index
        const questionToUpdateIndex = questions.findIndex(q => q.index === updatedContent.question_index);
        if (questionToUpdateIndex !== -1) {
          const question = { ...questions[questionToUpdateIndex] };
          if (updatedContent.question)
            question.questionTitle = updatedContent.question;
          if (updatedContent.answer) {
            question.answer = "*" + updatedContent.answer + "*";
          }
          if (updatedContent.word_limit)
            question.wordLimit = updatedContent.word_limit;
          questions[updatedContent.question_index] = question;
          editorState = question;
        } else {
          questions.push({
            questionTitle: updatedContent.question!,
            answer: updatedContent.answer
              ? updatedContent
                  .answer!.split("\n")
                  .map((t) => `*${t}*`)
                  .join("")
              : "",
            wordLimit: updatedContent.word_limit!,
            index: updatedContent.question_index!,
          });
        }
      }
      return {
        ...state,
        isFetching: false,
        currentControls: Array.from(afterChatJson.components),
        questions,
        editorState,
        messages: [
          ...state.messages,
          {
            content: [afterChatJson.initial_message],
            createdAt: new Date(),
            sender: MessageSender.Bot,
          },
        ],
      };
    });
  },
  async fetchEditQuestions() {
    const { isFetching, currentChatSession, editorState } = get();
    if (isFetching || !editorState) return;
    const sessionId = currentChatSession?.id;
    if (!sessionId) return;
    set({ isFetching: true });
    const url = new URL(API_HOSTNAME);
    url.pathname = ApiRoute.EditAnswer;
    const body: EditAnswerRequest = {
      session_id: sessionId,
      question_index: editorState.index,
      answer: editorState.answer,
    };
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      set({ isFetching: false });
      throw response.statusText;
    }
    set({ isFetching: false });
  },
});

export default createApiSlice;
