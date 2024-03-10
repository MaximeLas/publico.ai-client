import { StateCreator } from "zustand";
import { QuestionsSliceState, RootState } from "../types";

const createQuestionsSlice: StateCreator<RootState, [], [], QuestionsSliceState> = (set, get) => ({
  questions: [],
  currentQuestion: null,
  onQuestionEdit: (index, question) => {
    set((state) => {
      const newQuestions = [...state.questions];
      newQuestions[index] = question;
      return { questions: newQuestions };
    });
  },
  onQuestionSelect: (index) => {
    set({ currentQuestion: get().questions[index] });
  },
});

export default createQuestionsSlice;