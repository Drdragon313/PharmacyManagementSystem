import React, { useState } from "react";
import { Form, Button, Input, Row, Col, Modal, Select } from "antd";
import CustomSelect from "../Select/Select";
import { useOptions } from "../../optionContext/OptionContext";
import { filterValidationOptions } from "../../Utility Function/validationOptions";
import "./form.css";

const SchemaForm = ({ onAddRow }) => {
  const [form] = Form.useForm();
  const { typeOptions, validationOptions } = useOptions("");
  const [selectedData, setSelectedData] = useState({
    type: null,
    validation: [],
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
        >
          <Row gutter={16}>
            <Col span={12}>
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
            </Col>
            <Col span={12}>
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
            </Col>
            <Col span={24}>
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
                <Select
                  mode="multiple"
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
                    <Select.Option
                      key={option.value}
                      value={option.value + `, `}
                    >
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add Row
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button
        className="addnew-btn"
        type="primary"
        onClick={() => setIsModalVisible(true)}
      >
        Add New Entry
      </Button>
    </div>
  );
};

export default SchemaForm;
