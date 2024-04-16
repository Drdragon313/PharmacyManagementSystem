import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSchemaName } from "../../redux/features/SchemaSlice/schemaSlice";
import "./schemaCreationForm.css";
import CustomButton from "../CustomButton/CustomButton";

const SchemaCreationForm = ({ visible, onCancel, selectedType, tilePath }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const { schemaName } = values;
      dispatch(updateSchemaName(schemaName));
      if (selectedType === "manual") {
        navigate(`/customschema`);
      } else if (selectedType === "database") {
        navigate(`/database`);
      } else if (selectedType === "csv") {
        navigate(`/schema/autopopulate`);
      }
      onCancel();
    } catch (error) {
      message.error("Validation error", error, 3);
      console.log(error);
      setTimeout(() => {
        message.destroy();
      }, 2000);
    }
    console.log("path: ", tilePath);
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
          <CustomButton type="primary" onClick={handleCreate}>
            Create
          </CustomButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default SchemaCreationForm;
