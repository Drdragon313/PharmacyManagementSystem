import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSchemaName } from "../../redux/features/SchemaSlice/schemaSlice";
import "./schemaCreationForm.css";
import CustomButton from "../CustomButton/CustomButton";
import { fetchTilesAndSchemas } from "../../Utility Function/tilePageUtils";
const schemaPath = localStorage.getItem("tilePath");
const SchemaCreationForm = ({ visible, onCancel, selectedType, tilePath }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [schema, setSchemas] = useState();

  useEffect(() => {
    const fetchDataTiles = async () => {
      const data = await fetchTilesAndSchemas(schemaPath);

      setSchemas(data.schemas);
      console.log("schemas now", data);
    };
    fetchDataTiles();
  }, []);
  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const { schemaName } = values;
      if (
        schema &&
        schema.find((schema) => schema.schema_name === schemaName)
      ) {
        message.error(
          "Schema name already exists. Please choose a different name."
        );
        return;
      }
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
