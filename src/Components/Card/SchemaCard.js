import React from "react";
import { useDispatch } from "react-redux";
import { removeSchemaData } from "../../redux/features/SchemaSlice/schemaSlice";
import CustomCard from "../../Components/Card/Card";
import { Button, Col, Image, Space } from "antd";
import { Link } from "react-router-dom";
import schemaImg from "../../Assets/Schemas.png";
import "./Style.css";

const SchemaCard = ({ schema, index }) => {
  const dispatch = useDispatch();

  const handleRemoveSchema = () => {
    dispatch(removeSchemaData(index));
  };

  return (
    <Col span={6}>
      <CustomCard className="card" bordered={true} span={6}>
        <Image className="schemaImg" src={schemaImg} preview={false} />
        <p className="schemaName">{`Schema ${index + 1}`}</p>
        <h6>Schema Name: {schema.name}</h6>
        <Space size={44}>
          <p>No. of Fields: {schema.data.length}</p>
          <p>No. of Types:{schema.data.width}</p>
        </Space>

        <Space size={10} className="availableSchemasBtn">
          <Link to={`/schema/${index}`}>
            <Button className="SchemaViewDetails">View Details</Button>
          </Link>
          <Button className="SchemaDelete" onClick={handleRemoveSchema}>
            Remove Schema
          </Button>
        </Space>
      </CustomCard>
    </Col>
  );
};

export default SchemaCard;
