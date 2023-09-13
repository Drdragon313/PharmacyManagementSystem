import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Form from '../Form/Form';
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
      <Button type="primary" onClick={showModal} style={{margin:"10px"}}>
        Add New Entry
      </Button>
      <Modal title="Add Schema Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     <Form/>
      </Modal>
    </>
  );
};
export default ModalPop;