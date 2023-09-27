import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSchemaName } from "../../redux/features/SchemaSlice/schemaSlice";

const SchemaCreationForm = (props) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleCreate = () => {
    form.validateFields().then((values) => {
      const { schemaName } = values;
      navigate("/customschema");
      props.onCancel();
      dispatch(updateSchemaName(schemaName));
    });
  };

  return (
    <Modal
      title="Create New Schema"
      open={props.visible}
      onCancel={props.onCancel}
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
