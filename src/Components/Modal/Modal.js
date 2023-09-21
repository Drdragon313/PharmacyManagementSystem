import React, { useState } from "react";
import { Button, Modal } from "antd";
import SchemaForm from "../Form/Form";
import "./style.css";
const ModalPop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" className="addnewentry" onClick={showModal}>
        Add New Entry
      </Button>
      <Modal
        title="Add Schema Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="modal"
      >
        <SchemaForm onAddRow={handleOk} />
      </Modal>
    </>
  );
};

export default ModalPop;
