import { Form, FormControlProps } from "react-bootstrap";

function ChatWordLimitControl(props: FormControlProps) {
  return (
    <Form.Group className="w-100">
      <Form.Label htmlFor="word-limit" visuallyHidden>
        Word Limit
      </Form.Label>
      <Form.Control
        id="word-limit"
        type="number"
        placeholder="Word Limit"
        {...props}
      />
    </Form.Group>
  );
}

export default ChatWordLimitControl;
