import React from "react";
import "./Iframe.css";
const Employee = () => {
  return (
    <div className="iframe-container">
      <iframe
        className="exampleIframe"
        title="Employee"
        width="600"
        height="373.5"
        src="https://app.powerbi.com/view?r=eyJrIjoiOTg5MDg5NjItYzMwYi00YjZiLTlhZTktMDU0ZDk3MDMxMmU3IiwidCI6ImEyNjUwODVjLTA2NjQtNGExNy1iYTlhLTBhZTcwMGY2YjVhYiJ9"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default Employee;
