import { createStore } from "zustand/vanilla";
import createApiSlice from './slices/ApiSlice';
import createChatSlice from "./slices/ChatSlice";
import createQuestionsSlice from "./slices/GuidingQuestionsSlice";
import createUserSlice from "./slices/UserSlice";
import { RootState } from "./types";
// import { persist } from "zustand/middleware";

const store = createStore<RootState>()(
  // persist<RootState>(
    (...args) => ({
      ...createChatSlice(...args),
      ...createQuestionsSlice(...args),
      ...createUserSlice(...args),
      ...createApiSlice(...args),
    }),
  //   { name: "rootStore" }
  // )
);

export default store;