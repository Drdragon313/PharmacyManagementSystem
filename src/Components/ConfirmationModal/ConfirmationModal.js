import React from "react";
import { Modal, Button, Image } from "antd";
import deleteImg from "../../Assets/deleteexclaim.svg";
import "./ConfirmationModal.css";
const ConfirmationModal = ({ open, onConfirm, onCancel }) => {
  return (
    <Modal
      open={open}
      onOk={onConfirm}
      title={<Image src={deleteImg} preview={false}></Image>}
      onCancel={onCancel}
      className="delete-modal-body"
      footer={[
        <div className="delete-modal-btns-container">
          <Button
            key="cancel"
            onClick={onCancel}
            className="delete-modal-cancel-btn"
          >
            Cancel
          </Button>

          <Button
            key="confirm"
            type="primary"
            onClick={onConfirm}
            className="delete-modal-ok-btn"
          >
            Delete
          </Button>
        </div>,
      ]}
    >
      <p className="delete-pharm-modal-heading-txt">Delete pharmacy</p>
      <p className="delete-pharm-modal-body-txt">
        Are you sure you want to delete this pharmacy? This action cannot be
        undone.
      </p>
    </Modal>
  );
};

export default ConfirmationModal;
