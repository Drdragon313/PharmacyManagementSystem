import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { useDispatch } from 'react-redux';
import { addFormData,removeFormData } from '../../redux/features/formSlice/formSlice';
import SchemaForm from '../Form/Form'; 
import ModalPop from '../Modal/Modal';

const Stable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [rowId, setRowId] = useState(1);
  
 
  const dispatch = useDispatch();

  const handleAddRow = (formDataEntry) => {
    formDataEntry.id = rowId;


    dispatch(addFormData(formDataEntry));

    setDataSource([...dataSource, formDataEntry]);
    setRowId(rowId + 1);
  };

  const handleDelete = (id) => {
    
    dispatch(removeFormData(id));

    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
  };

  const downloadFirstRowAsCSV = () => {
    if (dataSource.length > 0) {
      const firstRow = dataSource[0];
      const csvContent =  Object.values(firstRow).join(',') ;
      const encodedCSV = encodeURIComponent(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', `data:text/csv;charset=utf-8,${encodedCSV}`);
      link.setAttribute('download', 'first_row.csv');
      document.body.appendChild(link);
      link.click();
    }
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '5%',
    },
    {
      title: 'Field Name',
      dataIndex: 'Fieldname',
      width: '30%',
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      width: '30%',
    },
    {
      title: 'Validation',
      dataIndex: 'Validation',
      width: '30%',
    },
    {
      title: 'Operation',
      dataIndex: 'id',
      render: (id) => (
        <Button onClick={() => handleDelete(id)}>Delete</Button>
      ),
    },
  ];

  return (
    <div>
 
      <SchemaForm onAddRow={handleAddRow} />
      <Table bordered dataSource={dataSource} columns={columns} />
      <Button type='primary' onClick={downloadFirstRowAsCSV}>Download CSV</Button>
    </div>
  );
};

export default Stable;
