import apiClient from "../../../common/services/apiClient.js";

const submitWorkCategory = async (data) => {
  const response = await apiClient.post("/CreativeWorks/SaveWorkCategoryInfo", data);
  return response.data;
};  

const getWorkCategoryInfo = async () => {
  const response = await apiClient.get("/CreativeWorks/GetWorkCategory");
  return response.data;
}; 

const deleteWorkCategory = async (id) => {
  const response = await apiClient.post("/CreativeWorks/DeleteWorkCategory?workCategoryId=" + id);
  return response.data;
}; 

const WorkCategoryService = {
  submitWorkCategory,
  getWorkCategoryInfo,
  deleteWorkCategory,
   
};

export default WorkCategoryService;
