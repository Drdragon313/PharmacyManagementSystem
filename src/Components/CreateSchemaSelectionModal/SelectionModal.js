import React, { useState } from "react";
import "./Style.css";
import CustomCard from "../Card/Card";
import { Row, Col, Modal, Image } from "antd";
import SchemaCreationForm from "../SchemaCreationForm/SchemaCreationForm";
import databaseImg from "../../Assets/uploadDatabase.png";
import manulaImg from "../../Assets/manual.png";
import CSVimg from "../../Assets/csv.png";
const SelectionModal = ({ visible, setSelectionModalVisible, tilePath }) => {
  const [isSchemaFormVisible, setSchemaFormVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const openSchemaCreationForm = (selectedType) => {
    setSelectionModalVisible(false);
    setSchemaFormVisible(true);
    setSelectedType(selectedType);
    console.log("tilepath = ", tilePath);
  };

  return (
    <>
      <Modal
        open={visible}
        // width={800}
        onCancel={() => setSelectionModalVisible(false)}
        footer={null}
        className="modalstyle"
      >
        <h5 className="heading">Select a Method To Create New Schema</h5>
        <p className="sub-heading">
          Using this method user will upload the entire schema manually by
          adding each field and validation individually.
        </p>
        <Row
          gutter={[16, 16]}
          wrap={true}
          justify={"space-evenly"}
          align={"middle"}
        >
          <Col>
            <CustomCard className="importfromDataBase">
              <Image
                className="DBimg"
                src={databaseImg}
                preview={false}
              ></Image>
              <h6>Connect To Database</h6>
              <p>
                This method will allow users to connect to their existence
                database to import their desired schema.
              </p>
            </CustomCard>
          </Col>
          <Col onClick={() => openSchemaCreationForm("manual")} type="manual">
            <CustomCard className="importManuallycard">
              <Image
                className="manualImg"
                src={manulaImg}
                preview={false}
              ></Image>
              <h6>Create Manually</h6>
              <p>
                Using this method user will upload the entire schema manually by
                adding each field and validation individually.
              </p>
            </CustomCard>
          </Col>
          <Col onClick={() => openSchemaCreationForm("csv")} type="csv">
            <CustomCard className="importfromCSV">
              <Image className="csvImg" src={CSVimg} preview={false}></Image>
              <h6>Import from CSV</h6>
              <p>
                This method will allow users to import their schema by importing
                a file.
              </p>
            </CustomCard>
          </Col>
        </Row>
      </Modal>
      {isSchemaFormVisible && (
        <SchemaCreationForm
          visible={isSchemaFormVisible}
          onCancel={() => setSchemaFormVisible(false)}
          selectedType={selectedType}
          tilePath={tilePath}
        />
      )}
    </>
  );
};

export default SelectionModal;
