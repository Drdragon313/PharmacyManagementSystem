import React, { useState } from "react";
import { Checkbox, Form, Input, Modal } from "antd";
import CustomSelect from "../Select/Select";
import { useOptions } from "../../optionContext/OptionContext";
// import { filterValidationOptions } from "../../Utility Function/validationOptions";
import "./form.css";
import CustomButton from "../CustomButton/CustomButton";

const SchemaForm = ({ onAddRow }) => {
  const [form] = Form.useForm();
  const { typeOptions, validationOptions } = useOptions("");
  const [selectedData, setSelectedData] = useState({
    type: null,
    validation: null,
    Required: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCheckboxChange = (e) => {
    setSelectedData({ ...selectedData, Required: e.target.checked });
  };
  const onFinish = (values) => {
    console.log("Success:", values);

    const formDataEntry = {
      Fieldname: values.Fieldname,
      Type: selectedData.type,
      Validation: selectedData.validation,
      Required: selectedData.Required || false,
    };

    onAddRow(formDataEntry);
    form.resetFields(["Fieldname", "Type", "Validation"]);
    setSelectedData({
      type: null,
      validation: null,
      Required: false,
    });
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const filteredValidationOptions = filterValidationOptions(
  //   selectedData.type,
  //   validationOptions
  // );

  return (
    <div>
      <Modal
        className="schema-modal"
        title="Add Schema Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className="schema-modal-form">
          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="first-row-schema-modal">
              <Form.Item
                label="Field Name"
                name="Fieldname"
                rules={[
                  {
                    required: true,
                    message: "Please input Field Name",
                  },
                  {
                    pattern: /^[^\s].*/,
                    message: "Field name cannot start with a blank space",
                  },
                ]}
              >
                <Input className="SchemaDetailsInput" />
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
                  className="SchemaDetailSelect"
                  options={typeOptions}
                  value={selectedData.type}
                  onChange={(value) =>
                    setSelectedData({ ...selectedData, type: value })
                  }
                  placeholder="Select a Type"
                />
              </Form.Item>
            </div>
            <Form.Item>
              <Checkbox onChange={handleCheckboxChange}>
                {" "}
                Please check the checkbox to make it a required field.
              </Checkbox>
            </Form.Item>
            {/* <Form.Item
              label="Validation"
              name="Validation"
              rules={[
                {
                  required: true,
                  message: "Please select Validation",
                },
              ]}
            >
              <Select
                mode="multiple"
                className="AddUsersDetailsInput"
                value={selectedData.validation}
                onChange={(values) =>
                  setSelectedData({
                    ...selectedData,
                    validation: values,
                  })
                }
                placeholder="Enter or select multiple Validation values"
              >
                {filteredValidationOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value + `, `}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item> */}

            <Form.Item>
              <CustomButton type="primary" htmlType="submit">
                Add Row
              </CustomButton>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <CustomButton type="primary" onClick={() => setIsModalVisible(true)}>
        Add New Entry
      </CustomButton>
    </div>
  );
};

export default SchemaForm;
