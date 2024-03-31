import { useCallback } from "react";
import useStore from "../useStore";

export default function useOnEditModeChange() {
  const setIsEditMode = useStore((state) => state.setIsEditMode);
  const fetchEditQuestions = useStore((state) => state.fetchEditQuestions);

  return useCallback(
    async (isEditMode: boolean) => {
      setIsEditMode(isEditMode);
      if (!isEditMode) {
        fetchEditQuestions();
      }
    },
    [setIsEditMode, fetchEditQuestions]
  );
}
