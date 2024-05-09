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
  Dropdown,
  Menu,
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
import CustomButton from "../../Components/CustomButton/CustomButton";
import AccessDenied from "../AccessDenied/AccessDenied";
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
  const [editedTilePath, setEditedTilePath] = useState("");
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
    if (/^\s/.test(newCardName)) {
      message.error("Tile name cannot start with a space.");
      return;
    }
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
  const handleDeleteConfirmation = (type, id) => {
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
  const handleEditTileClick = (tileId) => {
    const selectedTile = tiles.find((tile) => tile.ID === tileId);
    setEditedTileName(selectedTile.TileName);
    setSelectedTileIdForEdit(tileId);
    setEditedTilePath(selectedTile.Path);
    setEditModalVisible(true);
  };

  const handleEditTile = async () => {
    if (/^\s/.test(editedTileName)) {
      message.error("Tile name cannot start with a space.");
      return;
    }
    try {
      await updateTileNameApi(
        selectedTileIdForEdit,
        editedTileName,
        editedTilePath
      );
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
    <>
      {canViewTiles ? (
        <div className="tilepage-container">
          <Breadcrumb className="breadcrumb" separator=">>">
            {path.map((pathItem, index) => (
              <Breadcrumb.Item
                className="breadcrumb-item"
                key={index}
                onClick={() => handleBreadcrumbClick(index)}
              >
                {pathItem === "" ? "Data Live" : pathItem}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>

          <Row gutter={5}>
            <Col span={23}>
              <h4 className="available-tiles-txt">Available Tiles</h4>
              <div className="allcards">
                {tiles.map((tile, index) => (
                  <CustomCard className="tilecards" key={index} bordered={true}>
                    <div className="dropdown">
                      <Dropdown
                        overlay={
                          <Menu>
                            {canDeleteTiles && (
                              <Menu.Item
                                key="delete"
                                onClick={() =>
                                  handleDeleteConfirmation(
                                    "tile",
                                    tile.TileName
                                  )
                                }
                              >
                                Delete
                              </Menu.Item>
                            )}
                            {canEditTiles && (
                              <Menu.Item
                                key="edit"
                                onClick={() => handleEditTileClick(tile.ID)}
                              >
                                Edit Tile
                              </Menu.Item>
                            )}
                            <Menu.Item
                              key="navigate"
                              onClick={() => handleTileClick(tile.TileName)}
                            >
                              Navigate Inside
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={["click"]}
                      >
                        <Button className="dropbtn" icon={<MoreOutlined />} />
                      </Dropdown>
                    </div>
                    <Space
                      direction="vertical"
                      size={2}
                      className="tile-content"
                    >
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
                        <Dropdown
                          overlay={
                            <Menu>
                              {canDeleteTiles && (
                                <Menu.Item
                                  key="delete"
                                  onClick={(event) =>
                                    handleDeleteConfirmation(
                                      "schema",
                                      schema.id,
                                      event
                                    )
                                  }
                                >
                                  Delete
                                </Menu.Item>
                              )}
                              {canEditTiles && (
                                <Menu.Item
                                  key="move"
                                  onClick={() =>
                                    handleMoveButtonClick(schema.id)
                                  }
                                >
                                  Move
                                </Menu.Item>
                              )}
                              <Menu.Item key="view">
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={`/schema/${schema.id}`}
                                >
                                  View Details
                                </Link>
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}
                        >
                          <Button
                            className="dropbtn-schema"
                            icon={<MoreOutlined />}
                          />
                        </Dropdown>
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
            footer={false}
            onCancel={closeCardModal}
          >
            <Form form={form} onFinish={handleCreateCard}>
              <Form.Item
                name="newCardName"
                label="Enter name"
                rules={[
                  { required: true, message: "Please enter a Tile name!" },
                ]}
              >
                <Input
                  placeholder="Enter name"
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <CustomButton type="primary" htmlType="submit">
                  Create
                </CustomButton>
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            open={isEditModalVisible}
            title="Edit Tile"
            onCancel={() => setEditModalVisible(false)}
            footer={false}
          >
            <Form form={form} onFinish={handleEditTile}>
              <Form.Item
                name="newCardName"
                label="Enter name"
                rules={[
                  { required: true, message: "Please enter a Tile name!" },
                ]}
              >
                <Input
                  placeholder="Enter name"
                  value={editedTileName}
                  onChange={(e) => setEditedTileName(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <CustomButton type="primary" htmlType="submit">
                  Done
                </CustomButton>
              </Form.Item>
            </Form>
            {/* <Input
        placeholder="Enter new tile name"
        value={editedTileName}
        onChange={(e) => setEditedTileName(e.target.value)}
      /> */}
          </Modal>
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
                        selectedButtonIndex === index ? "clicked" : ""
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
              <CustomButton type="primary" onClick={moveSchema}>
                Move
              </CustomButton>
            )}
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
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default TilePage;
