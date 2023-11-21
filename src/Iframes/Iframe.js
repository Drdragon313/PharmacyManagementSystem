import React from "react";
import "./Iframe.css";

const Iframe = () => {
  return (
    <div className="iframe-container">
      <iframe
        className="exampleIframe"
        title="Employee"
        width="1100"
        height="570"
        src="https://app.powerbi.com/view?r=eyJrIjoiYTIwZDU3YTgtMjUyYy00MzRhLWJlOWUtZTM1ZWY2Yzc4MTdkIiwidCI6ImEyNjUwODVjLTA2NjQtNGExNy1iYTlhLTBhZTcwMGY2YjVhYiJ9"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default Iframe;
