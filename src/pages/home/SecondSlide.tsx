import { isMobileDevice } from "../../utilities/validation";

const SecondSlide = () => (
  <div className={isMobileDevice() ? "second-slide-mobile" : "second-slide"}>
    <div className="set-max-width-container-with-padding">
      <h1>
        Your AI-powered grantwriting{" "}
        <span className="emphasized-text">coach</span>.
      </h1>
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
