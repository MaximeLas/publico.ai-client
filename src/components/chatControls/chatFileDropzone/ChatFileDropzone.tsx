import { useState } from "react";
import { Form, FormControlProps } from "react-bootstrap";
import TextArea from "../../../sharedComponents/textArea/TextArea";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import styles from "./ChatFileDropzone.module.scss";
import useStore from "../../../hooks/state/useStore";
import { InputType } from "../../../enums/API";

export interface ChatFileDropzoneProps extends React.HTMLProps<HTMLDivElement> {
  inputProps?: React.HTMLProps<HTMLInputElement>;
  InputProps?: Omit<FormControlProps, "readOnly" | "as">;
}

function ChatFileDropzone({
  inputProps,
  InputProps,
  ...rest
}: ChatFileDropzoneProps) {
  const [draggedFilesAmount, setDraggedFilesAmount] = useState(0);
  const setUserInput = useStore((state) => state.setUserInput);
  const addFiles = useStore((state) => state.addFiles);
  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    accept: {
      "text/plain": [".txt"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },
    onDragEnter: (e) => {
      setDraggedFilesAmount(e.dataTransfer.items.length);
    },
    onDragLeave: () => {
      setDraggedFilesAmount(0);
    },
    onDrop: (acceptedFiles) => {
      setUserInput({
        input_type: InputType.Files,
        input_value: acceptedFiles.map((file) => file.name),
      });
      addFiles(...acceptedFiles);
    },
  });
  const textAreaCln = clsx(
    styles.root,
    "rounded rounded-4 h-75 text-center",
    isDragAccept && "bg-primary-light",
    isDragReject && "bg-danger-subtle",
    InputProps?.className
  );
  return (
    <div
      {...getRootProps({
        ...rest,
      })}
    >
      <input {...getInputProps(inputProps)} />
      <Form.Control
        {...InputProps}
        className={textAreaCln}
        placeholder={
          !isDragActive
            ? "Drop your documents here \nor click to browse"
            : isDragAccept
            ? `Attach ${draggedFilesAmount} files`
            : "Invalid file type"
        }
        readOnly
        as={TextArea}
      />
    </div>
  );
}

export default ChatFileDropzone;
