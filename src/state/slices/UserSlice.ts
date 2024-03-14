import { StateCreator } from "zustand";
import { UserSliceState, RootState } from "../types";

const createUserSlice: StateCreator<RootState, [], [], UserSliceState> = (
  set
) => ({
  currentChatSession: null,
  setCurrentChatSession(session) {
    set({ currentChatSession: session });
  },
  setInitChatSession(session) {
    set(state => state.currentChatSession === null ? { currentChatSession: session } : {});
  },
});

export default createUserSlice;
