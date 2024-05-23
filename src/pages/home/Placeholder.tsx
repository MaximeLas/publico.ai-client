import './Home.css';
import React from 'react';
import { TypeAnimation } from "react-type-animation";
import { isMobileDevice } from "../../utilities/validation";
import { useNavigate } from "react-router-dom";

const Placeholder: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/schedule-demo');
  };

  return (
    <div className="first-slide ff-roxborough">
      <h1 className="text-center">
      <TypeAnimation
        className={
          "type-animation-text" +
          (isMobileDevice() ? " type-animation-text-mobile" : "")
        }
        sequence={[`Grantwriting,\n`, 750, `Grantwriting,\nsimplified.`]}
      />
    </h1>
      <div className="button-container">
        <button className="placeholder-button" onClick={handleButtonClick}>
          Try our AI grantwriting coach
        </button>
      </div>
    </div>
  );
};

export default Placeholder;
