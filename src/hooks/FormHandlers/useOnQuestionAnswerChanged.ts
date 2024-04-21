import { useCallback } from "react";
import useDebounce from "../helpers/useDebounce";
import useStore from "../state/useStore";
import useDB from "../useDB";
import ChatSessionDTO from "../../db/DTOs/ChatSessionDTO";

function useOnQuestionAnswerChanged() {
  const setEditorStateAnswer = useStore((state) => state.setEditorStateAnswer);
  const editorState = useStore((state) => state.editorState);
  const sessionId = useStore((state) => state.currentChatSession?.id);
  const { updateSession } = useDB();
  const debounceUpdateSession = useDebounce(updateSession, 500);

  return useCallback(
    (newEditorState: string) => {
      setEditorStateAnswer(newEditorState);
      if (!sessionId || !editorState) return;
      debounceUpdateSession(
        sessionId,
        ChatSessionDTO.fromPartialState({
          editorState: { ...editorState, answer: newEditorState },
        })
      );
    },
    [debounceUpdateSession, editorState, sessionId, setEditorStateAnswer]
  );
}

export default useOnQuestionAnswerChanged;
