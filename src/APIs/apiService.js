import axios from "axios";
import { BASE_URL } from "./apiConfig";

export const loginUser = (data) => {
  return axios.post(`${BASE_URL}/login`, data);
};
