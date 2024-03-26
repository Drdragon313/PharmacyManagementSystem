import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Checkbox } from "antd";
import CustomSelect from "../Select/Select";
import { useOptions } from "../../optionContext/OptionContext";
import { filterValidationOptions } from "../../Utility Function/validationOptions";
import CustomButton from "../CustomButton/CustomButton";

const EditForm = ({
  editRow,
  onCancel,
  onSubmit,
  editModalVisible,
  dataStructure,
}) => {
  const { typeOptions, validationOptions } = useOptions("");
  const [form] = Form.useForm();
  const [selectedData, setSelectedData] = useState({
    type: editRow?.Type,
    validation: editRow?.Validation || "none",
    Required: editRow?.Required || false,
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
        Validation: values.validation || "none",
        Required: selectedData.Required,
      };
      onSubmit(editedData);
      form.resetFields();
    });
  };
  const handleCheckboxChange = (e) => {
    setSelectedData({ ...selectedData, Required: e.target.checked });
  };
  return (
    <Modal
      title="Edit Row"
      open={editModalVisible}
      onCancel={() => {
        onCancel();
      }}
      footer={false}
    >
      <div className="schema-modal-form">
        <Form form={form} onFinish={handleFormSubmit}>
          <div className="first-row-schema-modal">
            <Form.Item
              name="fieldName"
              label="Field Name"
              initialValue={editRow?.Fieldname}
              rules={[{ required: true, message: "Please enter a field name" }]}
            >
              <Input className="SchemaDetailsInput" />
            </Form.Item>

            <Form.Item
              name="type"
              label="Type"
              initialValue={editRow?.Type}
              rules={[{ required: true, message: "Please select Type" }]}
            >
              <CustomSelect
                options={typeOptions}
                className="SchemaDetailSelect"
                value={selectedData.type}
                onChange={(value) => {
                  setSelectedData({ ...selectedData, type: value });
                }}
                placeholder="Select a Type"
              />
            </Form.Item>
          </div>
          {/* <Form.Item
            name="validation"
            label="Validation"
            initialValue={selectedData.validation}
            rules={[{ required: true, message: "Please select Validation" }]}
          >
            <Select
              className="AddUsersDetailsInput"
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
          </Form.Item> */}
          <Form.Item>
            <Checkbox onChange={handleCheckboxChange}>
              {" "}
              Please check the checkbox to make it a required field.
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <CustomButton type="primary" htmlType="submit">
              Add Row
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default EditForm;
