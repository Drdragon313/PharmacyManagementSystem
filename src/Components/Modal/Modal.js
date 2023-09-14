import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import SchemaForm from '../Form/Form'; 

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
      <Button type="primary" onClick={showModal} style={{ margin: '10px' }}>
        Add New Entry
      </Button>
      <Modal
        title="Add Schema Details"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <SchemaForm onAddRow={handleOk} />
      </Modal>
    </>
  );
};

export default ModalPop;
