import { Col, Row } from "react-bootstrap";
import { isMobileDevice } from "../../utilities/validation";

const FourthSlide = () => (
  <div className={isMobileDevice() ? "fourth-slide-mobile" : "fourth-slide"}>
    <div className="set-max-width-container-with-padding">
      <br></br>
      <Row>
        <Col className={isMobileDevice() ? "" : "extra-padding-right"}>
          <p>
            We're a team of{" "}
            <span className="emphasized-text">
              nonprofit leaders and social entrepreneurs
            </span>{" "}
            with years of experience applying for local, federal, and corporate
            grant funding.
          </p>
          <p>
            Publico is our answer to the frutration of the grantwriting slog.
            Our goal is simple:{" "}
            <span className="emphasized-text">
              less time doing grants, more time doing good
            </span>
            .
          </p>
        </Col>
        <Col className="m-auto">
          <h1>
            By social entrepreneurs, for social{" "}
            <span className="emphasized-text">entrepreneurs</span>.
          </h1>
        </Col>
      </Row>
    </div>
  </div>
);

export default FourthSlide;
