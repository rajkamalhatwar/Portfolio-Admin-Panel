import apiClient from "../../common/services/apiClient";

const submitUser = async (data) => {
  const response = await apiClient.post("/UserReg/SaveUser", data);
  return response.data;
};  

const userRegService = {
  submitUser, 
};

export default userRegService;
