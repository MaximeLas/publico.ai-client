import { Form, FormControlProps } from "react-bootstrap";
import TextArea from "../../../sharedComponents/textArea/TextArea";

export interface ChatTextInputProps extends Omit<FormControlProps, "as"> {}

function ChatTextInput({ ...rest }: ChatTextInputProps) {
  return (
    <Form.Control placeholder="Start typing here.." {...rest} as={TextArea} />
  );
}

export default ChatTextInput;
