import { TypeAnimation } from "react-type-animation";
import { isMobileDevice } from "../../utilities/validation";

const FirstSlide: React.FC = () => (
  <div className="first-slide">
    <h1 className="center-align">
      <TypeAnimation
        className={
          "type-animation-text" +
          (isMobileDevice() ? " type-animation-text-mobile" : "")
        }
        sequence={[`Grantwriting,\n`, 750, `Grantwriting,\nsimplified.`]}
      />
    </h1>
  </div>
);

export default FirstSlide;
