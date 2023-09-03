import { Col, Row } from "react-bootstrap";
import img from "../../assets/images/home/2-ai-grant-coach.png";

const OurSolution = () => (
  <div className="our-solution">
    <div className="set-max-width-container-with-padding">
      <h1 className="center-align">Our Solution</h1>
      <br></br>

      <Row>
        <Col>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
        <Col>
          <p>
            <img className="home-img" src={img} alt="AI grantwriting coach" />
          </p>
        </Col>
      </Row>
    </div>
  </div>
);

export default OurSolution;
