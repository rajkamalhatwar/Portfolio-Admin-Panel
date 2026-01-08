import apiClient from "../../common/services/apiClient";

const submitProject = async (data) => {
  const response = await apiClient.post("/Project/SaveProjectInfo", data);
  return response.data;
};  

const getProjectInfo = async () => {
  const response = await apiClient.get("/Project/GetProjects");
  return response.data;
}; 

const deleteProject = async (id) => {
  const response = await apiClient.post("/Project/DeleteProject?projectId=" + id);
  return response.data;
}; 

const projectService = {
  submitProject,
  getProjectInfo,
  deleteProject, 
};

export default projectService;
