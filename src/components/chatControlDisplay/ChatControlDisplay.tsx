import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { ChatControls } from "../../enums/Messages";
import useChatHelper from "../../hooks/useChatHelper";
import useSubmit from "../../hooks/useSubmit";
import TextArea from "../../sharedComponents/textArea/TextArea";
import ChatFileControl from "../chatControls/chatFileControl/ChatFileControl";

export interface ChatControlDisplayProps {
  controls: ChatControls[];
}

function ChatControlDisplay({ controls }: ChatControlDisplayProps) {
  const { handleInputChange } = useChatHelper();
  const ref = useRef<HTMLDivElement>(null);
  const submit = useSubmit(ref);
  return (
    <Form.Group ref={ref} className="d-flex flex-wrap gap-1 mx-2 mb-2">
      {controls.map((control, index) => {
        switch (control) {
          case ChatControls.Yes:
          case ChatControls.No:
            return (
              <Button
                key={index}
                className="flex-grow-1"
                style={{ minWidth: "150px" }}
              >
                {ChatControls[control]}
              </Button>
            );
          case ChatControls.File:
            return <ChatFileControl key={index} />;
          case ChatControls.Text:
            return (
              <Form.Control
                key={index}
                placeholder="Start typing here.."
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if ((e.target as HTMLInputElement).value) submit();
                  }
                }}
                //                 className={styles.input}
                as={TextArea}
              />
            );
          default:
            return null;
        }
      })}
    </Form.Group>
  );
}

export default ChatControlDisplay;
