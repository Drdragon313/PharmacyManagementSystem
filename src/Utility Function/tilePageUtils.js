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
