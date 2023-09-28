import React, { useState } from "react";
import "./Style.css";
import CustomCard from "../Card/Card";
import { Row, Col, Modal, Space, Image } from "antd";
import SchemaCreationForm from "../SchemaCreationForm/SchemaCreationForm";
import databaseImg from "../../Assets/uploadDatabase.png";
import manulaImg from "../../Assets/manual.png";
import CSVimg from "../../Assets/csv.png";
import { Link } from "react-router-dom";
const SelectionModal = ({ visible, setSelectionModalVisible }) => {
  const [isSchemaFormVisible, setSchemaFormVisible] = useState(false);

  const openSchemaCreationForm = () => {
    setSelectionModalVisible(false);
    setSchemaFormVisible(true);
  };

  return (
    <>
      <Modal
        open={visible}
        width={800}
        onCancel={() => setSelectionModalVisible(false)}
        footer={null}
        className="modalstyle"
      >
        <h5 className="heading">Select a Method To Create New Schema</h5>
        <p className="sub-heading">
          Using this method user will upload the entire schema manually by
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
                    This method will allow users to connect to their existence
                    database to import their desired schema.
                  </p>
                </Space>
              </CustomCard>
            </Col>
            <Col span={6} onClick={openSchemaCreationForm}>
              <CustomCard className="importManuallycard">
                <Space size={1} direction="vertical">
                  <Image
                    className="manualImg"
                    src={manulaImg}
                    preview={false}
                  ></Image>
                  <h6>Import Manually</h6>
                  <p>
                    Using this method user will upload the entire schema
                    manually by adding each field and validation individually.
                  </p>
                </Space>
              </CustomCard>
            </Col>
            <Col span={6} onClick={openSchemaCreationForm}>
              <Link to="autopopulate">
                <CustomCard className="importfromCSV">
                  <Space size={1} direction="vertical">
                    <Image
                      className="csvImg"
                      src={CSVimg}
                      preview={false}
                    ></Image>
                    <h6>Import from CSV</h6>
                    <p>
                      This method will allow users to import there schema by
                      importing file.
                    </p>
                  </Space>
                </CustomCard>
              </Link>
            </Col>
          </Space>
        </Row>
      </Modal>
      {isSchemaFormVisible && (
        <SchemaCreationForm
          visible={isSchemaFormVisible}
          onCancel={() => setSchemaFormVisible(false)}
        />
      )}
    </>
  );
};

export default SelectionModal;
