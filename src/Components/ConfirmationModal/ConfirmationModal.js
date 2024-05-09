import React from "react";
import { Modal, Button } from "antd";
import "./ConfirmationModal.css";
import CustomButton from "../CustomButton/CustomButton";
const ConfirmationModal = ({
  open,
  onConfirm,
  onCancel,
  confirmationHeading,
  confirmationText,
  titleImage,

  btnTxt,
}) => {
  return (
    <Modal
      open={open}
      onOk={onConfirm}
      title={titleImage}
      onCancel={onCancel}
      className="reassign-modal-body"
      footer={[
        <div className="reassign-modal-btns-container">
          <Button
            key="cancel"
            onClick={onCancel}
            className="reassign-modal-cancel-btn"
          >
            Cancel
          </Button>

          <CustomButton
            key="confirm"
            type="primary"
            onClick={onConfirm}
            className="reassign-modal-ok-btn"
          >
            {btnTxt}
          </CustomButton>
        </div>,
      ]}
    >
      <p className="delete-pharm-modal-heading-txt">{confirmationHeading}</p>
      <p className="delete-pharm-modal-body-txt">{confirmationText}</p>
    </Modal>
  );
};

export default ConfirmationModal;
