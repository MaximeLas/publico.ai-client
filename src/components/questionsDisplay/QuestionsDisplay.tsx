import clsx from "clsx";
import { useState } from "react";
import {
  CardProps,
  Col,
  Nav,
  Overlay,
  Row,
  Tab,
  Tooltip,
} from "react-bootstrap";
import Markdown from "react-markdown";
import useStore from "../../hooks/useStore";
import { GuidingQuestion } from "../../types/Messages";
import TextEditor from "../textEditor/TextEditor";
import QuestionDisplayActions from "./QuestionDisplayActions";
import styles from "./QuestionsDisplay.module.scss";

export interface QuestionsDisplayProps extends CardProps {}

function QuestionsDisplay({ className, ...rest }: QuestionsDisplayProps) {
  const clsn = clsx(styles.root, className);
  const questions = useStore((state) => state.questions);
  const isEditMode = useStore((state) => state.isEditMode);
  const setQuestionAnswer = useStore((state) => state.setQuestionAnswer);
  const selectedQuestionIndex = useStore(
    (state) => state.selectedQuestionIndex
  );
  const setSelectedQuestionIndex = useStore(
    (state) => state.setSelectedQuestionIndex
  );
  const [questionTooltipTarget, setQuestionTooltipTarget] =
    useState<HTMLElement | null>(null);
  const q = questions.length
    ? questions
    : ([
        {
          questionTitle: "No questions yet",
          answer: "Start typing in the chat to create some",
        },
      ] as GuidingQuestion[]);
  return (
    <div className={clsn} {...rest}>
      <QuestionDisplayActions />
      <Tab.Container
        defaultActiveKey={0}
        onSelect={(index) =>
          setSelectedQuestionIndex(index ? parseInt(index) : -1)
        }
        activeKey={selectedQuestionIndex}
      >
        <div className="d-flex flex-column flex-grow-1">
          <Row as={Nav} className="justify-content-start gx-0" variant="tabs">
            {q.map((_, i) => (
              <Col
                className="px-0"
                data-tooltip={q[i].questionTitle}
                onPointerEnter={(e) =>
                  setQuestionTooltipTarget(e.currentTarget)
                }
                onPointerLeave={() => setQuestionTooltipTarget(null)}
                key={i}
                as={Nav.Item}
                xs={5}
                md={4}
                lg={3}
              >
                <Nav.Link
                  disabled={isEditMode && i !== selectedQuestionIndex}
                  className="text-center"
                  eventKey={i}
                >
                  Question {i + 1}
                </Nav.Link>
              </Col>
            ))}
          </Row>
          <Row className="flex-grow-1 gx-0">
            <Tab.Content className="border border-top-0 bg-light-subtle">
              {q.map(({ answer, questionTitle, wordLimit }, i) => (
                <Tab.Pane eventKey={i} className="border-0 p-4" key={i}>
                  <h5>
                    <strong>{questionTitle}</strong>
                    {wordLimit && (
                      <span className="fs-6"> ({wordLimit} words)</span>
                    )}
                  </h5>
                  {isEditMode ? (
                    <TextEditor
                      onMarkdownChange={(value) => setQuestionAnswer(i, value)}
                      content={answer}
                    />
                  ) : (
                    <Markdown className="fs-6">{answer}</Markdown>
                  )}
                  {!!wordLimit && !!answer.length && (
                    <p className="fs-6 fst-italic">
                      ({answer.split(" ").length} words)
                    </p>
                  )}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Row>
        </div>
      </Tab.Container>
      <Overlay target={questionTooltipTarget} show={!!questionTooltipTarget}>
        {(props) => (
          <Tooltip {...props} className="position-fixed">
            {questionTooltipTarget?.dataset.tooltip}
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}

export default QuestionsDisplay;
