import axios from "axios";
import { baseURL } from "../Components/BaseURLAPI/BaseURLAPI";

export const fetchTilesAndSchemas = async (tilePath) => {
  try {
    const response = await axios.get(
      `${baseURL}/get-all-tile?tilePath=${tilePath}`
    );
    return response.data.Data;
  } catch (error) {
    console.error("Error fetching tiles and schemas:", error);
    return { tiles: [], schemas: [] };
  }
};

export const createCard = async (newCardName, tilePath) => {
  try {
    await axios.post(`${baseURL}/save-tile`, {
      tile_name: newCardName,
      tile_path: tilePath,
    });
    return true;
  } catch (error) {
    console.error("Error creating card:", error);
    return false;
  }
};

export const deleteCard = async (tileName) => {
  try {
    const response = await axios.delete(
      `${baseURL}/delete-tile?tileName=${tileName}`
    );
    console.log(response.data);
    return response.data.Data.tiles;
  } catch (error) {
    console.error("Error in deleting the card:", error);
    return [];
  }
};
export const deleteSchema = async (schema_id) => {
  try {
    const response = await axios.delete(
      `${baseURL}/delete-tile-schema?schema_id=${schema_id}`
    );
    return response.data.Data.schemas;
  } catch (error) {
    console.error("Error in deleting the schema:", error);
    return [];
  }
};
export const moveSchemaToTile = (
  selectedSchemaId,
  selectedTileId,
  handleCloseMoveModal
) => {
  if (selectedSchemaId && selectedTileId) {
    return axios
      .post(
        `${baseURL}/move-tile-schema?schema_id=${selectedSchemaId}&tile_id=${selectedTileId}`
      )
      .then((response) => {
        console.log("Schema moved successfully");
        handleCloseMoveModal();
        return response;
      })
      .catch((error) => {
        console.error("Error moving schema:", error);
        throw error;
      });
  } else {
    console.error("Selected schema or tile is not valid");
  }
};

export const fetchMoveTileData = (setMoveTileData) => {
  return axios
    .get(`${baseURL}/get-all-tile`)
    .then((response) => {
      setMoveTileData(response.data.Data.tiles);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};
export const updateTileNameApi = async (tileId, tileName) => {
  try {
    const response = await axios.post(`${baseURL}/update-tile-name`, {
      tile_id: tileId,
      tile_name: tileName,
    });
    return response.data; // You can modify this based on the response structure
  } catch (error) {
    throw error;
  }
};
