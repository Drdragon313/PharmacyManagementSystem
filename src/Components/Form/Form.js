import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input } from 'antd';
import SelectOptions from '../Select/Select';
import formSlice, { addFormData } from '../../redux/features/formSlice/formSlice';

const SchemaForm = () => {
    const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log('Success:', values);

    const formDataEntry = {
      Fieldname: values.Fieldname,
      Type: values.Type,
      Validations: values.Validations,
    };


    dispatch(addFormData(formDataEntry));


    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
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
      <Form.Item
        label="Type"
        name="Type"
        rules={[
          {
            required: true,
            message: 'Please input Type',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Validation"
        name="Validation"
        rules={[
          {
            required: false,
            message: 'Please Selects validations',
          },
        ]}
      >
        <SelectOptions />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Add Row
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SchemaForm;
