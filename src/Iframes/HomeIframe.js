import React, { useState } from "react";
import SignInFirstModal from "../Components/SingInFirstModal/SignInFirstModal";

const HomeIframe = () => {
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
      height="90%"
      style={{ marginTop: "10px" }}
      width="100%"
      title="Combined Report"
      src="https://app.powerbi.com/view?r=eyJrIjoiMmEyZTBiMDItNWNmMC00N2I5LTliMTMtNWI2MzA5NWMyMmNjIiwidCI6ImEyNjUwODVjLTA2NjQtNGExNy1iYTlhLTBhZTcwMGY2YjVhYiJ9"
      frameBorder="0"
      allowFullScreen="true"
    ></iframe>
  );
};

export default HomeIframe;
