import apiClient from "../../common/services/apiClient";

const login = async (credentials) => {
  const response = await apiClient.post("/Auth/login", credentials);
  return response.data;
}; 

const logout= async () => {
  //const response = await apiClient.post("/Auth/logout", credentials);
  localStorage.removeItem("token");
  // return response.data; 
};

const authService = {
  login,
  logout,
};

export default authService;
