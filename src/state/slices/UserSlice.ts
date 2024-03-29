import { StateCreator } from "zustand";
import { UserSliceState, RootState } from "../types";

const createUserSlice: StateCreator<RootState, [], [], UserSliceState> = (
  set
) => ({
  currentUser: null,
  currentChatSession: null,
  clearChatSession() {
    set({
      currentChatSession: null,
      messages: [],
      questions: [],
      currentControls: [],
    });
  },
  setCurrentUser(userId) {
    set({ currentUser: userId });
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
