import React, { useState } from "react";
import { Form, Button, Input, Modal } from "antd";
import CustomSelect from "../Select/Select";
import { useOptions } from "../../optionContext/OptionContext";
import { filterValidationOptions } from "../../Utility Function/validationOptions";

const SchemaForm = ({ onAddRow }) => {
  const [form] = Form.useForm();
  const { typeOptions, validationOptions } = useOptions("");
  const [selectedData, setSelectedData] = useState({
    type: null,
    validation: null,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);

    const formDataEntry = {
      Fieldname: values.Fieldname,
      Type: selectedData.type,
      Validation: selectedData.validation,
    };

    onAddRow(formDataEntry);
    form.resetFields(["Fieldname", "Type", "Validation"]);
    setSelectedData({
      type: null,
      validation: null,
    });
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const filteredValidationOptions = filterValidationOptions(
    selectedData.type,
    validationOptions
  );

  return (
    <div>
      <Modal
        title="Add Schema Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Field Name"
            name="Fieldname"
            rules={[
              {
                required: true,
                message: "Please input Field Name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type"
            name="Type"
            rules={[
              {
                required: true,
                message: "Please select Type",
              },
            ]}
          >
            <CustomSelect
              options={typeOptions}
              value={selectedData.type}
              onChange={(value) =>
                setSelectedData({ ...selectedData, type: value })
              }
              placeholder="Select a Type"
            />
          </Form.Item>
          <Form.Item
            label="Validation"
            name="Validation"
            rules={[
              {
                required: true,
                message: "Please select Validation",
              },
            ]}
          >
            <CustomSelect
              options={filteredValidationOptions}
              value={selectedData.validation}
              onChange={(value) =>
                setSelectedData({ ...selectedData, validation: value })
              }
              placeholder="Select a Validation"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add Row
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add New Entry
      </Button>
    </div>
  );
};

export default SchemaForm;
