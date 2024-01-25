import React from "react";
import "./Iframe.css";
const Owing = () => {
  return (
    <div className="iframe-container">
      <iframe
        className="exampleIframe"
        title="Owing"
        width="600"
        height="373.5"
        src="https://app.powerbi.com/view?r=eyJrIjoiM2I0Yjc2ODgtM2NmYi00ZWJkLTlmMmEtOWY2YjVkZmJjNWIxIiwidCI6ImEyNjUwODVjLTA2NjQtNGExNy1iYTlhLTBhZTcwMGY2YjVhYiJ9"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default Owing;
