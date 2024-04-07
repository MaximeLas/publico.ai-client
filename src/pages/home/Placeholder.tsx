// pages/home/Placeholder.tsx

import './Home.css';
import React from 'react';
import { TypeAnimation } from "react-type-animation";
import { isMobileDevice } from "../../utilities/validation";
import { useNavigate } from "react-router-dom";

const Placeholder: React.FC = () => {
  // Instantiate the navigate function
  const navigate = useNavigate();

  // Add this function to handle the click event
  const handleButtonClick = () => {
    navigate('/schedule-demo'); // This will navigate to the Schedule Demo page
  };

  return (
    <div className="first-slide ff-roxborough"> {/* Reuse the first-slide class for consistent padding and text color */}
      <h1 className="text-center">
      <TypeAnimation
        className={
          "type-animation-text" +
          (isMobileDevice() ? " type-animation-text-mobile" : "")
        }
        sequence={[`Grantwriting,\n`, 750, `Grantwriting,\nsimplified.`]}
      />
    </h1>
      <div className="button-container"> {/* You may need to add this container to Home.css */}
        <button className="placeholder-button" onClick={handleButtonClick}>
          Try our AI grantwriting coach
        </button>
      </div>
    </div>
  );
};

export default Placeholder;
