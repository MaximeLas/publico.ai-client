import { StateCreator } from "zustand";
import { InputType } from "../../enums/API";
import { UserInput } from "../../types/API";
import { ChatSliceState, RootState } from "../types";

const createChatSlice: StateCreator<RootState, [], [], ChatSliceState> = (
  set,
  get
) => ({
  messages: [],
  userInput: { input_type: InputType.Button, input_value: null },
  currentControls: [],
  initialMessage: null,
  filesInput: [],
  addFiles: (...files) => {
    set((state) => ({
      filesInput: state.filesInput.concat(files),
    }));
  },
  setFiles: (files) => {
    set({ filesInput: files });
  },
  removeFile: (index) => {
    set((state) => {
      if (index < 0 || index >= state.filesInput.length) return state;
      const newFiles = [...state.filesInput];
      newFiles.splice(index, 1);
      return { filesInput: newFiles };
    });
  },
  setMessages: (messages) => {
    set({ messages });
  },
  addMessages: (messages) => {
    set((state) => ({
      messages: state.messages.concat(messages),
    }));
  },
  setCurrentControls: (controls) => {
    set({ currentControls: controls });
  },
  setUserInput: (input) => {
    set({ userInput: input });
  },
  setUserInputType: (inputType) => {
    set((state) => ({
      userInput: { ...state.userInput, input_type: inputType } as UserInput,
    }));
  },
  setUserInputValue: (inputValue) => {
    set((state) => ({
      userInput: { ...state.userInput, input_value: inputValue } as UserInput,
    }));
  },
  setInitialMessage(message) {
    set({ initialMessage: message });
  },
});

export default createChatSlice;
