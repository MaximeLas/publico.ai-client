import clsx from "clsx";
import { useCallback, useState } from "react";
import { Button, Form, Overlay, Tooltip } from "react-bootstrap";
import { BsArrowRepeat as RestartIcon, BsDownload as DownloadIcon } from "react-icons/bs";
import useDebounce from "../../hooks/helpers/useDebounce";
import useDownloadQuestions from "../../hooks/helpers/useDownloadQuestions";
import useFetchAndSaveSession from "../../hooks/helpers/useFetchAndSaveSession";
import useOnEditModeChange from "../../hooks/FormHandlers/useOnEditModeChange";
import useStore from "../../hooks/useStore";
import Switch from "../../sharedComponents/switch/Switch";

function QuestionDisplayActions() {
  const questionsLength = useStore((state) => state.questions.length);
  const isEditMode = useStore((state) => state.isEditMode);
  const currentUser = useStore((state) => state.currentUser);
  const [tooltipTarget, setTooltipTarget] = useState<HTMLElement | null>(null);
  const onEditModeChange = useOnEditModeChange();
  const fetchAndSaveSession = useFetchAndSaveSession();
  const clearChatSession = useStore((state) => state.clearChatSession);
  const onDownloadQuestionClick = useDownloadQuestions();

  const restartSession = useCallback(() => {
    if (!currentUser) return;
    clearChatSession();
    fetchAndSaveSession(currentUser);
  }, [currentUser, clearChatSession, fetchAndSaveSession]);

  const onRestartSessionClick = useDebounce(restartSession);

  const onTooltipTargetPointerEnter = (e: React.MouseEvent<HTMLElement>) => {
    setTooltipTarget(e.currentTarget);
  };

  const onTooltipTargetPointerLeave = () => {
    setTooltipTarget(null);
  };

  const switchLabelClsnBase = (isDisabled: boolean) =>
    clsx("my-0", (!questionsLength || isDisabled) && "text-500");

  return (
    <div className="d-flex mb-2 column-gap-2">
      <Overlay show={!!tooltipTarget} target={tooltipTarget}>
        {(props) => (
          <Tooltip {...props} className="position-fixed">
            {tooltipTarget?.dataset.tooltip}
          </Tooltip>
        )}
      </Overlay>
      <Button
        className="rounded rounded-3"
        data-tooltip="Download questions"
        size="sm"
        disabled={!questionsLength}
        onClick={onDownloadQuestionClick}
        onPointerEnter={onTooltipTargetPointerEnter}
        onPointerLeave={onTooltipTargetPointerLeave}
      >
        <DownloadIcon size={16} />
      </Button>
      <Button
        className="rounded rounded-3"
        data-tooltip="Restart chat session"
        size="sm"
        onClick={onRestartSessionClick}
        onPointerEnter={onTooltipTargetPointerEnter}
        onPointerLeave={onTooltipTargetPointerLeave}
      >
        <RestartIcon size={16} />
      </Button>
      <span className="d-flex flex-nowrap flex-grow-1 align-items-center justify-content-end my-1">
        <Form.Label className={switchLabelClsnBase(isEditMode)}>
          View Mode
        </Form.Label>
        <Switch
          disabled={!questionsLength}
          checked={isEditMode}
          className="mx-1"
          style={{ height: "60%" }}
          onChange={onEditModeChange}
        />
        <Form.Label className={switchLabelClsnBase(!isEditMode)}>
          Edit Mode
        </Form.Label>
      </span>
    </div>
  );
}

export default QuestionDisplayActions;