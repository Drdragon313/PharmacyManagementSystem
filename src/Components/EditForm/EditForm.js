import React, { useState, useEffect } from "react";
import { Modal, Form, Input,Row,Col } from "antd";
import CustomSelect from "../Select/Select";
import { useOptions } from "../../optionContext/OptionContext";
import { filterValidationOptions } from "../../Utility Function/validationOptions";

const EditForm = ({ editRow, onCancel, onSubmit, editModalVisible }) => {
  const { typeOptions, validationOptions } = useOptions();
  const [form] = Form.useForm();
  const [selectedData, setSelectedData] = useState({
    type: editRow?.Type,
    validation: editRow?.Validation,
  });

  useEffect(() => {
    const filteredValidationOptions = filterValidationOptions(
      selectedData.type,
      validationOptions
    );
    setSelectedData((prevSelectedData) => ({
      ...prevSelectedData,
      validation: null,
      validationOptions: filteredValidationOptions,
    }));
  }, [selectedData.type, validationOptions]);

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      const editedData = {
        ...editRow,
        Fieldname: values.fieldName,
        Type: values.type,
        Validation: values.validation,
      };
      onSubmit(editedData);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Edit Row"
      open={editModalVisible}
      onCancel={() => {
        onCancel();
      }}
      onOk={handleFormSubmit}
    >

      <Form form={form}>
      <Row gutter={16}>
     <Col span={12}>
        <Form.Item
          name="fieldName"
          label="Field Name"
          initialValue={editRow?.Fieldname}
          rules={[{ required: true, message: "Please enter a field name" }]}
        >
          <Input />
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
          name="type"
          label="Type"
          initialValue={editRow?.Type}
          rules={[{ required: true, message: "Please select Type" }]}
        >
          <CustomSelect
            options={typeOptions}
            value={selectedData.type}
            onChange={(value) => {
              setSelectedData({ ...selectedData, type: value });
            }}
            placeholder="Select a Type"
          />
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
          name="validation"
          label="Validation"
          initialValue={editRow?.Validation}
          rules={[{ required: true, message: "Please select Validation" }]}
        >
          <CustomSelect
            options={validationOptions}
            value={selectedData.validation}
            onChange={(value) => {
              setSelectedData({ ...selectedData, validation: value });
            }}
            placeholder="Select a Validation"
          />
        </Form.Item>
        </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditForm;
