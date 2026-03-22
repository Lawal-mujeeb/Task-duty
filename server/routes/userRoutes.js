import express from "express";
import {
  register,
  login,

//   refreshAccessToken,
} from "../controllers/userControllers.js";
import { validateFormData } from "../middlewares/validateForm.js";
import {
  validateLoginSchema,
  validateRegisterSchema,
} from "../utils/dataSchema.js";
// import { verifyAuth } from "../middlewares/authenticate.js";
// import { authenticateUser } from "../controllers/userControllers.js";

// import { rateLimiter, refreshTokenLimit } from "../middlewares/rateLimit.js";
// import { cacheMiddleware } from "../middlewares/cache.js";

const router = express.Router();
// all form are post method, it here we are to specify the type of method and our endpoint name - before we can register we need to pass a middleware which is th validateFormData
router.post("/create", register); // when we do the /create we run the middleware validateFormData(validateSignUpSchema) before it goest to the register fucntion which is called by next
router.post(
  "/login",
//   rateLimiter,
  validateFormData(validateLoginSchema),
  login
);



export default router;
