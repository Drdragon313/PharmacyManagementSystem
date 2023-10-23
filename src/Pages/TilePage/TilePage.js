import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Input, Button, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import {
  createCard,
  deleteCard,
  fetchTiles,
} from "../../Utility Function/tilePageUtils";
import "./TilePage.css";

const TilePage = () => {
  const [path, setPath] = useState([""]);
  const [tiles, setTiles] = useState([]);
  const [newCardName, setNewCardName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [breadcrumbPath, setBreadcrumbPath] = useState(["Home"]);

  const getPath = () => {
    if (path.length === 1) {
      return "/";
    } else return path.join(`/`);
  };

  useEffect(() => {
    fetchTiles(getPath());
  }, [path]);

  const fetchTiles = async (tile_path) => {
    try {
      const response = await axios.get(
        `http://13.40.195.165:3001/get-all-tile?tilePath=${tile_path}`
      );
      const tilesData = response.data.Data.tiles;
      setTiles(tilesData);
    } catch (error) {
      console.error("Error fetching tiles:", error);
    }
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
      setModalVisible(false);
      fetchTiles(getPath());
    }
  };
  const handleDeleteCard = async (tileName) => {
    const updatedTilesData = await deleteCard(tileName);
    if (updatedTilesData) {
      setTiles(updatedTilesData);
    }
  };
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
          You can choose from the options given flow for which you want to
          upload data.
        </p>
      </div>

      <div className="allcards">
        {tiles.map((tile, index) => (
          <Card
            className="tilecards"
            key={index}
            bordered={true}
            title={tile.TileName}
            onClick={() => handleTileClick(tile.TileName)}
          >
            <div className="buttons">
              <Button
                type="primary"
                onClick={() => handleDeleteCard(tile.TileName)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
        <Modal
          open={modalVisible}
          title="Create New Card"
          onOk={handleCreateCard}
          onCancel={() => {
            setNewCardName("");
            setModalVisible(false);
          }}
        >
          <Input
            placeholder="Enter name"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
          />
        </Modal>
      </div>
      <Button
        shape="circle"
        icon={<PlusOutlined />}
        size="large"
        className="new-card-btn"
        onClick={() => setModalVisible(true)}
      ></Button>
      <Button className="create-new-tile-btn-txt" type="link">
        ADD NEW DATA TILE
      </Button>
    </div>
  );
};
export default TilePage;
