import { Card, Tab, Tabs } from "react-bootstrap";
import useStore from "../../hooks/useStore";
import { GuidingQuestion } from "../../types/Messages";
import TextEditor from "../textEditor/TextEditor";
import Markdown from "react-markdown";

export interface QuestionsDisplayProps {
  isEditing?: boolean;
  onQuestionSelect?: (question: GuidingQuestion) => void;
}

function QuestionsDisplay({
  isEditing,
  onQuestionSelect,
}: QuestionsDisplayProps) {
  const questions = useStore((state) => state.questions);
  const onQuestionEdit = useStore((state) => state.onQuestionEdit);
  return (
    <Card className="h-100 overflow-auto">
      <Tabs unmountOnExit>
        {questions.map((question, i) => (
          <Tab
            className="p-2 border-0"
            eventKey={`Question ${i}`}
            onSelect={() => onQuestionSelect?.(questions[i])}
            key={i}
            title={`Question ${i + 1}`}
          >
            <h5>
              <strong>{question.questionTitle}</strong>
              {question.wordLimit && ` (${question.wordLimit} words)`}
            </h5>
            {isEditing ? (
              <TextEditor
                onMarkdownChange={(value) => onQuestionEdit(i, value)}
                content={question.answer}
              />
            ) : (
              <Markdown className="fs-6">{question.answer}</Markdown>
            )}
            {question.answer.length > 0 && (
              <p>({question.answer.split(" ").length} words)</p>
            )}
          </Tab>
        ))}
      </Tabs>
    </Card>
  );
}

export default QuestionsDisplay;
