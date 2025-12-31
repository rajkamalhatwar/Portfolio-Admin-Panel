import apiClient from "../../common/services/apiClient";

const login = async (credentials) => {
  const response = await apiClient.post("/Auth/login", credentials);
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  login,
  logout,
};

export default authService;
