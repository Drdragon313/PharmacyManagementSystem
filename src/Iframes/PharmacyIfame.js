import React, { useState } from "react";
import "./Iframe.css";
import SignInFirstModal from "../Components/SingInFirstModal/SignInFirstModal";

const PharmacyIframe = () => {
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);

  if (!authToken) {
    const openModal = () => {
      setModalVisible(true);
    };
    return <SignInFirstModal visible={modalVisible} open={openModal} />;
  }
  return (
    <div className="iframe-container">
      <iframe
        className="exampleIframe"
        title="Pharmacy Report"
        width="1100"
        height="570"
        src="https://app.powerbi.com/view?r=eyJrIjoiMjI0OTk4NDktM2U1Ny00NmQ3LTg2NjYtN2NiZjQxNzFlOTI1IiwidCI6ImEyNjUwODVjLTA2NjQtNGExNy1iYTlhLTBhZTcwMGY2YjVhYiJ9"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default PharmacyIframe;
