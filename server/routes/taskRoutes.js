import express from "express";
// import { clearCache, cacheMiddleware } from "../middlewares/cache.js";
import { createTask } from "../controllers/taskControllers.js";

const router = express.Router();


router.post(
  "/create",
  createTask
);






// router.patch(
//   "/:id/update",
//   verifyAuth,
//   authorizedRoles("admin"),
//   validateFormData(validateRoomSchema),
//   clearCache("rooms"),
//   updateRoom
// );

export default router;
