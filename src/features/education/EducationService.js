import apiClient from "../../common/services/apiClient";

const submitEducation = async (data) => {
  const response = await apiClient.post("/Education/SaveEducationInfo", data);
  return response.data;
};  

const getEductionInfo = async () => {
  const response = await apiClient.get("/Education/GetEducation");
  return response.data;
}; 

const deleteEducation = async (id) => {
  const response = await apiClient.post("/Education/DeleteEducation?educationId=" + id);
  return response.data;
}; 

const educationService = {
  submitEducation, 
  getEductionInfo,
  deleteEducation
};

export default educationService;
