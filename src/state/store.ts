import { createStore } from "zustand/vanilla";
import createApiSlice from "./slices/ApiSlice";
import createAuthSlice from "./slices/AuthSlice";
import createChatSlice from "./slices/ChatSlice";
import createQuestionsSlice from "./slices/QuestionsSlice";
import createUserSlice from "./slices/UserSlice";
import { RootState } from "./types";
// import { persist } from "zustand/middleware";
import { subscribeWithSelector } from "zustand/middleware";

const store = createStore<RootState>()(
  // persist<RootState>(
  subscribeWithSelector((...args) => ({
    ...createAuthSlice(...args),
    ...createChatSlice(...args),
    ...createQuestionsSlice(...args),
    ...createUserSlice(...args),
    ...createApiSlice(...args),
  }))
  //   { name: "rootStore" }
  // )
);
export default store;
