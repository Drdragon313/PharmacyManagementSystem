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
  Form,
  Breadcrumb,
} from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";

import {
  createCard,
  deleteCard,
  fetchTilesAndSchemas,
  deleteSchema,
  moveSchemaToTile,
  fetchMoveTileData,
  updateTileNameApi,
} from "../../Utility Function/tilePageUtils";
import "./TilePage.css";
import SelectionModal from "../../Components/CreateSchemaSelectionModal/SelectionModal";
import CustomCard from "../../Components/Card/Card";
import { Link } from "react-router-dom";
import tileImg from "../../Assets/schemaImg.svg";
import Spinner from "../../Components/Spinner/Spinner";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import { fetchUserPermissions } from "../../Utility Function/ModulesAndPermissions";
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
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [deleteItem, setDeleteItem] = useState({ type: "", id: null });
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedTileName, setEditedTileName] = useState("");
  const [selectedTileIdForEdit, setSelectedTileIdForEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userPermissions, setUserPermissions] = useState(null);
  const [form] = Form.useForm();
  const handleMoveButtonClick = (schemaId) => {
    setSelectedSchemaId(schemaId);
    fetchMoveTileData(setMoveTileData).then(() => {
      setIsMoveModalVisible(true);
    });
  };

  const handleCloseMoveModal = () => {
    setIsMoveModalVisible(false);
  };

  const getPath = useCallback(
    () => (path.length === 1 ? "/" : path.join("/")),
    [path]
  );
  useEffect(() => {
    const fetchUserPermissionData = async () => {
      try {
        await fetchUserPermissions(setUserPermissions);
      } catch (error) {
        console.error("Error fetching user permissions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPermissionData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchDataTiles(getPath())
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [getPath]);

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
    const isTileNameExists = tiles.some(
      (tile) => tile.TileName === newCardName
    );
    if (isTileNameExists) {
      message.error(
        "Tile with the same name already exists. Please choose a different name."
      );
      return;
    }

    const success = await createCard(newCardName, getPath());

    if (success) {
      setNewCardName("");
      fetchDataTiles(getPath());
      closeCardModal();
    }
  };

  const handleDeleteCard = async (tileName) => {
    const updatedTilesData = await deleteCard(tileName);
    if (updatedTilesData) {
      fetchDataTiles(getPath());
    }
  };
  const handleDeleteConfirmation = (type, id, event) => {
    event.stopPropagation();
    setDeleteConfirmationVisible(true);
    setDeleteItem({ type, id });
  };

  const handleConfirmDelete = async () => {
    if (deleteItem.type === "tile") {
      await handleDeleteCard(deleteItem.id);
    } else if (deleteItem.type === "schema") {
      await handleDeleteSchema(deleteItem.id);
    }

    setDeleteConfirmationVisible(false);
  };

  const handleDeleteSchema = async (schemaId) => {
    const updatedSchemasData = await deleteSchema(schemaId);
    if (updatedSchemasData) {
      fetchDataTiles(getPath());
    }
  };
  const handleEditTileClick = (tileId, event) => {
    event.stopPropagation();
    const selectedTile = tiles.find((tile) => tile.ID === tileId);
    setEditedTileName(selectedTile.TileName);
    setSelectedTileIdForEdit(tileId);
    setEditModalVisible(true);
  };

  const handleEditTile = async () => {
    try {
      await updateTileNameApi(selectedTileIdForEdit, editedTileName);
      message.success("Tile updated successfully");
      setEditModalVisible(false);
      fetchDataTiles(getPath());
    } catch (error) {
      message.error("Error updating tile name");
      console.error(error);
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
  const canCreateTiles =
    userPermissions?.find((module) => module.module_name === "Data live")
      ?.actions?.write || false;
  const canDeleteTiles =
    userPermissions?.find((module) => module.module_name === "Data live")
      ?.actions?.delete || false;
  const canEditTiles =
    userPermissions?.find((module) => module.module_name === "Data live")
      ?.actions?.update || false;
  const canViewTiles =
    userPermissions?.find((module) => module.module_name === "Data live")
      ?.actions?.read || false;

  const moveSchema = () => {
    if (selectedSchemaId && selectedTileId) {
      moveSchemaToTile(selectedSchemaId, selectedTileId, handleCloseMoveModal)
        .then(() => {
          message.success("Schema moved successfully");
          fetchDataTiles(getPath());
        })
        .catch((error) => {
          message.error("Error moving schema:", error);
        });
    } else {
      message.error("Selected schema or tile is not valid");
    }
  };
  if (isLoading === true) {
    return <Spinner />;
  }
  return (
    <div className="tilepage-container">
      <Breadcrumb className="breadcrumb" separator=">>">
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

      <Row gutter={5}>
        <Col span={23}>
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
                    <div className="dropdown-content">
                      {canDeleteTiles && (
                        <Button
                          type="link"
                          onClick={(event) =>
                            handleDeleteConfirmation(
                              "tile",
                              tile.TileName,
                              event
                            )
                          }
                        >
                          Delete
                        </Button>
                      )}
                      {canEditTiles && (
                        <Button
                          type="link"
                          onClick={(event) =>
                            handleEditTileClick(tile.ID, event)
                          }
                        >
                          Edit Tile
                        </Button>
                      )}
                    </div>
                  </Button>
                </div>
                <Space direction="vertical" size={8} className="tile-content">
                  <Avatar className="tile-avatar-img" shape="circle">
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
            {canCreateTiles && (
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
            )}
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <h4 className="available-tiles-txt">Available Schemas</h4>
          <div className="allSchemas">
            {schemas ? (
              schemas.map((schema, index) => (
                <CustomCard
                  className="schemacards-tilepage"
                  key={index}
                  bordered={true}
                >
                  <div className="dropdown">
                    <Button className="dropbtn-schema">
                      <MoreOutlined />
                    </Button>
                    <div className="dropdown-content">
                      {canDeleteTiles && (
                        <Button
                          type="link"
                          onClick={(event) =>
                            handleDeleteConfirmation("schema", schema.id, event)
                          }
                        >
                          Delete
                        </Button>
                      )}
                      {canEditTiles && (
                        <Button
                          type="link"
                          onClick={() => handleMoveButtonClick(schema.id)}
                        >
                          Move
                        </Button>
                      )}

                      <Link to={`/schema/${schema.id}`}>
                        <Button type="link">View Details</Button>
                      </Link>
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
                              <div className="tiles-modal-list" key={index}>
                                <Button
                                  className={`move-tile-name-btn ${
                                    selectedButtonIndex === index
                                      ? "clicked"
                                      : ""
                                  }`}
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
                        {canEditTiles && (
                          <Button type="primary" onClick={moveSchema}>
                            Move
                          </Button>
                        )}
                      </Modal>
                    </div>
                  </div>
                  <Space
                    className="schema-content"
                    direction="vertical"
                    size={5}
                  >
                    <Image
                      className="schema-img"
                      preview={false}
                      src={tileImg}
                    ></Image>
                    <h5 className="tile-name">{schema.schema_name}</h5>
                  </Space>
                </CustomCard>
              ))
            ) : (
              <p></p>
            )}
            {canViewTiles && (
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
            )}
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
        onOk={() => form.submit()}
        okText="Create Tile"
        onCancel={closeCardModal}
      >
        <Form form={form} onFinish={handleCreateCard}>
          <Form.Item
            name="newCardName"
            label="Enter name"
            rules={[{ required: true, message: "Please enter a Tile name!" }]}
          >
            <Input
              placeholder="Enter name"
              value={newCardName}
              onChange={(e) => setNewCardName(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isEditModalVisible}
        title="Edit Tile"
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEditTile}
      >
        <Input
          placeholder="Enter new tile name"
          value={editedTileName}
          onChange={(e) => setEditedTileName(e.target.value)}
        />
      </Modal>
      <ConfirmationModal
        open={isDeleteConfirmationVisible}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmationVisible(false)}
        confirmationHeading="Confirm Deletion"
        confirmationText="Are you sure you want to delete this item?"
        titleImage={null}
        btnclassName="delete-confirm-btn"
        btnTxt="Confirm Delete"
      />
    </div>
  );
};

export default TilePage;
