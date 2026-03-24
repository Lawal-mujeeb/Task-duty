
import express from "express";
import {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";

const router = express.Router();

// CREATE a new task
router.post("/create", createTask);

// GET all tasks (with optional search via query ?search=keyword)
router.get("/", getTasks);

// GET single task by id (for edit page)
router.get("/:id", getSingleTask);

// UPDATE a task by id
router.patch("/update/:id", updateTask);

// DELETE a task by id
router.delete("/delete/:id", deleteTask);

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
