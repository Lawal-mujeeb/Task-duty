import userService from "../services/user.service.js";
import tryCatchFn from "../utils/tryCatchFn.js";
import { createSendToken } from "../utils/token.js";
import responseHandler from "../utils/responseHandler.js";
const { successResponse } = responseHandler;


export const register = tryCatchFn(async (req, res, next) => {
  //req.body handles form collection from the client the req.body is just like calling out userdata  const user = await userService.register(req.body, next);
  //req.validatedData is the data that has passed zods validation received from the req.body
  const user = await userService.register(req.body, next);
  console.log("BODY:", req.body); 
  //handle accessToken generation- we send the user to our createSendToken which extracts the id from the jwt form to sign
  if (!user) return;
  //
  const { accessToken, refreshToken, cookieOptions } = createSendToken(user);
  // send the cookie
  res.cookie("userRefreshToken", refreshToken, cookieOptions);
  return successResponse(res, { accessToken }, "Registration successful", 201);
});
export const login = tryCatchFn(async (req, res, next) => {
  const user = await userService.login(req.body, next);
  if (!user) return;

  const { accessToken, refreshToken, cookieOptions } = createSendToken(user);
  res.cookie("userRefreshToken", refreshToken, cookieOptions);
  return successResponse(res, { accessToken }, "Login succesful", 200);
}); // so we need to export our register and login functions so that we can use them in routes which is our routes

export const authenticateUser = tryCatchFn(async (req, res, next) => {
  const { id: userId } = req.user; //extract user id from request.user  note  //userId = decoded.id from  autheticate.js line 32
  const user = await userService.authenticateUser(userId, next);
  return successResponse(res, user, "User authenticated", 200);
});



export const refreshAccessToken = tryCatchFn(async (req, res, next) => {
  // get the refreshToken from the cookie and send to our userService
  const refreshToken = req.cookies?.userRefreshToken;
  const user = await userService.refreshAccessToken(refreshToken, next);
  if (!user) return;
  const tokenData = createSendToken(user);
  if (!tokenData) return;
  const { accessToken } = tokenData;
  return successResponse(
    res,
    { accessToken },
    "AccessToken refreshed successfully",
    200
  );
});











