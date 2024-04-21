import { StateCreator } from "zustand";
import { QuestionsSliceState, RootState } from "../types";

const createQuestionsSlice: StateCreator<
  RootState,
  [],
  [],
  QuestionsSliceState
> = (set) => ({
  isEditMode: false,
  questions: [],
  editorState: null,
  selectedQuestionIndex: 0,
  didEditorChange: false,
  setDidEditorChange: (didEditorChange) => {
    set({ didEditorChange });
  },
  setEditorState(editorState) {
    set({ editorState, didEditorChange: true });
  },
  setSelectedQuestionIndex(index) {
    set({ selectedQuestionIndex: index });
  },
  setIsEditMode: (isEditMode) => {
    set({ isEditMode });
  },
  setEditorStateAnswer: (answer) => {
    set((state) =>
      !state.editorState
        ? state
        : { editorState: { ...state.editorState, answer }, didEditorChange: true }
    );
  },
  applyEditorState: () => {
    set((state) => {
      const editorState = state.editorState;
      if (!editorState) return state;
      const questions = [...state.questions];
      const selectedQuestionIndex = questions.findIndex(
        (q) => q.index === editorState.index
      );
      if (selectedQuestionIndex === -1) return state;
      questions[selectedQuestionIndex] = editorState;
      return {
        questions,
        didEditorChange: false,
        editorState: null,
      };
    });
  },
});

export default createQuestionsSlice;
