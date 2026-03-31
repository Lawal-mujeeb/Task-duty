

import express from "express";
import {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";
import { verifyAuth } from "../middlewares/authenticate.js";

const router = express.Router();

// CREATE a new task
router.post("/create", verifyAuth, createTask);

// GET all tasks (with optional search via query ?search=keyword)
router.get("/", verifyAuth, getTasks);

// GET single task by id (for edit page)
router.get("/:id", verifyAuth, getSingleTask);

// UPDATE a task by id
router.patch("/update/:id", verifyAuth, updateTask);

// DELETE a task by id
router.delete("/delete/:id", verifyAuth, deleteTask);

export default router;



// import express from "express";
// // import { clearCache, cacheMiddleware } from "../middlewares/cache.js";
// import { createTask } from "../controllers/taskControllers.js";

// const router = express.Router();


// router.post(
//   "/create",
//   createTask
// );
// routes/task.routes.js


// router.patch(
//   "/:id/update",
//   verifyAuth,
//   authorizedRoles("admin"),
//   validateFormData(validateRoomSchema),
//   clearCache("rooms"),
//   updateRoom
// );

// export default router;
