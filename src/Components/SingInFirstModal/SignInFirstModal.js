import React from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

const SignInFirstModal = ({ open }) => {
  return (
    <Modal title="Please Sign In" open={open} footer={false}>
      <p>Please sign in first.</p>
      <Link to="/">
        {" "}
        <CustomButton type="primary">SignIn</CustomButton>
      </Link>
    </Modal>
  );
};

export default SignInFirstModal;
