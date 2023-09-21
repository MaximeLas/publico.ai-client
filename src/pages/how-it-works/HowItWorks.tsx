import "./HowItWorks.css";
import pic_1 from "../../assets/how-it-works/1 - Structurally Different.jpg";
import pic_2 from "../../assets/how-it-works/2 - Beyond ChatGPT.jpg";
import video_1 from "../../assets/how-it-works/Steps1-2-video.mp4";
import video_2 from "../../assets/how-it-works/Steps3-4-video.mp4";

const HowItWorks = () => {
  return (
    <div className="center-align">
      <div className="how-it-works-container">
        <h1>How it works</h1>
      </div>
      <br />
      <img
        alt="How it works: Data, Model, Dynamic Prompting"
        className="how-it-works-img"
        src={pic_1}
      />
      <br />
      <br />
      <img
        alt="Beyond ChatGPT: Publico's dynamic prompting"
        className="how-it-works-img"
        src={pic_2}
      />
      <br />
      <div className="how-it-works-container">
        <h1>Demo videos</h1>
      </div>
      <p className="how-it-works-paragraph">
        <b>Step I</b> - Session Start and Document Upload
      </p>
      <div className="how-it-works-video-container">
        <video className="how-it-works-video" src={video_1} autoPlay />
      </div>
      <br />
      <p className="how-it-works-paragraph">
        <b>Steps II and III</b> - General and Implicit Questioning with Human
        Editing
      </p>
      <div className="how-it-works-video-container">
        <video className="how-it-works-video" src={video_2} autoPlay />
      </div>
      <br />
    </div>
  );
};

export default HowItWorks;
