import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SchemaTable from "../GeneralSchemaTable/SchemaTable";
import { DragDropContext } from "react-beautiful-dnd";
import { downloadCSV } from "../../Utility Function/downloadCSV";
import { Button } from "antd";
import "./style.css";
const SchemaDetails = ({ editFormData, handleDelete }) => {
  const { schemaId } = useParams();
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);
  const schemaName = useSelector((state) => state.schema.schemaName);
  const schemaData = schemaDataArray[schemaId];
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  };
  const handleDownloadCSV = () => {
    downloadCSV(schemaDataArray, schemaName);
  };

  return (
    <div>
      {schemaData ? (
        <div>
          <h3>Schema Name: {schemaData.name}</h3>
          <DragDropContext onDragEnd={onDragEnd}>
            <SchemaTable
              data={schemaData.data}
              editFormData={editFormData}
              handleDelete={handleDelete}
            />
          </DragDropContext>
          <Button className="csvbtn" type="primary" onClick={handleDownloadCSV}>
            Download CSV
          </Button>
        </div>
      ) : (
        <p>Schema not found</p>
      )}
    </div>
  );
};

export default SchemaDetails;
