import { TypeAnimation } from "react-type-animation";
import { isMobileDevice } from "../../utilities/validation";

const FirstSlide = () => (
  <div className="first-slide">
    <h1 className="center-align">
      <TypeAnimation
        className={
          "type-animation-text" +
          (isMobileDevice() ? " type-animation-text-mobile" : "")
        }
        sequence={[`Grantwriting,\n`, 1500, `Grantwriting,\nsimplified.`, 1000]}
      />
    </h1>
  </div>
);

export default FirstSlide;
