import axios from "axios";
import { baseURL } from "../Components/BaseURLAPI/BaseURLAPI";
import { message } from "antd";
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/login`, {
      email,
      password,
    });
    return response;
  } catch {
    message.error("Invalid Credentials", 3);
  }
};
