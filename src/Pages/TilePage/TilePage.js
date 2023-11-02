import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Image, Space, Upload, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import {
  createCard,
  deleteCard,
  fetchTilesAndSchemas,
  deleteSchema,
} from "../../Utility Function/tilePageUtils";
import "./TilePage.css";
import SelectionModal from "../../Components/CreateSchemaSelectionModal/SelectionModal";
import CustomCard from "../../Components/Card/Card";
import schemaImg from "../../Assets/Schemas.png";
import { Link } from "react-router-dom";
import tileImg from "../../Assets/tileimg.svg";

const TilePage = () => {
  const [path, setPath] = useState([""]);
  const [tiles, setTiles] = useState([]);
  const [newCardName, setNewCardName] = useState("");
  const [breadcrumbPath, setBreadcrumbPath] = useState(["Home"]);
  const [activeModal, setActiveModal] = useState(null);
  const [isSelectionModalVisible, setSelectionModalVisible] = useState(null);
  const [schemas, setSchemas] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const getPath = () => {
    if (path.length === 1) {
      return "/";
    } else {
      return `/${path[path.length - 1]}`;
    }
  };

  useEffect(() => {
    fetchDataTiles(getPath());
  }, [path]);

  const fetchDataTiles = async (tilePath) => {
    const data = await fetchTilesAndSchemas(tilePath);
    setTiles(data.tiles);
    setSchemas(data.schemas);
    console.log(data.schemas);
    localStorage.setItem("tilePath", tilePath);
  };

  const handleTileClick = (cardPath) => {
    setPath((prev) => {
      const previous = [...prev];
      previous.push(cardPath);
      setBreadcrumbPath([...breadcrumbPath, cardPath]);
      return previous;
    });
  };

  const handleBreadcrumbClick = (index) => {
    setPath(breadcrumbPath.slice(0, index + 1));
    setBreadcrumbPath(breadcrumbPath.slice(0, index + 1));
  };

  const handleCreateCard = async () => {
    const success = await createCard(newCardName, getPath());
    if (success) {
      setNewCardName("");

      fetchDataTiles(getPath());
    }
  };

  const handleDeleteCard = async (tileName) => {
    const updatedTilesData = await deleteCard(tileName);
    if (updatedTilesData) {
      setTiles(updatedTilesData);
    }
  };
  const handleDeleteSchema = async (schemaId) => {
    const updatedSchemasData = await deleteSchema(schemaId);
    if (updatedSchemasData) {
      setSchemas(updatedSchemasData);
    }
  };

  const openCardModal = (modalType) => {
    setSelectionModalVisible(modalType);
    setActiveModal(modalType);
  };

  const closeCardModal = () => {
    setActiveModal(null);
    setNewCardName("");
    setSelectionModalVisible(false);
  };
  const uploadButton = (
    <div>
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div>
      <Breadcrumb className="breadcrumb" separator=">">
        {breadcrumbPath.map((pathItem, index) => (
          <Breadcrumb.Item
            className="breadcrumb-item"
            key={index}
            onClick={() => handleBreadcrumbClick(index)}
            style={{ cursor: "pointer" }}
          >
            {pathItem}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>

      <div className="title-description">
        <h3>Available Options</h3>
        <p>
          You can choose from the options given below for which you want to
          upload data.
        </p>
      </div>
      <h4 style={{ marginLeft: "30px" }}>Available Tiles</h4>
      <div className="allcards">
        {tiles.map((tile, index) => (
          <CustomCard
            className="tilecards"
            key={index}
            bordered={true}
            onClick={() => handleTileClick(tile.TileName)}
          >
            <div class="dropdown">
              <Button class="dropbtn">...</Button>
              <div class="dropdown-content">
                <Button
                  type="link"
                  onClick={() => handleDeleteCard(tile.TileName)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <Space direction="vertical" size={8}>
              <Avatar
                className="tile-img"
                size={{
                  xs: 22,
                  sm: 38,
                  md: 36,
                  lg: 50,
                  xl: 70,
                  xxl: 90,
                }}
                shape="square"
              >
                <Image
                  preview={false}
                  src={tileImg}
                  size={{
                    xs: 30,
                    sm: 40,
                    md: 50,
                    lg: 60,
                    xl: 70,
                    xxl: 90,
                  }}
                ></Image>
              </Avatar>

              <h5 className="tile-name">{tile.TileName}</h5>
            </Space>
          </CustomCard>
        ))}
        <div className="button-container">
          <Button
            onClick={() => openCardModal("createTile")}
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            className="new-card-btn"
          ></Button>
          <Button className="create-new-tile-btn-txt" type="link">
            Add new Tile
          </Button>
        </div>
      </div>
      <h4 style={{ marginLeft: "30px" }}>Available Schemas</h4>
      <div className="allSchemas">
        {schemas ? (
          schemas.map((schema, index) => (
            <CustomCard className="schemacards" key={index} bordered={true}>
              <div class="dropdown">
                <Button class="dropbtn-schema">...</Button>
                <div class="dropdown-content">
                  <Button
                    type="link"
                    onClick={() => handleDeleteSchema(schema.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <Space className="schema-content" direction="vertical" size={5}>
                <Image
                  preview={false}
                  src={schemaImg}
                  size={{
                    xs: 30,
                    sm: 40,
                    md: 50,
                    lg: 60,
                    xl: 70,
                    xxl: 90,
                  }}
                ></Image>

                <h5 className="tile-name">{schema.schema_name}</h5>
                <Link to={`/schema/${index}`}>
                  <Button>View Details</Button>
                </Link>
              </Space>
            </CustomCard>
          ))
        ) : (
          <p>No schemas available.</p>
        )}
        <CustomCard className="button-container-schema">
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            className="new-card-btn"
            onClick={() => openCardModal("createSchema")}
          ></Button>
          <Button className="create-new-tile-btn-txt" type="link">
            Add new Schema
          </Button>
        </CustomCard>
      </div>

      <SelectionModal
        visible={isSelectionModalVisible === "createSchema"}
        setSelectionModalVisible={setSelectionModalVisible}
        onCancel={closeCardModal}
        tilePath={path}
      />

      <Modal
        open={activeModal === "createTile"}
        title="Create New Tile"
        onOk={handleCreateCard}
        okText="Done"
        onCancel={closeCardModal}
      >
        <Input
          placeholder="Enter name"
          value={newCardName}
          onChange={(e) => setNewCardName(e.target.value)}
        />
        <div className="upload-img">
          <div>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            >
              {imageUrl ? (
                <img
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <div className="upload-img-text">
            <h6>Upload Icon Here</h6>
            <p>
              Files Supported: PNG, JPG, SVG <br /> Maximum size: 100MB
            </p>
            <Button type="primary">Choose File</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TilePage;
