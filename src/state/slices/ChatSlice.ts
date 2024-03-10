import { StateCreator } from "zustand";
import { ChatSliceState, RootState } from "../types";

const createChatSlice: StateCreator<RootState, [], [], ChatSliceState> = (set, get) => ({
  messages: [],
  inputValue: "",
  setMessages: (messages) => {
    set({ messages });
  },
  addMessages: (messages) => {
    set((state) => ({
      messages: state.messages.concat(messages),
    }));
  },
  setInputValue: (value) => {
    set({ inputValue: value });
  },
});

export default createChatSlice;
