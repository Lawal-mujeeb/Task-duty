import Task from "../models/task.js";
import responseHandler from "../utils/responseHandler.js";

const { errorResponse } = responseHandler;


const taskService = {
  createTask: async (data, next) => {
    const taskExist = await Task.findOne({ title: data.title });
    if (taskExist) {
      return next(errorResponse("That title of task already exists", 400));
    }
    const task = await Task.create({ ...data });
    return task;
  },
  updateTask: async (Id, taskData, next) => {
      const task = await Task.findById(Id);
      if (!task) {
        return next(errorResponse("Task not found", 404));
      }

      // we are looping through fields and only update if value exists
      for (const [key, value] of Object.entries(taskData)) {
        if (value) {
          task[key] = value;
        }
      }
      const updatedTask = await task.save();
      return updatedTask;
    } 
  
};

export default taskService;