import { z } from "zod";


export const validateLoginSchema = z.object({
  email: z.string().min(10,{
    message: "Invalid email address",
  }),
  
  password: z.string().min(8, {
    message: "password must be at least 8 characters long",
  }),


});


// Register Schema
export const validateRegisterSchema = z.object({
  fullname: z.string().min(4, {
    message: "Fullname must be at least 4 characters long",
  }),
  email: z.string().min(10,{
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});