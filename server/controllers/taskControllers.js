// controllers/task.controller.js
import taskService from "../services/task.service.js";
import responseHandler from "../utils/responseHandler.js";
import tryCatchFn from "../utils/tryCatchFn.js";

const { successResponse } = responseHandler;

// ✅ CREATE TASK
export const createTask = tryCatchFn(async (req, res, next) => {
  const task = await taskService.createTask(req.body, next);
  if (!task) return; // stop if service returned error
  return successResponse(res, task, "Task created successfully", 201);
});

// ✅ GET ALL TASKS (with optional search)
export const getTasks = tryCatchFn(async (req, res, next) => {
  const tasks = await taskService.getTasks(req.query, next);
  if (!tasks) return;
  return successResponse(res, tasks, "Tasks fetched successfully");
});

// ✅ GET SINGLE TASK (for edit page)
export const getSingleTask = tryCatchFn(async (req, res, next) => {
  const task = await taskService.getSingleTask(req.params.id, next);
  if (!task) return;
  return successResponse(res, task, "Task fetched successfully");
});

// ✅ UPDATE TASK
export const updateTask = tryCatchFn(async (req, res, next) => {
  const updatedTask = await taskService.updateTask(req.params.id, req.body, next);
  if (!updatedTask) return;
  return successResponse(res, updatedTask, "Task updated successfully");
});

// ✅ DELETE TASK
export const deleteTask = tryCatchFn(async (req, res, next) => {
  const result = await taskService.deleteTask(req.params.id, next);
  if (!result) return;
  return successResponse(res, result, "Task deleted successfully");
});

 



// const createTask = tryCatchFn(async (req, res, next) => {
//   const task = await taskService.createTask(req.body, next);

//   if (!task) return; // only stop if something went wrong

//   return successResponse(res, task, "Task created successfully", 201);
// });