import apiClient from "../../common/services/apiClient";

const submitExperiance = async (data) => {
  const response = await apiClient.post("/Experiance/SaveExperianceInfo", data);
  return response.data;
};  

const getExperianceInfo = async () => {
  const response = await apiClient.get("/Experiance/GetExperiance");
  return response.data;
}; 

const deleteExperiance = async (id) => {
  const response = await apiClient.post("/Education/DeleteEducation?educationId=" + id);
  return response.data;
}; 

const experianceService = {
  submitExperiance,
  getExperianceInfo,
   
};

export default experianceService;
