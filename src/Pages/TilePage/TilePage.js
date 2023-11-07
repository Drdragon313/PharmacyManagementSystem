import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Image, Space, Upload, Avatar } from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

import {
  createCard,
  deleteCard,
  fetchTilesAndSchemas,
  deleteSchema,
  moveSchemaToTile,
  fetchMoveTileData,
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
  const [breadcrumbPath, setBreadcrumbPath] = useState([""]);
  const [activeModal, setActiveModal] = useState(null);
  const [isSelectionModalVisible, setSelectionModalVisible] = useState(null);
  const [schemas, setSchemas] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [isMoveModalVisible, setIsMoveModalVisible] = useState(false);
  const [moveTileData, setMoveTileData] = useState([]);
  const [selectedSchemaId, setSelectedSchemaId] = useState(null);
  const [selectedTileId, setSelectedTileId] = useState(null);

  const handleMoveButtonClick = (schemaId) => {
    setSelectedSchemaId(schemaId);
    fetchMoveTileData(setMoveTileData).then(() => {
      setIsMoveModalVisible(true);
      console.log("schemaID", schemaId);
    });
  };
  const handleCloseMoveModal = () => {
    setIsMoveModalVisible(false);
  };

  const getPath = () => {
    if (path.length === 1) {
      return "/";
    } else {
      return `${path.join("/")}`;
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
      <div>Upload</div>
    </div>
  );

  const moveSchema = () => {
    if (selectedSchemaId && selectedTileId) {
      moveSchemaToTile(selectedSchemaId, selectedTileId, handleCloseMoveModal)
        .then(() => {
          console.log("Schema moved successfully");
        })
        .catch((error) => {
          console.error("Error moving schema:", error);
        });
    } else {
      console.error("Selected schema or tile is not valid");
    }
  };

  return (
    <div>
      <Breadcrumb className="breadcrumb" separator=">">
        {path.map((pathItem, index) => (
          <Breadcrumb.Item
            className="breadcrumb-item"
            key={index}
            onClick={() => handleBreadcrumbClick(index)}
          >
            {pathItem === "" ? "Home" : pathItem}
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
      <h4 className="available-tiles-txt">Available Tiles</h4>
      <div className="allcards">
        {tiles.map((tile, index) => (
          <CustomCard
            className="tilecards"
            key={index}
            bordered={true}
            onClick={() => handleTileClick(tile.TileName)}
          >
            <div className="dropdown">
              <Button className="dropbtn">
                <MoreOutlined />
              </Button>
              <div className="dropdown-content">
                <Button
                  type="link"
                  onClick={() => handleDeleteCard(tile.TileName)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <Space direction="vertical" size={8} className="tile-content">
              <Avatar className="tile-avatar-img" shape="square">
                <Image
                  className="tile-img"
                  preview={false}
                  src={tileImg}
                ></Image>
              </Avatar>
              <h5 className="tile-name">{tile.TileName}</h5>
            </Space>
          </CustomCard>
        ))}
        <CustomCard
          className="button-container"
          onClick={() => openCardModal("createTile")}
        >
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            className="new-card-btn"
          ></Button>
          <Button className="create-new-tile-btn-txt" type="link">
            Add new Tile
          </Button>
        </CustomCard>
      </div>
      <h4 className="available-tiles-txt">Available Schemas</h4>
      <div className="allSchemas">
        {schemas ? (
          schemas.map((schema, index) => (
            <CustomCard className="schemacards" key={index} bordered={true}>
              <div className="dropdown">
                <Button className="dropbtn-schema">
                  <MoreOutlined />
                </Button>
                <div className="dropdown-content">
                  <Button
                    type="link"
                    onClick={() => handleDeleteSchema(schema.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    type="link"
                    onClick={() => handleMoveButtonClick(schema.id)}
                  >
                    Move
                  </Button>
                  <Modal
                    open={isMoveModalVisible}
                    title="Move Tile"
                    onCancel={handleCloseMoveModal}
                    footer={[
                      <Button key="back" onClick={handleCloseMoveModal}>
                        Cancel
                      </Button>,
                    ]}
                  >
                    <p>Select a Tile to move </p>
                    <ul>
                      {moveTileData &&
                        moveTileData.map((tile, index) => (
                          <div className="tiles-modal-list">
                            <Button
                              key={index}
                              type="text"
                              onClick={() => {
                                setSelectedTileId(tile.ID);
                              }}
                            >
                              {tile.TileName}
                            </Button>
                          </div>
                        ))}
                    </ul>
                    <Button onClick={moveSchema}>Move</Button>
                  </Modal>
                </div>
              </div>
              <Space className="schema-content" direction="vertical" size={5}>
                <Image preview={false} src={schemaImg}></Image>
                <h5 className="tile-name">{schema.schema_name}</h5>
                <Link to={`/schema/${index}`}>
                  <Button>View Details</Button>
                </Link>
              </Space>
            </CustomCard>
          ))
        ) : (
          <p></p>
        )}
        <CustomCard
          className="button-container-schema"
          onClick={() => openCardModal("createSchema")}
        >
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            className="new-card-btn"
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
              {imageUrl ? <img alt="avatar" /> : uploadButton}
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
