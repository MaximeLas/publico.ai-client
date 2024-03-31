import { useCallback } from "react";
import useDebounce from "../helpers/useDebounce";
import useDB from "../useDB";
import useStore from "../useStore";
import useStoreApi from "../useStoreApi";

export default function useOnSessionTitleChange() {
  const setSessionTitle = useStore((state) => state.setCurrentSessionTitle);
  const { updateSession } = useDB();
  const { getState } = useStoreApi();
  const onChange = useCallback(
    async (title?: string | null) => {
      if (!title) return;
      const { currentChatSession } = getState();
      const { id, title: currentTitle } = currentChatSession || {};
      if (!id || title === currentTitle) return;
      setSessionTitle(title);
      updateSession(id, { title });
    },
    [getState, setSessionTitle, updateSession]
  );

  return useDebounce(onChange, 1000);
}
