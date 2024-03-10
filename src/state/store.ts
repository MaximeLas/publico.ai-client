import { createStore } from "zustand/vanilla";
import createChatSlice from "./slices/ChatSlice";
import createQuestionsSlice from "./slices/GuidingQuestionsSlice";
import { RootState } from "./types";

const store = createStore<RootState>((...args) => ({
  ...createChatSlice(...args),
  ...createQuestionsSlice(...args),
}));

export default store;
