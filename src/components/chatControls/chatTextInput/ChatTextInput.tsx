import clsx from "clsx";
import { Form, FormControlProps } from "react-bootstrap";
import { ChatControl, InputType } from "../../../enums/API";
import useStore from "../../../hooks/state/useStore";
import TextArea from "../../../sharedComponents/textArea/TextArea";
import styles from "./ChatTextInput.module.css";

export interface ChatTextInputProps extends Omit<FormControlProps, "as"> {}

function ChatTextInput({ className, ...rest }: ChatTextInputProps) {
  const clsn = clsx("rounded rounded-4", styles.textAreaRightPadding, className);
  const userInput = useStore((state) => state.userInput);
  const setUserInput = useStore((state) => state.setUserInput);
  const currentControls = useStore((state) => state.currentControls);
  return (
    <Form.Control
      {...rest}
      value={
        currentControls.includes(ChatControl.WORD_LIMIT)
          ? ""
          : userInput?.input_value ?? ""
      }
      onChange={(e) =>
        setUserInput({
          input_type: InputType.Chatbot,
          input_value: e.target.value,
        })
      }
      className={clsn}
      as={TextArea}
    />
  );
}

export default ChatTextInput;
