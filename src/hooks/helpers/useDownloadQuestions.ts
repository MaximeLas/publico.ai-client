import { useCallback } from "react";
import download from "../../utilities/download";
import useStore from "../state/useStore";
import { Editor } from "@tiptap/core";
import { Markdown } from "tiptap-markdown";
import StarterKit from "@tiptap/starter-kit";

function useDownloadQuestions() {
  const questions = useStore((state) => state.questions);

  return useCallback(() => {
    let result = "";
    const editor = new Editor({
      content: result,
      extensions: [StarterKit, Markdown],
    });
    for (const question of questions) {
      editor.chain().clearContent().setContent(question.answer).run();
      result += `${question.questionTitle}\n${editor.getText()}\n\n`;
    }

    const name = `Publico Questions - ${new Date().toISOString()}.txt`;
    editor.destroy();
    return download(name, result);
  }, [questions]);
}

export default useDownloadQuestions;
