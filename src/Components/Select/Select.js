import React from 'react';
import { Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedOptions } from '../../redux/features/formSlice/formSlice';

const customOptions = [
  {
    label: 'MaxLength',
    value: 'MaxLength',
  },
  {
    label: 'MinLength',
    value: 'MinLength',
  },
  {
    label: 'Float',
    value: 'float',
  },
  {
    label: 'No Special Character',
    value: 'noSpecialCharacter',
  },
];

const SelectOptions = () => {
  const dispatch = useDispatch();
  const selectedOptions = useSelector((state) => state.form.selectedOptions);

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    dispatch(updateSelectedOptions(value)); 
  };

  return (
    <Space
      style={{
        width: '100%',
      }}
      direction="vertical"
    >
      <Select
        mode="multiple"
        allowClear
        style={{
          width: '100%',
        }}
        placeholder="Please select"
        defaultValue={selectedOptions}
        onChange={handleChange}
        options={customOptions}
      />
    </Space>
  );
};

export default SelectOptions;
