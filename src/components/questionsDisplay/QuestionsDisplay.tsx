import clsx from "clsx";
import React, { useState } from "react";
import {
  Nav,
  Overlay,
  Row,
  Tab,
  Tooltip,
} from "react-bootstrap";
import useStore from "../../hooks/state/useStore";
import QuestionDisplayActions from "./QuestionDisplayActions";
import styles from "./QuestionsDisplay.module.scss";
import QuestionTabHeader from "./QuestionTabHeader";
import QuestionTabPane from "./QuestionTabPane";

export interface QuestionsDisplayProps extends React.HTMLProps<HTMLDivElement> {}

function QuestionsDisplay({ className, ...rest }: QuestionsDisplayProps) {

  const clsn = clsx(styles.root, className);
  const questions = useStore((state) => state.questions);
  const isEditMode = useStore((state) => state.isEditMode);
  const editorState = useStore((state) => state.editorState);
  const editDisplay =  clsx(
    "d-flex flex-column flex-grow-1",
    isEditMode ? styles.editDisplay : '',
    className
  )
  const [questionTooltipTarget, setQuestionTooltipTarget] =
    useState<HTMLElement | null>(null);
  const selectedQuestionIndex = useStore(
    (state) => state.selectedQuestionIndex
  );
  const setSelectedQuestionIndex = useStore(
    (state) => state.setSelectedQuestionIndex
  );

  return (
    <div className={clsn} {...rest}>
      <QuestionDisplayActions />
      <Tab.Container
        defaultActiveKey={0}
        onSelect={(index) =>
          setSelectedQuestionIndex(index == null ? 0 : parseInt(index))
        }
        activeKey={selectedQuestionIndex}
      >
        <div className={editDisplay}>
          <Row as={Nav} className="justify-content-start gx-0" variant="tabs">
            {!questions.length ? (
              <QuestionTabHeader
                key="NoQuestionsHeader"
                eventKey={0}
                text={"Question 1"}
              />
            ) : (
              questions.map(({ questionTitle, index }, i) => (
                <QuestionTabHeader
                  data-tooltip={questionTitle}
                  onPointerEnter={(e) =>
                    setQuestionTooltipTarget(e.currentTarget)
                  }
                  eventKey={index}
                  key={i}
                  onPointerLeave={() => setQuestionTooltipTarget(null)}
                  disabled={isEditMode && i !== editorState?.index}
                  text={`Question ${i + 1}`}
                />
              ))
            )}
          </Row>
          <Row className="flex-grow-1 gx-0">
            <Tab.Content className="border border-top-0 bg-light-subtle">
              {!questions.length ? (
                <QuestionTabPane
                  key="NoQuestionsPane"
                  eventKey={0}
                  answer="Start typing in the chat to create some"
                  wordLimit={0}
                  questionTitle="No questions yet"
                />
              ) : (
                questions.map(
                  ({ answer, questionTitle, wordLimit, index }, i) => (
                    <QuestionTabPane
                      key={i}
                      eventKey={index}
                      answer={answer}
                      wordLimit={wordLimit}
                      questionTitle={questionTitle.charAt(0).toUpperCase() + questionTitle.slice(1)}
                    />
                  )
                )
              )}
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
