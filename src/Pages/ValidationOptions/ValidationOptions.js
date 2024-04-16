import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./VaidationOptions.css";
import { Row, Space, Image } from "antd";
import schemaImg from "../../Assets/schemaImg.svg";
import axios from "axios";
import { addIndex } from "../../redux/features/SchemaSelectionSlice/SchemaSelectionSlice";
import { Link } from "react-router-dom";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import CustomCard from "../../Components/Card/Card";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";

import Spinner from "../../Components/Spinner/Spinner";
const ValidationOptions = () => {
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const localHeader = localStorage.getItem("AuthorizationToken");

  const headers = useMemo(() => {
    return {
      Authorization: localHeader,
    };
  }, [localHeader]);

  useEffect(() => {
    axios
      .get(`${baseURL}/schema/get-all-schema`, { headers })
      .then((response) => {
        const schemaData = response.data.data.published;
        setSchemas(schemaData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching schemas: ", error);
        setLoading(false);
      });
  }, [headers]);

  useEffect(() => {
    if (schemaDataArray.length === 1) {
      dispatch(addIndex(0));
    }
  }, [schemaDataArray, dispatch]);

  const handleMenuClick = (action, index) => {
    if (action === "viewDetails") {
    } else if (action === "uploadFile") {
      setSelectedSchema(index);
      dispatch(addIndex(index));

      const selectedSchemaId = schemas[index].schema_id;
      localStorage.setItem("selectedSchemaID", selectedSchemaId);

      axios
        .get(`${baseURL}/schema/get-all-schema?schema_id=${selectedSchemaId}`, {
          headers,
        })
        .then((response) => {
          const schemaData = response.data.schema.schemaDataArray[0].data;
          localStorage.setItem(
            "selectedSchemaData",
            JSON.stringify(schemaData)
          );
        })
        .catch((error) => {
          console.error("Error fetching selected schema data: ", error);
        });
    }
  };

  const breadcrumbItems = [{ label: "Upload Files", link: "/file" }];
  return (
    <div className="Validation-container">
      <div className="breadcrumb-validation-page">
        <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
      </div>

      <p className="validation-page-heading-txt">Upload Files</p>

      <div className="Options-container">
        {loading ? (
          <Spinner />
        ) : (
          <div className="Options-containerElements">
            <Row gutter={22} className="schema-conatiner-row">
              {schemas.map((schema, index) => (
                <Link to="fileUpload">
                  <CustomCard
                    className="schema-file-upload-cards"
                    bordered={true}
                    key={index}
                    onClick={() => handleMenuClick("uploadFile", index)}
                  >
                    <div className="schema-file-upload-content">
                      <Space
                        direction="vertical"
                        size={2}
                        className="schema-content"
                      >
                        <Image
                          className="schema-file-upload-img"
                          preview={false}
                          src={schemaImg}
                        ></Image>

                        <h5 className="schema-file-upload-name">
                          {" "}
                          {schema.schema_name}
                        </h5>
                      </Space>

                      <div></div>
                    </div>
                  </CustomCard>
                </Link>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationOptions;
