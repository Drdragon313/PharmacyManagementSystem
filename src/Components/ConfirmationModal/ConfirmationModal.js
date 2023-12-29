import React from "react";
import { Modal, Button } from "antd";

const ConfirmationModal = ({ open, onConfirm, onCancel }) => {
  return (
    <Modal
      open={open}
      title="Confirm Delete"
      onOk={onConfirm}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" onClick={onConfirm}>
          Confirm
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this role?</p>
    </Modal>
  );
};

export default ConfirmationModal;
