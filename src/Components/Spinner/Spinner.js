import React from "react";
import { Spin } from "antd";
import "./Spinner.css";
const Spinner = () => {
  return (
    <div className="loader">
      <Spin size="large"></Spin>
      Loading...
    </div>
  );
};

export default Spinner;
