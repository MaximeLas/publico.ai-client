import { useCallback } from "react";
import ChatSessionDTO from "../../db/DTOs/ChatSessionDTO";
import useDB from "../useDB";
import useStore from "../useStore";
import useStoreApi from "../useStoreApi";

export default function useFetchAndSaveSession() {
  const fetchNewSession = useStore((state) => state.fetchNewSession);
  const { getState } = useStoreApi();
  const { createNewSession } = useDB();
  return useCallback(
    async function fetchAndSaveSession(userId: string) {
  
      await fetchNewSession();
      const sessionModel = ChatSessionDTO.fromState(getState());
      if (sessionModel) {
        await createNewSession(sessionModel);
      }
    },
    [createNewSession, fetchNewSession, getState]
  );
}
