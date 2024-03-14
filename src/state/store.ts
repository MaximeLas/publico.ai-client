import { createStore } from "zustand/vanilla";
import createChatSlice from "./slices/ChatSlice";
import createQuestionsSlice from "./slices/GuidingQuestionsSlice";
import createUserSlice from "./slices/UserSlice";
import { RootState } from "./types";

const store = createStore<RootState>((...args) => ({
  ...createChatSlice(...args),
  ...createQuestionsSlice(...args),
  ...createUserSlice(...args),
}));

export default store;
