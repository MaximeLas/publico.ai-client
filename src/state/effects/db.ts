import { RootState } from "../types";
import type storeType from "../store";
import DBClient from "../../db/DBClient";
import debounce from "../../utilities/debounce";
import ChatSessionDTO from "../../db/DTOs/ChatSessionDTO";

export default function dbEffects(st: typeof storeType) {
  const { updateSession } = DBClient;
  const debounceUpdateSession = debounce((state: RootState) => {
    const { user, currentChatSession, currentControls, messages, questions } =
      state;
    if (!user || !currentChatSession) return;
    updateSession(
      currentChatSession.id,
      ChatSessionDTO.fromPartialState({
        currentControls,
        messages,
        questions,
      })
    );
  }, 1000);

  const unsubscribeControls = st.subscribe(debounceUpdateSession);
  const unubscribeMessages = st.subscribe(debounceUpdateSession);
  const unsubscribeQuestions = st.subscribe(debounceUpdateSession);

  return () => {
    unsubscribeControls();
    unubscribeMessages();
    unsubscribeQuestions();
  };
}
