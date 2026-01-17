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

const creativeWorkService = {
 getAIGeneratedData
};

export default creativeWorkService;
