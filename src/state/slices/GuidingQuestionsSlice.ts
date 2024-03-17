import { StateCreator } from "zustand";
import { QuestionsSliceState, RootState } from "../types";

const createQuestionsSlice: StateCreator<
  RootState,
  [],
  [],
  QuestionsSliceState
> = (set, get) => ({
  isEditMode: false,
  questions: [],
  currentQuestion: null,
  setIsEditMode: (isEditMode) => {
    set({ isEditMode });
  },
  onQuestionEdit: (index, answer) => {
    set((state) => {
      const newQuestions = [...state.questions];
      const newQuestion = { ...newQuestions[index] };
      newQuestion.answer = answer;
      newQuestions[index] = newQuestion;
      return { questions: newQuestions };
    });
  },
  onQuestionSelect: (index) => {
    set({ currentQuestion: get().questions[index] });
  },
});

export default createQuestionsSlice;
