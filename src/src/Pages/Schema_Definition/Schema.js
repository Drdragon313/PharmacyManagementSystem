import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeSchemaData } from "../../redux/features/SchemaSlice/schemaSlice";
import CustomCard from "../../Components/Card/Card";
import "./Schema.css";
import { Button, Col, Image, Row, Space } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import schemaImg from "../../Assets/Schemas.png";
import SchemaCreationForm from "../../Components/SchemaCreationForm/SchemaCreationForm";

const Schema = () => {
  const dispatch = useDispatch();
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);


  const handleRemoveSchema = (indexToRemove) => {
    dispatch(removeSchemaData(indexToRemove));
  };
  const toggleCreateModal = () => {
    setCreateModalVisible(!isCreateModalVisible);
  };
  return (
    <>
      <div className="title">
        <h2>Schema Definition</h2>
        <h6>
          Schemas can be defined here by adding data using different available
          methods. These schemas will be matched against any data you import
          into the system
        </h6>
      </div>
      <div className="availableSchemas">
        <h4 className="AvailSchemastxt">Available Schemas</h4>
        <Row gutter={16}>
          {schemaDataArray.map((schema, index) => (
            <Col span={6} key={index}>
              <CustomCard className="card" bordered={true} span={6}
              
              >
                <Image className="schemaImg" src={schemaImg} preview={false} />
                <p className="schemaName">{`Schema ${index + 1}`}</p>
                <h6 >Schema Name: {schema.name}</h6>
                <Space size={44}>
                  <p>No. of Fields:{schema.data.length}</p>
                  <p>No. of Types:</p>
                </Space>

                <Space size={10} className="availableSchemasBtn">
                  <Link to={`/schema/${index}`}>
                    {" "}
                    <Button>View Details</Button>{" "}
                  </Link>
                  <Button onClick={() => handleRemoveSchema(index)}>
                    Remove Schema
                  </Button>
                </Space>
              </CustomCard>
            </Col>
          ))}
        </Row>
      </div>
      <div className="addNewSchema">
        <h2>Add Schema</h2>
        <h6>Create New Schema</h6>

          <Button
          className="circlebtn"
          onClick={toggleCreateModal}
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
          />
          <Button
          type="link"      
          className="linkbtn"
          >
            Create New Schema
          </Button>
          <SchemaCreationForm
        visible={isCreateModalVisible}
        onCancel={toggleCreateModal}
      />
     
      </div>
    </>
  );
};

export default Schema;
