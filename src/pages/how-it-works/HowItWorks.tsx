import "./HowItWorks.css";
import video_1 from "../../assets/how-it-works/Steps1-2-video.mp4";
import video_2 from "../../assets/how-it-works/Steps3-4-video.mp4";

const HowItWorks = () => {
  return (
    <div className="how-it-works center-align">
      <div className="how-it-works-container">
        <h1>How it works</h1>
      </div>
      <br />
      <p className="how-it-works-max-width">
        Step I - Session Start and Document Upload
      </p>
      <div className="publico-demo-video-container">
        <video className="publico-demo-video" src={video_1} autoPlay />
      </div>
      <br />
      <p className="how-it-works-max-width">
        Steps II and III - General and Implicit Questioning with Human Editing
      </p>
      <div className="publico-demo-video-container">
        <video className="publico-demo-video" src={video_2} autoPlay />
      </div>
      <br />
    </div>
  );
};

export default HowItWorks;
