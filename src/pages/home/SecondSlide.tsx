import { isMobileDevice } from "../../utilities/validation";
import quill_img from "../../assets/home/quill.png";
import { Col, Row } from "react-bootstrap";

const SecondSlide: React.FC = () => (
  <div className={isMobileDevice() ? "second-slide-mobile" : "second-slide"}>
    <div className="my-home-container-max-width">
      <Row>
        {/* Below m-auto and mx-auto are explained:
        https://stackoverflow.com/questions/56452405/centering-image-with-react-react-bootstrap-flexbox#:~:text=The%20first%20m%2Dauto%20in,is%20displayed%20as%20inline%20block. */}
        <Col className="col-sm-8 m-auto">
          <h1>
            Your AI-powered grantwriting{" "}
            <span className="emphasized-text">coach</span>.
          </h1>
        </Col>
        <Col className="col-sm-4 m-auto">
          <img
            style={{ height: 70 }}
            src={quill_img}
            alt="green quill feather"
          />
        </Col>
      </Row>
      <br></br>

      <p>
        <span className="emphasized-text">You know your organization</span>{" "}
        better than any AI bot.
      </p>

      <p>
        Publico's{" "}
        <span className="emphasized-text">unique coaching approach</span>{" "}
        combines your expertise with the efficiency of machine learning, guiding
        you to the best version of a grant application answer{" "}
        <span className="emphasized-text">within seconds</span>.
      </p>
    </div>
  </div>
);

export default SecondSlide;
