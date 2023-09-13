import React, { useEffect, useState } from "react";
import { Popconfirm, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFormData,
} from "../../redux/features/formSlice/formSlice"; 
import ModalPop from "../Modal/Modal";

const Stable = () => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);


  const formDataFromRedux = useSelector((state) => state.form.formDataArray);
  const selectedOptionsFromRedux = useSelector(
    (state) => state.form.selectedOptions
  );

  useEffect(() => {
  
    const updatedDataSource = formDataFromRedux.map((formData) => ({
      ...formData,
      selectedOptions: selectedOptionsFromRedux,
    }));
    setDataSource(updatedDataSource);
  }, [formDataFromRedux, selectedOptionsFromRedux]);

  const handleDelete = (index) => {
    dispatch(removeFormData(index));
    const newData = dataSource.filter((item) => item.index !== index);
    setDataSource(newData);  };

  const defaultColumns = [
    {
      title: "Index",
      dataIndex: "index",
      width: "5%",
      render: (index) => index + 1,
    },
    {
      title: "Field Name",
      dataIndex: "Fieldname",
      width: "30%",
      height: "50%",
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "Type",
      height: "50%",
      editable: true,
    },
    {
      title: "Validation",
      dataIndex: "Validation",
      editable: true,
      height: "50%",
      render: (_, record) => <span>{record.selectedOptions.join(", ")}</span>,
    },
    {
     title: "Operation",
  dataIndex: "operation",
  render: (_, record) => (
    <Popconfirm
    title="Sure to delete?"
    onConfirm={() => handleDelete(record.index)}
  >
    <a>Delete</a>
  </Popconfirm>
        ) 
    },
  ];

  const columns = defaultColumns.map((col, index) => {
    return col;
  });
  return (
    <div>
      <ModalPop />
      <Table bordered dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Stable;
