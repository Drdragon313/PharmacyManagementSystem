import React, { useState } from "react";
import "./Style.css";
import CustomCard from "../Card/Card";
import { Row, Col, Modal, Image } from "antd";
import SchemaCreationForm from "../SchemaCreationForm/SchemaCreationForm";
import manulaImg from "../../Assets/manual.svg";
import CSVimg from "../../Assets/csv.svg";
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
        onCancel={() => setSelectionModalVisible(false)}
        footer={null}
        className="modalstyle"
        style={{ overflowX: "hidden" }}
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
