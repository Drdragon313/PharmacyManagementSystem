import React, { useState } from "react";
import { Button, Table } from "antd";
import { useDispatch,useSelector } from "react-redux";
import {
  addFormData,
  removeFormData,
} from "../../redux/features/formSlice/formSlice";
import {addSchemaData} from "../../redux/features/SchemaSlice/schemaSlice";
import SchemaForm from "../Form/Form";
import ModalPop from "../Modal/Modal";
import "./style.css"
import SchemaData from "../SchemaData/SchemaData";

const Stable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [rowId, setRowId] = useState(1);

  const dispatch = useDispatch();
  const formDataArray = useSelector((state) => state.form.formDataArray);
  const handleAddRow = (formDataEntry) => {
    formDataEntry.id = rowId;

    dispatch(addFormData(formDataEntry));

    setRowId(rowId + 1);
  };

  const handleDelete = (id) => {
    dispatch(removeFormData(id));

    const newData = formDataArray.filter((item) => item.id !== id);
    setDataSource(newData);
  };

  const downloadCSV = () => {
    const fieldNames = formDataArray.map((entry) => entry.Fieldname);
    const csvContent = fieldNames.join(',') + '\n';
    const encodedCSV = encodeURIComponent(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', `data:text/csv;charset=utf-8,${encodedCSV}`);
    link.setAttribute('download', 'field_names.csv');
    document.body.appendChild(link);
    link.click();
  };
 

  const saveSchema = () => {
    // Create a new schema object
    const newSchema = {
      name: 'Schema Name', // Set a name for the schema as per your requirements
      data: formDataArray, // Use the current table data
    };
  
    // Dispatch the action to add the new schema to the Redux store
    dispatch(addSchemaData(newSchema));
  }
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "5%",
    },
    {
      title: "Field Name",
      dataIndex: "Fieldname",
      width: "30%",
    },
    {
      title: "Type",
      dataIndex: "Type",
      width: "30%",
    },
    {
      title: "Validation",
      dataIndex: "Validation",
      width: "30%",
    },
    {
      title: "Operation",
      dataIndex: "id",
      render: (id) => <Button onClick={() => handleDelete(id)}>Delete</Button>,
    },
  ];

  return (
    <div className="Stable">
      <SchemaForm onAddRow={handleAddRow} />
      <Table bordered dataSource={formDataArray} columns={columns} />
      <Button className="csvbtn" type="primary" onClick={downloadCSV}>
        Download CSV
      </Button>
      <Button type="primary" onClick={saveSchema}>
        Save Schema
      </Button>
    </div>
  );
};

export default Stable;
