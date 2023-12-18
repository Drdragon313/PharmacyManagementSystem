import axios from "axios";
import { baseURL } from "../Components/BaseURLAPI/BaseURLAPI";

export const fetchUserPermissions = async (setUserPermissions) => {
  try {
    const authToken = localStorage.getItem("AuthorizationToken");
    const headers = { Authorization: authToken };
    const response = await axios.get(`${baseURL}/user-permissions`, {
      headers,
    });

    if (response.data.status === "success") {
      setUserPermissions(response.data.Data.permissions); // Access permissions under Data key
    } else {
      // Handle error, show a message, etc.
    }
  } catch (error) {
    // Handle error, show a message, etc.
  }
};
export const fetchModules = async (setModules) => {
  try {
    const response = await axios.get(`${baseURL}/list-available-modules`);

    if (response.data.status === "success") {
      setModules(response.data.Data.modules); // Access modules under Data key
    } else {
      // Handle error, show a message, etc.
    }
  } catch (error) {
    // Handle error, show a message, etc.
  }
};
