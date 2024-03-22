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
      setUserPermissions(response.data.Data.permissions);
    } else {
    }
  } catch (error) {}
};
export const fetchModules = async (setModules) => {
  try {
    const authToken = localStorage.getItem("AuthorizationToken");

    const response = await axios.get(`${baseURL}/list-available-modules`, {
      headers: {
        Authorization: `${authToken}`,
      },
    });

    if (response.data.status === "success") {
      setModules(response.data.Data.modules);
    } else {
    }
  } catch (error) {}
};
