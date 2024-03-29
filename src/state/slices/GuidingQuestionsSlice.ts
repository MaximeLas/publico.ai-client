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
  selectedQuestionIndex: 0,
  editedQuestions: [],
  setEditedQuestions(editedQuestions) {
    set({ editedQuestions });
  },
  setSelectedQuestionIndex(index) {
    set({ selectedQuestionIndex: index });
  },
  setIsEditMode: (isEditMode) => {
    set({ isEditMode });
  },
  setQuestionAnswer: (index, answer) => {
    set((state) => {
      const newQuestions = [...state.questions];
      const newQuestion = { ...newQuestions[index] };
      newQuestion.answer = answer;
      newQuestions[index] = newQuestion;
      return {
        questions: newQuestions,
        editedQuestions: state.editedQuestions.includes(index)
          ? state.editedQuestions
          : [...state.editedQuestions, index],
      };
    });
  },
});

export default createQuestionsSlice;
