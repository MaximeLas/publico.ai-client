import clsx from "clsx";
import { Form, FormControlProps } from "react-bootstrap";
import { InputType } from "../../../enums/API";
import useStore from "../../../hooks/useStore";

function ChatWordLimitControl({
  className,
  ...props
}: Omit<FormControlProps, "value">) {
  const userInput = useStore((state) => state.userInput);
  const setUserInput = useStore((state) => state.setUserInput);
  const controlClsn = clsx("shadow-none", className);

  return (
    <Form.Group className="d-flex align-items-center column-gap-2">
      <Form.Label htmlFor="word-limit" className="mb-0">
        Word Limit:
      </Form.Label>
      <Form.Control
        id="word-limit"
        type="number"
        value={userInput?.input_value ?? 0}
        {...props}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          setUserInput({
            input_type: InputType.NumberInput,
            input_value: Number.isNaN(value) ? null : value,
          });
        }}
        className={controlClsn}
      />
    </Form.Group>
  );
}

export default ChatWordLimitControl;
