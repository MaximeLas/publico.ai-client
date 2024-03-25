import { Button, Form, FormControlProps } from "react-bootstrap";
import TextArea from "../../../sharedComponents/textArea/TextArea";
import {
  BsSend as SendIcon,
  // BsPaperclip as FileUploadIcon,
} from "react-icons/bs";
import useStore from "../../../hooks/useStore";
import { ChatControl } from "../../../enums/API";
import ChatFileDropzone from "../chatFileDropzone/ChatFileDropzone";
import useUserDocumentStorage from "../../../storage/useUserDocumentStorage";

export interface ChatTextInputProps extends Omit<FormControlProps, "as"> {}

function ChatMainInput({ ...rest }: ChatTextInputProps) {
  const userInput = useStore((state) => state.userInput);
  const currentControls = useStore((state) => state.currentControls);
  const isFetching = useStore((state) => state.isFetching);
  const isEditMode = useStore((state) => state.isEditMode);
  const isSendDisabled = isEditMode || isFetching;
  const isFileDropzoneEnabled = currentControls.includes(ChatControl.FILES);
  const filesInput = useStore((state) => state.filesInput);
  const isChatInputDisabled =
    isFetching ||
    isEditMode ||
    !currentControls.includes(ChatControl.CHATBOT);
  const setFiles = useStore((state) => state.setFiles);
  const fetchChat = useStore((state) => state.fetchChat);
  const { uploadUserDocument } = useUserDocumentStorage();

  const onSendClicked = async () => {
    if (isSendDisabled) return;
    if (isFileDropzoneEnabled) {
      await Promise.all(
        filesInput.map((file) => uploadUserDocument(file, file.name))
      );
      setFiles([]);
    }
    await fetchChat();
  };
  return (
    <div className="d-flex flex-nowrap align-items-center gap-1 py-2 px-3">
      {isFileDropzoneEnabled ? (
        <ChatFileDropzone className="flex-grow-1" />
      ) : (
        <Form.Control
          {...rest}
          value={
            currentControls.includes(ChatControl.WORD_LIMIT)
              ? ""
              : userInput?.input_value ?? ""
          }
          placeholder={isChatInputDisabled ? "" : "Start typing here.."}
          disabled={isChatInputDisabled}
          className="rounded rounded-4"
          as={TextArea}
        />
      )}
      <Button
        disabled={isChatInputDisabled}
        className="rounded rounded-3"
        onClick={onSendClicked}
      >
        <SendIcon />
      </Button>
    </div>
  );
}

export default ChatMainInput;
