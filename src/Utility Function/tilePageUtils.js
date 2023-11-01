import axios from "axios";

export const fetchTiles = async (tilePath) => {
  try {
    const response = await axios.get(
      `http://13.40.195.165:3001/get-all-tile?tilePath=${tilePath}`
    );
    return response.data.Data.tiles;
  } catch (error) {
    console.error("Error fetching tiles:", error);
    return [];
  }
};
export const createCard = async (newCardName, tilePath) => {
  try {
    await axios.post("http://13.40.195.165:3001/save-tile", {
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
      `http://13.40.195.165:3001/delete-tile?tileName=${tileName}`
    );
    return response.data.Data.tiles;
  } catch (error) {
    console.error("Error in deleting the card:", error);
    return [];
  }
};
