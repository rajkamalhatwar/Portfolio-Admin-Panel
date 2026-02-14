import authService from "../../login/authService";

export const userRegLoader = async () => { 
  try {
    const userData = await authService.getUserById();
    return userData || [];
  } catch (error) {
    console.error("Loader Error:", error);
    return null;
  }
};
