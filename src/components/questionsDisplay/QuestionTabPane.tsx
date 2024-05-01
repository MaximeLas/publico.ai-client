import useStore from "../../hooks/state/useStore";
import TextEditor from "../textEditor/TextEditor";
import Markdown from "react-markdown";
import { Tab } from "react-bootstrap";
import styles from "./QuestionsDisplay.module.scss";
import useOnQuestionAnswerChanged from "../../hooks/FormHandlers/useOnQuestionAnswerChanged";

export interface QuestionTabPaneProps {
  eventKey?: string | number;
  questionTitle: string;
  wordLimit?: number;
  answer: string;
}

const QuestionTabPane = ({
  eventKey,
  answer,
  wordLimit,
  questionTitle,
}: QuestionTabPaneProps) => {
  const isEditMode = useStore((state) => state.isEditMode);
  const editorState = useStore((state) => state.editorState);
  const setQuestionAnswer = useOnQuestionAnswerChanged();
  return (
    <Tab.Pane eventKey={eventKey} className="border-0 p-4">
      <h5>
        <strong>{questionTitle}</strong>
        {!!wordLimit && <span className="fs-6"> ({wordLimit} words)</span>}
      </h5>
      {isEditMode && editorState ? (
        <div className={styles.questionEdit}>
        <TextEditor
          onMarkdownChange={(value) => setQuestionAnswer(value)}
          content={editorState.answer}
        />
        </div>
      ) : (
        <Markdown className="fs-6">{answer}</Markdown>
      )}
      {!!wordLimit && !!answer.length && (
        <p className="fs-6 fst-italic">({answer.split(" ").length} words)</p>
      )}
    </Tab.Pane>
  );
};

export default QuestionTabPane;
