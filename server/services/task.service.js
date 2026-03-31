import Task from "../models/task.js";
import responseHandler from "../utils/responseHandler.js";
const { errorResponse } = responseHandler;

const taskService = {
  // ✅ CREATE TASK
  createTask: async (data, userId, next) => {
    const taskExist = await Task.findOne({ title: data.title, owner: userId });
    if (taskExist) return next(errorResponse("You already have a task with this title", 400));

    const task = await Task.create({
      title: data.title,
      description: data.description,
      priority: data.priority,
         owner: userId, // 🔐 assign owner
    });

    return task;
  },

  // ✅ GET ALL TASKS FOR LOGGED-IN USER
  getTasks: async (userId, query, next) => {
    const search = query?.search || "";
    const tasks = await Task.find({
      owner: userId, // 🔐 only fetch tasks of this user
      title: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });

    return tasks;
  },

  // ✅ GET SINGLE TASK (ONLY IF OWNER)
  getSingleTask: async (id, userId, next) => {
    const task = await Task.findOne({ _id: id, owner: userId }); // 🔐
    if (!task) return next(errorResponse("Task not found or unauthorized", 404));
    return task;
  },

  // ✅ UPDATE TASK (ONLY IF OWNER)
  updateTask: async (id, userId, taskData, next) => {
    const task = await Task.findOne({ _id: id, owner: userId }); // 🔐
    if (!task) return next(errorResponse("Task not found or unauthorized", 404));

    if (taskData.title !== undefined) task.title = taskData.title;
    if (taskData.description !== undefined) task.description = taskData.description;
    if (taskData.priority !== undefined) task.priority = taskData.priority;

    return await task.save();
  },

  // ✅ DELETE TASK (ONLY IF OWNER)
  deleteTask: async (id, userId, next) => {
    const task = await Task.findOne({ _id: id, owner: userId }); // 🔐
    if (!task) return next(errorResponse("Task not found or unauthorized", 404));

    await task.deleteOne();
    return { message: "Task deleted successfully" };
  },
};

export default taskService;

// import Task from "../models/task.js";
// import responseHandler from "../utils/responseHandler.js";

// const { errorResponse } = responseHandler;

// const taskService = {
//   // ✅ CREATE TASK
//   createTask: async (data,  next) => {
//     const taskExist = await Task.findOne({
//       title: data.title,
      
//     });

//     if (taskExist) {
//       return next(errorResponse("That title of task already exists", 400));
//     }

//     const task = await Task.create({
//       title: data.title,
//       description: data.description,
//       priority: data.priority,
    
//     });

//     return task;
//   },

//   // ✅ GET ALL TASKS (ONLY LOGGED-IN USER'S TASKS)
//   getTasks: async (query, next) => {
//     const search = query?.search || "";

//     const tasks = await Task.find({
//       title: { $regex: search, $options: "i" },
//     }).sort({ createdAt: -1 });

//     return tasks;
//   },

//   // ✅ GET SINGLE TASK (ONLY IF OWNER)
//   getSingleTask: async (id, next) => {
//     const task = await Task.findOne({
//       _id: id,
     
//     });

//     if (!task) {
//       return next(errorResponse("Task not found or unauthorized", 404));
//     }

//     return task;
//   },

//   // ✅ UPDATE TASK (ONLY IF OWNER)
//   updateTask: async (id, taskData,  next) => {
//     const task = await Task.findOne({
//       _id: id,
//     });

//     if (!task) {
//       return next(errorResponse("Task not found or unauthorized", 404));
//     }

//     // update allowed fields only
//     if (taskData.title !== undefined) task.title = taskData.title;
//     if (taskData.description !== undefined) task.description = taskData.description;
//     if (taskData.priority !== undefined) task.priority = taskData.priority;

//     const updatedTask = await task.save();
//     return updatedTask;
//   },

//   // ✅ DELETE TASK (ONLY IF OWNER)
//   deleteTask: async (id,  next) => {
//     const task = await Task.findOne({
//       _id: id,
//     });

//     if (!task) {
//       return next(errorResponse("Task not found or unauthorized", 404));
//     }

//     await task.deleteOne();

//     return { message: "Task deleted successfully" };
//   },
// };

// export default taskService;

