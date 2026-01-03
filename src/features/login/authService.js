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

// ✅ GET user by ID
const getUserById = async (userId) => {
  const response = await apiClient.get(`/UserReg/GetUserById/${userId}`);
  return response.data.getUsersById[0];
};

const authService = {
  login,
  logout,
  getUserById,
};

export default authService;
