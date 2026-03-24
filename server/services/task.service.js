import Task from "../models/task.js";
import responseHandler from "../utils/responseHandler.js";

const { errorResponse } = responseHandler;

const taskService = {
  // ✅ CREATE TASK
  createTask: async (data, next) => {
    const taskExist = await Task.findOne({ title: data.title });

    if (taskExist) {
      return next(errorResponse("That title of task already exists", 400));
    }

    const task = await Task.create({ ...data });
    return task;
  },

  // ✅ GET ALL TASKS (with SEARCH support)
  getTasks: async (query, next) => {
    const search = query?.search || "";

    const tasks = await Task.find({
      title: { $regex: search, $options: "i" }, // search by title (case-insensitive)
    }).sort({ createdAt: -1 });

    return tasks;
  },

  // ✅ GET SINGLE TASK (for EDIT page)
  getSingleTask: async (id, next) => {
    const task = await Task.findById(id);

    if (!task) {
      return next(errorResponse("Task not found", 404));
    }

    return task;
  },

  // ✅ UPDATE TASK
  updateTask: async (id, taskData, next) => {
    const task = await Task.findById(id);

    if (!task) {
      return next(errorResponse("Task not found", 404));
    }

    // update only fields that exist
    Object.keys(taskData).forEach((key) => {
      if (taskData[key] !== undefined) {
        task[key] = taskData[key];
      }
    });

    const updatedTask = await task.save();
    return updatedTask;
  },

  // ✅ DELETE TASK
  deleteTask: async (id, next) => {
    const task = await Task.findById(id);

    if (!task) {
      return next(errorResponse("Task not found", 404));
    }

    await task.deleteOne();

    return { message: "Task deleted successfully" };
  },
};

export default taskService;