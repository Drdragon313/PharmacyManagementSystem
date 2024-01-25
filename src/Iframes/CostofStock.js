import React from "react";
import "./Iframe.css";
const CostofStock = () => {
  return (
    <div className="iframe-container">
      <iframe
        title="Cost of Stock"
        className="exampleIframe"
        width="1100"
        height="570"
        src="https://app.powerbi.com/view?r=eyJrIjoiODk4MDdmYmUtOTMxZS00N2Q5LWJiZGMtM2JiNzFjYjVjMGEwIiwidCI6ImEyNjUwODVjLTA2NjQtNGExNy1iYTlhLTBhZTcwMGY2YjVhYiJ9"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default CostofStock;
