import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {removeSchemaData } from '../../redux/features/SchemaSlice/schemaSlice';
import Stable from '../../Components/SchemaTable/Stable';
import CustomCard from '../../Components/Card/Card';
import "./Schema.css"
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import SchemaData from '../../Components/SchemaData/SchemaData';
const Schema = () => {
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray); // Access schema data from Redux store
  const dispatch = useDispatch();

  const handleRemoveSchema = (indexToRemove) => {
    dispatch(removeSchemaData(indexToRemove)); // Dispatch the action to remove schema data
  };

 
  return (
    <>
    <div className='title'>
      <h2>Schema Definition</h2>
      <h6>Schemas can be defined here by adding data using different availible methods. These schemas will be matched against any data you import into the system</h6>
      </div>
      <div className='availibleSchemas'>
        <h4>Available Schemas</h4>
        <Row gutter={16}>
          {schemaDataArray.map((schema, index) => (
            <Col span={6} key={index}>
              <Link to={`/schema/${index}`}>
  <CustomCard title={`Schema ${index + 1}`} bordered={true} span={6}>
    {/* Render the schema data here as needed */}
    {/* You can map over schema.data and display it */}
    <Button
      type="danger"
      onClick={() => handleRemoveSchema(index)}
    >
      Remove Schema
    </Button>
  </CustomCard>
</Link>
            </Col>
          ))}
        </Row>
      </div>
  <div className='addNewSchema'>
    <h2>Add Schema</h2>
    <h6>Create New Schema</h6>
    <Link to="/customschema">
    <Button type="primary" shape="circle" icon={<PlusOutlined />}  size='large' />
    <Button type='link' style={{fontWeight:"bolder"}}>Add a Custom Schema</Button>
    </Link>
  </div>
  
    </>
  );
}

export default Schema
