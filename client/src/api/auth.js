import axiosInstance from "../Utils/axiosInstance";

export const registerUser = async (formData) => {
  return await axiosInstance.post("/auth/create", formData);
};

export const loginUser = async (formData) => {
  return await axiosInstance.post("/auth/login", formData);
      
};

