import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const SchemaCreationForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleCreate = () => {
    form.validateFields().then(() => {
      navigate(`/customschema`);
      onCancel();
    });
  };

  return (
    <Modal
      title="Create New Schema"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Schema Name"
          name="schemaName"
          rules={[
            {
              required: true,
              message: "Please enter a schema name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleCreate}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SchemaCreationForm;
