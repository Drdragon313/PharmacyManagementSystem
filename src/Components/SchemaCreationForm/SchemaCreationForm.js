import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSchemaName } from "../../redux/features/SchemaSlice/schemaSlice";
import { validateSchemaName } from "../../Utility Function/validateSchemaName";

const SchemaCreationForm = ({ visible, onCancel,selectedType }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const { schemaName } = values;
      dispatch(updateSchemaName(schemaName));
      
      if (selectedType === 'manual') {
        navigate(`/customschema`);
      } else if (selectedType === 'database') {
        navigate(`/database`);
      } else if (selectedType === 'csv') {
        navigate(`/schema/autopopulate`);
      }
      
      onCancel();
    } catch (error) {
      message.error("Validation error", error, 3);
      setTimeout(() => {
        message.destroy();
      }, 2000);
    }
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
            {
              validator: validateSchemaName,
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
