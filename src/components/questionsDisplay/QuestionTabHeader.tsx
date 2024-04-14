import { Col, ColProps, Nav } from "react-bootstrap";

export interface QuestionTabHeaderProps extends ColProps {
  text: string;
  eventKey?: string | number;
  disabled?: boolean;
}

const QuestionTabHeader = ({
  text,
  disabled,
  eventKey,
  ...rest
}: QuestionTabHeaderProps) => {
  return (
    <Col
      className="px-0"
      as={Nav.Item}
      xs={5}
      md={4}
      lg={3}
      {...rest}
    >
      <Nav.Link disabled={disabled} className="text-center" eventKey={eventKey}>
        {text}
      </Nav.Link>
    </Col>
  );
};

export default QuestionTabHeader;
