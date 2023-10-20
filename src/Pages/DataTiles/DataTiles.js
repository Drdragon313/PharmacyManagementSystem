import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DataTiles.css";
import { Modal, Input, Button, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const DataTiles = () => {
  const [tiles, setTiles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCardName, setNewCardName] = useState("");
  useEffect(() => {
    fetchTiles("/");
  }, []);
  const fetchTiles = async (tilePath) => {
    const tilepath = tilePath;
    try {
      const response = await axios.get(
        `http://13.40.195.165:3001/get-all-tile?tilePath=${tilepath}`
      );
      const tilesData = response.data.Data.tiles;
      console.log("API Response:", tilesData);
      setTiles(tilesData);
    } catch (error) {
      console.error("Error fetching tiles:", error);
    }
  };
  const handleCreateCard = async () => {
    try {
      const tilepath = `/`;
      await axios.post("http://13.40.195.165:3001/save-tile", {
        tile_name: newCardName,
        tilepath: tilepath,
      });
      setNewCardName("");
      setModalVisible(false);
      fetchTiles("/");
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };
  console.log("Tiles array contains", tiles);

  return (
    <div>
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
            onCreateCard={handleCreateCard}
            title={tile.TileName}
          >
            <Link to={`/datatiles/${tile.TileName}`}>View Card</Link>
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
      <div className="add-new-tile">
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
    </div>
  );
};

export default DataTiles;
