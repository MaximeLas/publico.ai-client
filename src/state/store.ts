import { createStore } from "zustand/vanilla";
import createApiSlice from "./slices/ApiSlice";
import createAuthSlice from "./slices/AuthSlice";
import createChatSlice from "./slices/ChatSlice";
import createQuestionsSlice from "./slices/QuestionsSlice";
import createUserSlice from "./slices/UserSlice";
import { RootState } from "./types";
import { subscribeWithSelector } from "zustand/middleware";

const store = createStore<RootState>()(
  subscribeWithSelector((...args) => ({
    ...createAuthSlice(...args),
    ...createChatSlice(...args),
    ...createQuestionsSlice(...args),
    ...createUserSlice(...args),
    ...createApiSlice(...args),
  }))
);
export default store;
