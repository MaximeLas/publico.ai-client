import { StateCreator } from "zustand";
import { API_HOSTNAME } from "../../constants/API";
import ChatControlValues from "../../constants/ChatControlValues";
import { ApiRoute, InputType } from "../../enums/API";
import { MessageSender } from "../../enums/Messages";
import {
  AfterChatResponse,
  ChatRequest,
  EditAnswerRequest,
  NewSessionResponse,
} from "../../types/API";
import { ApiSliceState, RootState } from "../types";
import { BotMessage } from "../../types/Messages";
import { fetchAuthorized } from "../../utilities/api";

const createApiSlice: StateCreator<RootState, [], [], ApiSliceState> = (
  set,
  get
) => ({
  isFetching: false,
  setIsFetching: (isFetching) => {
    set({ isFetching });
  },
  async fetchNewSession() {
    const { isFetching, currentChatSession, user } = get();
    if (!user || isFetching || currentChatSession) return;
    set({ isFetching: true });
    const url = new URL(API_HOSTNAME);
    url.pathname = ApiRoute.NewSession;
    const response = await fetchAuthorized(
      url,
      {
        method: "POST",
      },
      user
    );
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
        } as BotMessage,
      ],
    }));
  },
  async fetchChat() {
    const { isFetching, currentChatSession, userInput, user, filesInput } = get();
    if (!user || isFetching || !currentChatSession || !userInput?.input_value)
      return;

    // Add user message
    set((state) => ({
      ...state,
      currentControls: [],
      userInput: null,
      isFetching: true,
      filesInput:
        userInput.input_type === InputType.Files
          ? []
          : state.filesInput,
      messages: [
        ...state.messages,
        {
          sender: MessageSender.User,
          content:
            userInput.input_type === InputType.Button
              ? ChatControlValues[userInput.input_value!].label
              : userInput.input_type === InputType.Files
              ? "Selected files: \n" +
                state.filesInput.map((file) => '📄 ' + file.name).join("\n")
              : userInput.input_value?.toString() ?? "",
          createdAt: new Date(),
        },
      ],
    }));

    const body: ChatRequest = {
      session_id: currentChatSession.id,
      user_input: userInput.input_type === InputType.Files ? {input_type: userInput.input_type, input_value: filesInput.map((f) => f.name)} : userInput,
    };
    const url = new URL(API_HOSTNAME);
    url.pathname = ApiRoute.Chat;

    // Fetch chat route stream
    const response = await fetchAuthorized(
      url,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      },
      user
    );
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
    const afterChatResponse = await fetchAuthorized(url, {
      method: "POST",
      body: JSON.stringify({ session_id: currentChatSession.id }),
      headers: { "Content-Type": "application/json" },
    }, user);
    if (!afterChatResponse.ok) {
      throw afterChatResponse.statusText;
    }
    const afterChatJson = (await afterChatResponse.json()) as AfterChatResponse;

    set((state): RootState => {
      const questions = [...state.questions];
      let editorState = state.editorState;
      let selectedQuestionIndex = state.selectedQuestionIndex;
      // Handle updated content
      const updatedContent = afterChatJson.updated_content;
      if (updatedContent) {
        // Update selected question index
        const questionToUpdateIndex = questions.findIndex(
          (q) => q.index === updatedContent.question_index
        );
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
          selectedQuestionIndex = question.index;
        } else {
          questions.push({
            questionTitle: updatedContent.question!,
            answer: updatedContent.answer ?? "",
            wordLimit: updatedContent.word_limit!,
            index: updatedContent.question_index!,
          });
          selectedQuestionIndex = updatedContent.question_index!;
        }
      }
      return {
        ...state,
        isFetching: false,
        currentControls: Array.from(afterChatJson.components),
        selectedQuestionIndex,
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
    const { isFetching, currentChatSession, editorState, user } = get();
    if (!user || isFetching || !editorState) return;
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
    const response = await fetchAuthorized(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }, user);
    if (!response.ok) {
      set({ isFetching: false });
      throw response.statusText;
    }
    set({ isFetching: false });
  },
});

export default createApiSlice;
