import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import ChatControlLabels from "../../constants/ChatControlLabels";
import { ChatControl } from "../../enums/API";
// import useSubmit from "../../hooks/useSubmit";
import ChatFileControl from "../chatControls/chatFileControl/ChatFileControl";
import ChatTextInput from "../chatControls/chatTextInput/ChatTextArea";
import ChatWordLimitControl from "../chatControls/chatWordLimitControl/ChatWordLimitControl";

export interface ChatControlDisplayProps {
  controls: ChatControl[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleInputKeyDown: (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleButtonClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

function ChatControlDisplay({
  controls,
  handleInputChange,
  handleButtonClick,
  handleInputKeyDown,
}: ChatControlDisplayProps) {
  const ref = useRef<HTMLDivElement>(null);
  // const submit = useSubmit(ref);
  return (
    <Form.Group ref={ref} className="d-flex flex-wrap gap-1 mx-2 mb-2">
      {controls.map((control, index) => {
        switch (control) {
          case ChatControl.START:
          case ChatControl.YES:
          case ChatControl.NO:
          case ChatControl.ADD_GUIDANCE:
          case ChatControl.EDIT_IT:
          case ChatControl.GOOD_AS_IS:
          case ChatControl.OF_COURSE:
            return (
              <Button
                key={index}
                value={control}
                onClick={handleButtonClick}
                name="chat-button"
                className="flex-grow-1"
                style={{ minWidth: "150px" }}
              >
                {ChatControlLabels[control]}
              </Button>
            );
          case ChatControl.WORD_LIMIT:
            return (
              <ChatWordLimitControl
                onKeyDown={handleInputKeyDown}
                key={index}
              />
            );
          case ChatControl.FILES:
            return <ChatFileControl key={index} />;
          case ChatControl.CHATBOT:
            return (
              <ChatTextInput
                key={index}
                onKeyDown={handleInputKeyDown}
                onChange={handleInputChange}
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
