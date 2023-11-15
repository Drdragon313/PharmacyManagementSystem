import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  Input,
  Button,
  Image,
  Space,
  Avatar,
  Row,
  Col,
  message,
} from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import axios from "axios";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
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
  const [isMoveModalVisible, setIsMoveModalVisible] = useState(false);
  const [moveTileData, setMoveTileData] = useState([]);
  const [selectedSchemaId, setSelectedSchemaId] = useState(null);
  const [selectedTileId, setSelectedTileId] = useState(null);
  const [isUploadModalVisible, setUploadModalVisible] = useState(false);
  const [iconsData, setIconsData] = useState();
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1);
  const handleMoveButtonClick = (schemaId) => {
    setSelectedSchemaId(schemaId);
    fetchMoveTileData(setMoveTileData).then(() => {
      setIsMoveModalVisible(true);
    });
  };
  const handleCloseMoveModal = () => {
    setIsMoveModalVisible(false);
  };
  const openUploadModal = () => {
    setUploadModalVisible(true);
    fetchIconsData();
  };
  const getPath = useCallback(() => {
    if (path.length === 1) {
      return "/";
    } else {
      return `${path.join("/")}`;
    }
  }, [path]);

  useEffect(() => {
    fetchDataTiles(getPath());
  }, [getPath]);
  const fetchIconsData = async () => {
    try {
      const response = await axios.get(`${baseURL}/icons`);
      let Icon = Object.values(response.data.imageUrls);
      setIconsData(Icon);
    } catch (error) {
      console.error("Error fetching icons data:", error);
    }
  };

  const fetchDataTiles = async (tilePath) => {
    const data = await fetchTilesAndSchemas(tilePath);
    setTiles(data.tiles);
    setSchemas(data.schemas);
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

  const moveSchema = () => {
    if (selectedSchemaId && selectedTileId) {
      moveSchemaToTile(selectedSchemaId, selectedTileId, handleCloseMoveModal)
        .then(() => {
          message.success("Schema moved successfully");
        })
        .catch((error) => {
          message.error("Error moving schema:", error);
        });
    } else {
      message.error("Selected schema or tile is not valid");
    }
  };

  return (
    <div className="tilepage-container">
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

      <Row gutter={24}>
        <div className="title-description">
          <h3>Available Options</h3>
          <p>
            You can choose from the options given below for which you want to
            upload data.
          </p>
        </div>
        <Col span={22} md={12} lg={16} xl={22}>
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
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={22} md={12} lg={16} xl={22}>
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
                        footer={false}
                      >
                        <p>Select a Tile to move </p>
                        <ul>
                          {moveTileData &&
                            moveTileData.map((tile, index) => (
                              <div className="tiles-modal-list">
                                <Button
                                  className={`move-tile-name-btn ${
                                    selectedButtonIndex === index
                                      ? "clicked"
                                      : ""
                                  }`}
                                  key={index}
                                  type="text"
                                  onClick={() => {
                                    setSelectedTileId(tile.ID);
                                    setSelectedButtonIndex(index);
                                  }}
                                >
                                  {tile.TileName}
                                </Button>
                              </div>
                            ))}
                        </ul>
                        <Button type="primary" onClick={moveSchema}>
                          Move
                        </Button>
                      </Modal>
                    </div>
                  </div>
                  <Space
                    className="schema-content"
                    direction="vertical"
                    size={5}
                  >
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
        </Col>
      </Row>
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
          required={true}
          placeholder="Enter name"
          value={newCardName}
          onChange={(e) => setNewCardName(e.target.value)}
        />
        <div className="upload-img">
          <div className="upload-img-text">
            <h6>Upload Icon Here</h6>
            <p>
              Files Supported: PNG, JPG, SVG <br /> Maximum size: 100MB
            </p>
            <Button type="primary" onClick={openUploadModal}>
              Choose File
            </Button>
          </div>
        </div>
        <Modal
          open={isUploadModalVisible}
          title="Upload Modal Title"
          onOk={() => setUploadModalVisible(false)}
          onCancel={() => setUploadModalVisible(false)}
        >
          <div className="icons-modal">
            {iconsData && iconsData.length > 0 ? (
              iconsData.map((icon, index) => (
                <div key={index}>
                  <Image preview={false} src={icon.URL} className="icons" />
                </div>
              ))
            ) : (
              <p>No icons data available.</p>
            )}
          </div>
          <Button type="primary" onClick={() => setUploadModalVisible(false)}>
            Upload
          </Button>
        </Modal>
      </Modal>
    </div>
  );
};

export default TilePage;
