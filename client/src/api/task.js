import axiosInstance from "@/Utils/axiosInstance";
import { headers } from "@/Utils/constants";


// ✅ CREATE TASK
export const createTask = async (data, accessToken) => {
  const response = await axiosInstance.post("/task/create", {
    title: data.title,
    description: data.description,
   priority: data.priority, // ⚠️ backend expects "tag"
  }, headers(accessToken));

  return response.data;
};

// ✅ GET ALL TASKS (with optional search)
export const getTasks = async (search = "", accessToken) => {
  const response = await axiosInstance.get(`/task?search=${search}`, headers(accessToken));
  return response.data;
};

// ✅ GET SINGLE TASK (for edit page)
export const getSingleTask = async (id, accessToken) => {
  const response = await axiosInstance.get(`/task/${id}`, headers(accessToken));
  return response.data;
};

// ✅ UPDATE TASK
export const updateTask = async ({ id, data }, accessToken) => {
  const response = await axiosInstance.patch(`/task/update/${id}`, {
    title: data.title,
    description: data.description,
   priority: data.priority,
  }, headers(accessToken));

  return response.data;
};

// ✅ DELETE TASK
export const deleteTask = async (id, accessToken) => {
  const response = await axiosInstance.delete(`/task/delete/${id}`, headers(accessToken));
  return response.data;
};



// export const loginUser = async (formData) => {
//   return await axiosInstance.post("/auth/login", formData);
// };











