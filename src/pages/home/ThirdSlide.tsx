import { Col, Row } from "react-bootstrap";
import bullet_1 from "../../assets/home/1-bullet.png";
import bullet_2 from "../../assets/home/2-bullet.png";
import bullet_3 from "../../assets/home/3-bullet.png";
import { isMobileDevice } from "../../utilities/validation";

const ThirdSlide = () => (
  <div className={isMobileDevice() ? "third-slide-mobile" : "third-slide"}>
    <div className="set-max-width-container-with-padding">
      <Row>
        <Col className="m-auto">
          <h1>
            Professional grantwriting, within reach{" "}
            <span className="emphasized-text">for all</span>.
          </h1>
        </Col>
        <Col className="m-auto">
          <div>
            <img
              className="home-bullet-img"
              src={bullet_1}
              alt="Bullet point of compass"
            />
            <p>
              Interactive guidance{" "}
              <span className="emphasized-text">radically simplifies</span>{" "}
              every step of the application process.
            </p>
          </div>
          <div>
            <img
              className="home-bullet-img"
              src={bullet_2}
              alt="Bullet point of feather and ink"
            />
            <p>
              AI-powered grantwriting coach offers the{" "}
              <span className="emphasized-text">
                power of a professional team
              </span>
              , increasing the odds of success.
            </p>
          </div>
          <div>
            <img
              className="home-bullet-img"
              src={bullet_3}
              alt="Bullet point of Hand holding the globe"
            />
            <p>
              Affordable for everyone, so funding goes to the{" "}
              <span className="emphasized-text">
                best ideas, not the deepest pockets
              </span>
              .
            </p>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default ThirdSlide;
