import { Spinner } from "react-bootstrap";

const MySpinner: React.FC = () => (
  <>
    <Spinner
      animation="border"
      as="span"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    <span className="visually-hidden">Loading...</span>
  </>
);

export default MySpinner;
