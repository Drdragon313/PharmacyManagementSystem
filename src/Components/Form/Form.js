import React, { useState } from 'react';
import { Form, Button, Input, Row, Col, Modal } from 'antd';
import CustomSelect from '../Select/Select'; // Adjust the import path as needed

const SchemaForm = ({ onAddRow }) => {
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedValidation, setSelectedValidation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = (values) => {
    console.log('Success:', values);

    const formDataEntry = {
      Fieldname: values.Fieldname,
      Type: selectedType,
      Validation: selectedValidation,
    };

    onAddRow(formDataEntry);

    form.resetFields();
    setSelectedType(null);
    setSelectedValidation(null);
    setIsModalVisible(false); 
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const typeOptions = [
    { value: 'string', label: 'String' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' },
  ];

  const validationOptions = [
    { value: 'ValidationOption1', label: 'Validation Option 1' },
    { value: 'ValidationOption2', label: 'Validation Option 2' },
   
  ];

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
                    message: 'Please input Field Name',
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
                    message: 'Please select Type',
                  },
                ]}
              >
                <CustomSelect
                  options={typeOptions}
                  value={selectedType}
                  onChange={(value) => setSelectedType(value)}
                  placeholder="Select a Type"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Validation"
                name="Validation"
                rules={[
                  {
                    required: true,
                    message: 'Please select Validation',
                  },
                ]}
              >
                <CustomSelect
                  options={validationOptions}
                  value={selectedValidation}
                  onChange={(value) => setSelectedValidation(value)}
                  placeholder="Select a Validation"
                />
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
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add New Entry
      </Button>
      
    </div>
  );
};

export default SchemaForm;
