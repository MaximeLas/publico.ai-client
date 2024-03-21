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
  isFetching: false,
  setIsFetching: (isFetching) => {
    set({ isFetching });
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
