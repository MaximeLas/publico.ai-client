import {
  CardProps,
  Col,
  Form,
  Nav,
  Overlay,
  Row,
  Tab,
  Tooltip,
} from "react-bootstrap";
import useStore from "../../hooks/useStore";
import { GuidingQuestion } from "../../types/Messages";
import TextEditor from "../textEditor/TextEditor";
import Markdown from "react-markdown";
import Switch from "../../sharedComponents/switch/Switch";
import clsx from "clsx";
import { useState } from "react";
import useOnEditModeChange from "../../hooks/helpers/useOnEditModeChange";
import styles from "./QuestionsDisplay.module.scss";

export interface QuestionsDisplayProps extends CardProps {
  onQuestionSelect?: (question: GuidingQuestion) => void;
}

function QuestionsDisplay({
  onQuestionSelect,
  className,
  ...rest
}: QuestionsDisplayProps) {
  const clsn = clsx(styles.root, className);
  const questions = useStore((state) => state.questions);
  const isEditMode = useStore((state) => state.isEditMode);
  const setQuestionAnswer = useStore((state) => state.setQuestionAnswer);
  const onEditModeChange = useOnEditModeChange();
  const selectedQuestionIndex = useStore(
    (state) => state.selectedQuestionIndex
  );
  const setSelectedQuestionIndex = useStore(
    (state) => state.setSelectedQuestionIndex
  );
  const [questionTooltipTarget, setQuestionTooltipTarget] =
    useState<HTMLElement | null>(null);
  const [questionTooltipTargetIndex, setQuestionTooltipTargetIndex] =
    useState(-1);

    const switchLabelClsnBase = clsx("my-0", !questions.length && "text-500");
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
      <span className="d-flex flex-nowrap align-items-center justify-content-end my-1">
        <Form.Label className={clsx(!isEditMode && "text-secondary", switchLabelClsnBase)}>
          View Mode
        </Form.Label>
        <Switch
          disabled={!questions.length}
          checked={isEditMode}
          className="mx-1"
          style={{ height: "60%" }}
          onChange={onEditModeChange}
        />
        <Form.Label className={clsx(isEditMode && "text-secondary", switchLabelClsnBase)}>
          Edit Mode
        </Form.Label>
      </span>
      <Tab.Container
        defaultActiveKey={0}
        onSelect={(index) =>
          setSelectedQuestionIndex(index ? parseInt(index) : -1)
        }
        activeKey={selectedQuestionIndex}
      >
        <div className="d-flex flex-column">
          <Row as={Nav} className="justify-content-start gx-0" variant="tabs">
            {q.map((_, i) => (
              <Col
                className="px-0"
                onPointerEnter={(e) => {
                  setQuestionTooltipTarget(e.target as HTMLElement);
                  setQuestionTooltipTargetIndex(i);
                }}
                onPointerLeave={() => {
                  setQuestionTooltipTarget(null);
                  setQuestionTooltipTargetIndex(-1);
                }}
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
                      <span className="fs-6">{" "}({wordLimit} words)</span>
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
      <Overlay
        target={questionTooltipTarget}
        show={questionTooltipTargetIndex !== -1 && !!questionTooltipTarget}
      >
        {(props) => (
          <Tooltip {...props} style={{ position: "fixed", ...props.style }}>
            {q[questionTooltipTargetIndex]?.questionTitle}
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}

export default QuestionsDisplay;
