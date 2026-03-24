import axiosInstance from "@/Utils/axiosInstance";



// ✅ CREATE TASK
export const createTask = async (data) => {
  const response = await axiosInstance.post("/task/create", {
    title: data.title,
    description: data.description,
    tag: data.priority, // ⚠️ backend expects "tag"
  });

  return response.data;
};

// ✅ GET ALL TASKS (with optional search)
export const getTasks = async (search = "") => {
  const response = await axiosInstance.get(`/task?search=${search}`);
  return response.data;
};

// ✅ GET SINGLE TASK (for edit page)
export const getSingleTask = async (id) => {
  const response = await axiosInstance.get(`/task/${id}`);
  return response.data;
};

// ✅ UPDATE TASK
export const updateTask = async ({ id, data }) => {
  const response = await axiosInstance.patch(`/task/update/${id}`, {
    title: data.title,
    description: data.description,
    tag: data.priority,
  });

  return response.data;
};

// ✅ DELETE TASK
export const deleteTask = async (id) => {
  const response = await axiosInstance.delete(`/task/delete/${id}`); // ✅ include /delete
  return response.data;
};



// export const loginUser = async (formData) => {
//   return await axiosInstance.post("/auth/login", formData);
// };











