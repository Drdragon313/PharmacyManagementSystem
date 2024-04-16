import React from "react";

import "./AcessDenied.css";
import { Image } from "antd";
import accesdeniedimg from "../../Assets/accessdenied.svg";
import CustomButton from "../../Components/CustomButton/CustomButton";

const AccessDenied = () => {
  const handleGoBack = () => {
    window.history.back(); // Go back to the previous route
  };

  return (
    <div className="main-continer-access-denied">
      <div className="ad-img">
        <Image src={accesdeniedimg} preview={false} />
      </div>
      <div>
        <p className="ad-heading">We Are Sorry...</p>
        <p className="ad-para">
          The page you are trying to access has restricted access.
        </p>
      </div>

      <div className="ad-button">
        <CustomButton onClick={handleGoBack}>Go Back</CustomButton>
      </div>
    </div>
  );
};

export default AccessDenied;
