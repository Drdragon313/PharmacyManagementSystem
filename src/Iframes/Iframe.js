import React, { useState } from "react";
import "./Iframe.css";
import SignInFirstModal from "../Components/SingInFirstModal/SignInFirstModal";
const Iframe = () => {
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);

  if (!authToken) {
    const openModal = () => {
      setModalVisible(true);
    };
    return <SignInFirstModal visible={modalVisible} open={openModal} />;
  }
  return (
    <iframe
      title="Employee_Report"
      className="iframe-container"
      width="600"
      height="373.5"
      src="https://app.powerbi.com/view?r=eyJrIjoiYTIwZDU3YTgtMjUyYy00MzRhLWJlOWUtZTM1ZWY2Yzc4MTdkIiwidCI6ImEyNjUwODVjLTA2NjQtNGExNy1iYTlhLTBhZTcwMGY2YjVhYiJ9"
      frameborder="0"
      allowFullScreen="true"
    ></iframe>
  );
};

export default Iframe;
