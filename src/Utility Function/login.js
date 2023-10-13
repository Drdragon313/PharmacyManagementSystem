import axios from "axios";
export const login = async (email, password, port) => {
  try {
    const response = await axios.post(`http://13.40.195.165:${port}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
