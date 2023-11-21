import React from "react";
import "./Iframe.css";

const PharmacyIframe = () => {
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
