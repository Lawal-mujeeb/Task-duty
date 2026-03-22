import taskService from "../services/task.service.js";
import responseHandler from "../utils/responseHandler.js";
import tryCatchFn from "../utils/tryCatchFn.js";


const { successResponse } = responseHandler;

export const createTask = tryCatchFn(async (req, res, next) => {
  const task = await taskService.createTask(req.body, next);
  if (task) return;
  return successResponse(res, task, "task created", 201);
});

 



// const createTask = tryCatchFn(async (req, res, next) => {
//   const task = await taskService.createTask(req.body, next);

//   if (!task) return; // only stop if something went wrong

//   return successResponse(res, task, "Task created successfully", 201);
// });