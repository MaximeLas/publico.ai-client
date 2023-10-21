import { Col, Row } from "react-bootstrap";
import bullet_1 from "../../assets/home/1-bullet.png";
import bullet_2 from "../../assets/home/2-bullet.png";
import bullet_3 from "../../assets/home/3-bullet.png";
import { isMobileDevice } from "../../utilities/validation";

const ThirdSlide: React.FC = () => (
  <div className={isMobileDevice() ? "third-slide-mobile" : "third-slide"}>
    <div className="my-home-container-max-width">
      <Row>
        <Col className={"m-auto" + (isMobileDevice() ? "" : " extra-padding-right")}>
          <h1>
            Professional grantwriting, within reach{" "}
            <span className="emphasized-text">for all</span>.
          </h1>
        </Col>
        <Col className="m-auto">
          <Row className="mb-4 d-flex align-items-center">
            <Col xs={2}>
              <img
                className="home-bullet-img"
                src={bullet_1}
                alt="Bullet point of compass"
              />
            </Col>
            <Col>
              <p>
                Interactive guidance{" "}
                <span className="emphasized-text">radically simplifies</span>{" "}
                every step of the application process.
              </p>
            </Col>
          </Row>
          <Row className="mb-4 d-flex align-items-center">
            <Col xs={2}>
              <img
                className="home-bullet-img"
                src={bullet_2}
                alt="Bullet point of feather and ink"
              />
            </Col>
            <Col>
              <p>
                AI-powered grantwriting coach offers the{" "}
                <span className="emphasized-text">
                  power of a professional team
                </span>
                , increasing the odds of success.
              </p>
            </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col xs={2}>
              <img
                className="home-bullet-img"
                src={bullet_3}
                alt="Bullet point of Hand holding the globe"
              />
            </Col>
            <Col>
              <p>
                Affordable for everyone, so funding goes to the{" "}
                <span className="emphasized-text">
                  best ideas, not the deepest pockets
                </span>
                .
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  </div>
);

export default ThirdSlide;
