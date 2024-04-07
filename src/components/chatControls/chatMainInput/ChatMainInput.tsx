import clsx from "clsx";
import { Button } from "react-bootstrap";
import { BsSend as SendIcon } from "react-icons/bs";
import { ChatControl } from "../../../enums/API";
import useStore from "../../../hooks/state/useStore";
import useUserDocumentStorage from "../../../hooks/useUserDocumentStorage";
import ChatFileDropzone from "../chatFileDropzone/ChatFileDropzone";
import ChatTextInput from "../chatTextInput/ChatTextInput";
import styles from "./ChatMainInput.module.css";

export interface ChatMainInputProps extends React.HTMLProps<HTMLDivElement> {}

function ChatMainInput({ className, ...rest }: ChatMainInputProps) {
  const clsn = clsx("py-2 px-3 position-relative", className);
  const isFetching = useStore((state) => state.isFetching);
  const isEditMode = useStore((state) => state.isEditMode);
  const isDisabled = isFetching || isEditMode;
  const isChatInputInControls = useStore((state) =>
    state.currentControls.includes(ChatControl.CHATBOT)
  );
  const isFileDropzoneInControls = useStore((state) =>
    state.currentControls.includes(ChatControl.FILES)
  );
  const isWordLimitInControls = useStore((state) =>
    state.currentControls.includes(ChatControl.WORD_LIMIT)
  );
  const isSendDisabled =
    isDisabled ||
    (!isChatInputInControls &&
      !isFileDropzoneInControls &&
      !isWordLimitInControls);
  const isChatInputDisabled = isDisabled || !isChatInputInControls;
  const filesInput = useStore((state) => state.filesInput);
  const fetchChat = useStore((state) => state.fetchChat);
  const { uploadUserDocument } = useUserDocumentStorage();

  const onSendClicked = async () => {
    if (isSendDisabled) return;
    if (isFileDropzoneInControls) {
      await Promise.all(
        filesInput.map((file) => uploadUserDocument(file, file.name))
      );
    }
    await fetchChat();
  };
  return (
    <div className={clsn} {...rest}>
      {isFileDropzoneInControls ? (
        <ChatFileDropzone className="flex-grow-1" />
      ) : (
        <ChatTextInput
          placeholder={isChatInputDisabled ? "" : "Start typing here.."}
          disabled={isChatInputDisabled}
        />
      )}
      <Button
        disabled={isSendDisabled}
        className={styles.sendButton}
        onClick={onSendClicked}
      >
        <SendIcon />
      </Button>
    </div>
  );
}

export default ChatMainInput;
