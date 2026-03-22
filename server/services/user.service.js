import bcrypt from "bcryptjs";
import User from "../models/user.js";
import responseHandler from "../utils/responseHandler.js";

// import responseHandler from "../utils/responseHandler.js";
import jwt from "jsonwebtoken"; //importing jwt to help us generate our token
const { errorResponse } = responseHandler;


// the full  email and sort we are calling it a parameter called userData and the next is going to call the error response or not foundresponse either one
const userService = {
  register: async (userData, next) => {
    //check if email already exist , it is going to check the email in the database againsnst the email in the userdata form
    const emailExist = await User.findOne({ email: userData.email });
    if (emailExist) {
      return next(errorResponse("Email already exist", 400)); //next is the messanger calls back our error response
    }
    
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    //proceed to create our user
    const user = await User.create({
      ...userData, //this includes all user data
      password: hashedPassword,
    });
    //if user could not be registered , then we send server error
    if (!user) {
      return next(errorResponse("User registration failed"));
    }
    return user; // send user to our controller
  },
  //login user
  login: async (userData, next) => {
    //find user with email from the form also .. password
    const user = await User.findOne({ email: userData.email }).select(
      "+password"
    ); //select includes the field we want to  have access to , in this case the password
    if (!user) {
      return next(errorResponse("Account not found", 401));
    }
    //handle password we are going to use bcrypt to compare the password from the form with the passoword in the database
    const isPasswordCorrect = await bcrypt.compare(
      userData.password,
      user.password
    ); //userData.password is from the form, while user.password is the password saved about the user in the database
    if (!isPasswordCorrect) {
      return next(errorResponse("Incorrect email or password", 401));
    }
    return user; // return user to our controller so we can use it in our controller
  },


  }

export default userService;
