import { useState } from "react";
import { Badge, Button, Form, Overlay, Tooltip } from "react-bootstrap";
import { BsX as DeleteIcon } from "react-icons/bs";
import useStore from "../../hooks/useStore";

function UserDocumentsDisplay() {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [targetDocument, setTargetDocument] = useState<File | null>(null);
  const userFiles = useStore((state) => state.filesInput);
  const removeFile = useStore((state) => state.removeFile);
  return (
    <>
      <Form.Group className="d-flex gap-1">
        {userFiles.map((file, index) => (
          <Badge
            key={index}
            // disabled={isFetching || isEditMode}
            onPointerEnter={(e) => {
              setTargetDocument(file);
              setTarget(e.target as HTMLElement);
            }}
            onPointerLeave={() => {
              setTargetDocument(null);
              setTarget(null);
            }}
            // variant="primary"
            className="rounded rounded-pill d-flex justify-content-between align-items-center ps-4 w-25"
          >
            <span className="fs-6 text-dark text-truncate d-inline-block">
              {file.name}
            </span>
            <Button
              onClick={() => removeFile(index)}
              size="sm"
              className="rounded rounded-circle"
            >
              <DeleteIcon />
            </Button>
          </Badge>
        ))}
      </Form.Group>
      <Overlay show={!!targetDocument?.name} target={target}>
        {(props) => (
          <Tooltip {...props} style={{ position: "fixed", ...props.style }}>
            {targetDocument?.name}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default UserDocumentsDisplay;
