import client from "../utils/ApiClient";
import endPoints from "./endPoints";

export const login = async (credentials) => {
  const response = await client.post(endPoints.login, credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await client.post(endPoints.register, userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export default {
  login,
  register,
  logout,
};
