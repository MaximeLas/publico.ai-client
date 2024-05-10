import clsx from "clsx";
import { Form, FormControlProps } from "react-bootstrap";
import { InputType } from "../../../enums/API";
import useStore from "../../../hooks/state/useStore";

function ChatWordLimitControl({
  className,
  ...props
}: Omit<FormControlProps, "value">) {
  const userInput = useStore((state) => state.userInput);
  const setUserInput = useStore((state) => state.setUserInput);
  const fetchChat = useStore((state) => state.fetchChat);
  const controlClsn = clsx("shadow-none", className);

  return (
    <Form.Group className="d-flex align-items-center column-gap-2">
      <Form.Label htmlFor="word-limit" className="mb-0">
        Word Limit:
      </Form.Label>
      <Form.Control
        id="word-limit"
        type="number"
        step={5}
        min={0}
        value={userInput?.input_value ?? 0}
        {...props}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          setUserInput({
            input_type: InputType.NumberInput,
            input_value: Number.isNaN(value) ? null : value,
          });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            fetchChat(false);
          }
        }}
        className={controlClsn}
      />
    </Form.Group>
  );
}

export default ChatWordLimitControl;
