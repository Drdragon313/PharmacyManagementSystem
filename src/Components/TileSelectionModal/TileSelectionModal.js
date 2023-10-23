import React from "react";
import { Modal, Space, Image, Row, Col } from "antd";
import CustomCard from "../Card/Card";
import SchemaCreationForm from "../SchemaCreationForm/SchemaCreationForm";
import databaseImg from "../../Assets/uploadDatabase.png";
import manulaImg from "../../Assets/manual.png";
import CSVimg from "../../Assets/csv.png";

const SelectionModal = ({
  visible,
  setSelectionModalVisible,
  setSelectedType,
  setModalVisible,
}) => {
  const openSchemaCreationForm = (selectedType) => {
    setSelectedType(selectedType);
    setSelectionModalVisible(false);
    setModalVisible(true);
  };

  return (
    <Modal
      open={visible}
      width={800}
      onCancel={() => setSelectionModalVisible(false)}
      footer={null}
      className="modalstyle"
    >
      <h5 className="heading">Select a Method To Create New Schema</h5>
      <p className="sub-heading">
        Using this method, the user will upload the entire schema manually by
        adding each field and validation individually.
      </p>
      <Row span={12}>
        <Space size={8}>
          <Col span={6}>
            <CustomCard className="importfromDataBase">
              <Space size={1} direction="vertical">
                <Image
                  className="DBimg"
                  src={databaseImg}
                  preview={false}
                ></Image>
                <h6>Import from Database</h6>
                <p>
                  This method will allow users to connect to their existing
                  database to import their desired schema.
                </p>
              </Space>
            </CustomCard>
          </Col>
          <Col
            span={6}
            onClick={() => openSchemaCreationForm("manual")}
            type="manual"
          >
            <CustomCard className="importManuallycard">
              <Space size={1} direction="vertical">
                <Image
                  className="manualImg"
                  src={manulaImg}
                  preview={false}
                ></Image>
                <h6>Import Manually</h6>
                <p>
                  Using this method, the user will upload the entire schema
                  manually by adding each field and validation individually.
                </p>
              </Space>
            </CustomCard>
          </Col>
          <Col
            span={6}
            onClick={() => openSchemaCreationForm("csv")}
            type="csv"
          >
            <CustomCard className="importfromCSV">
              <Space size={1} direction="vertical">
                <Image className="csvImg" src={CSVimg} preview={false}></Image>
                <h6>Import from CSV</h6>
                <p>
                  This method will allow users to import their schema by
                  importing a file.
                </p>
              </Space>
            </CustomCard>
          </Col>
        </Space>
      </Row>
    </Modal>
  );
};

export default SelectionModal;
