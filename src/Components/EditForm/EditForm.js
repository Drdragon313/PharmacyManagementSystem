import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Select } from "antd";
import CustomSelect from "../Select/Select";
import { useOptions } from "../../optionContext/OptionContext";
import { filterValidationOptions } from "../../Utility Function/validationOptions";

const EditForm = ({ editRow, onCancel, onSubmit, editModalVisible }) => {
  const { typeOptions, validationOptions } = useOptions("");
  const [form] = Form.useForm();
  const [selectedData, setSelectedData] = useState({
    type: editRow?.Type,
    validation: editRow?.Validation || [],
  });

  useEffect(() => {
    const filteredValidationOptions = filterValidationOptions(
      selectedData.type,
      validationOptions
    );

    const previousValidation = Array.isArray(selectedData.validation)
      ? selectedData.validation
      : [];

    setSelectedData((prevSelectedData) => ({
      ...prevSelectedData,
      validation: previousValidation.filter((val) =>
        filteredValidationOptions.some((option) => option.value === val)
      ),
    }));
  }, [selectedData.type, validationOptions, selectedData.validation]);

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      const editedData = {
        ...editRow,
        Fieldname: values.fieldName,
        Type: values.type,
        Validation: values.validation + `, `,
      };
      onSubmit(editedData);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Edit Row"
      visible={editModalVisible}
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
          <Col span={24}>
            <Form.Item
              name="validation"
              label="Validation"
              initialValue={selectedData.validation}
              rules={[{ required: true, message: "Please select Validation" }]}
            >
              <Select
                mode="multiple"
                value={selectedData.validation}
                onChange={(values) => {
                  setSelectedData({ ...selectedData, validation: values });
                }}
                placeholder="Enter or select multiple Validation values"
              >
                {validationOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditForm;
