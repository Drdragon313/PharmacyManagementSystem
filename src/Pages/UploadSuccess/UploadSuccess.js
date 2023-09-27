import React from "react";
import "./UploadSuccess.css";
import successImg from "../../Components/Images/Success.png";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const UploadSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="UploadSuccess-container">
      <div>
        <img src={successImg} alt="File Uploaded Successfully" />
      </div>

      <div className="UploadText">
        <h6>Your File has been Uploaded Successfully.</h6>
      </div>
      <div className="ContinueButtonContainer">
        <Button className="UploadContinueButton" onClick={() => navigate(-2)}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default UploadSuccess;
