import { StateCreator } from "zustand";
import { UserSliceState, RootState } from "../types";

const createUserSlice: StateCreator<RootState, [], [], UserSliceState> = (
  set
) => ({
  currentChatSession: null,
  clearChatSession() {
    set({
      currentChatSession: null,
      messages: [],
      questions: [],
      currentControls: [],
    });
  },
  setCurrentChatSession(session) {
    set({ currentChatSession: session });
  },
  setInitChatSession(session) {
    set((state) =>
      state.currentChatSession === null ? { currentChatSession: session } : {}
    );
  },
  setCurrentSessionTitle(sessionTitle) {
    set((state) =>
      state.currentChatSession
        ? {
            ...state,
            currentChatSession: {
              ...state.currentChatSession,
              title: sessionTitle,
            },
          }
        : state
    );
  },
});

export default createUserSlice;
