import apiClient from "../../../common/services/apiClient";

// const getAIGeneratedData = async (formData) => {
//   const response = await apiClient.post("/AI/generate-portfolio-content", formData);
//   return response.data;
// };   

const getAIGeneratedData = async (formData) => {
  const response = await apiClient.post(
    "/AI/generate-portfolio-content",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: (data) => data, // 🔑 STOP axios from transforming
    }
  );

  return response.data;
};

const getCreativeWorkInfo = async () => {
  const response = await apiClient.get("/CreativeWorks/GetCreativeWork");
  return response.data;
}; 

const submitCreativeWork = async (data) => {
  const response = await apiClient.post("/CreativeWorks/SaveCreativeWorkInfo", data);
  return response.data;
};  

const deleteCreativeWork = async (id) => {
  const response = await apiClient.post("/CreativeWorks/DeleteCreativeWork?creativeWorkId=" + id);
  return response.data;
}; 

const creativeWorkService = {
 getAIGeneratedData,getCreativeWorkInfo,submitCreativeWork,deleteCreativeWork
};

export default creativeWorkService;
