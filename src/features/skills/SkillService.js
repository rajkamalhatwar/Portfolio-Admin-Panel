import apiClient from "../../common/services/apiClient";

const submitSkill = async (data) => {
  const response = await apiClient.post("/Education/SaveSkillInfo", data);
  return response.data;
};  

const getSkillInfo = async () => {
  const response = await apiClient.get("/Education/GetSkills");
  return response.data;
}; 

const deleteSkill = async (id) => {
  const response = await apiClient.post("/Education/DeleteSkill?skillId=" + id);
  return response.data;
}; 

const skillService = {
  submitSkill,
  getSkillInfo,
  deleteSkill,
 
};

export default skillService;
