import { Button, Form } from "react-bootstrap";

function ChatFileControl() {
  return (
    <Form.Group className="d-flex w-100 gap-1">
      <div className="d-flex flex-column w-25 gap-1">
        <Button variant="primary">Upload</Button>
        <Button variant="secondary">Clear</Button>
        <Button variant="primary">Submit</Button>
      </div>
      <div className="bg-body-secondary border border-1 rounded-2 border-dark-subtle flex-grow-1 d-flex justify-content-center align-items-center">
        Drop file here
      </div>
      <input type="file" hidden />
    </Form.Group>
  );
}

export default ChatFileControl;
