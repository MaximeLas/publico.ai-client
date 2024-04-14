import { useCallback } from "react";
import useStore from "../state/useStore";
import useStoreApi from '../state/useStoreApi';

export default function useOnEditModeChange() {
  const setIsEditMode = useStore((state) => state.setIsEditMode);
  const fetchEditQuestions = useStore((state) => state.fetchEditQuestions);
  const applyEditorState = useStore((state) => state.applyEditorState);
  const setEditorState = useStore((state) => state.setEditorState);
  const { getState } = useStoreApi();

  return useCallback(
    async (isEditMode: boolean) => {
      setIsEditMode(isEditMode);
      if (isEditMode) {
        const { selectedQuestionIndex, questions } = getState();
        setEditorState(questions[selectedQuestionIndex]);
      } else {
        await fetchEditQuestions();
        applyEditorState();
      }
    },
    [setIsEditMode, fetchEditQuestions, applyEditorState, setEditorState, getState]
  );
}
