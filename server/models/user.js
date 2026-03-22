import mongoose, { Schema, model } from "mongoose";


const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true, 
      maxlength: [50, "Full name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email name is required"],
      trim: true,
      lowercase: true,
      unique: true, 
    },
    password: {
      type: String,
      required: [true, "Password  is required"],
      select: false,
    },
    
    avatar: {
      type: String,
      default: "",
    },
    avatarId: {
      // use to track the image from claudineri through the id
      type: String, //filed is to track the id attached to our avatar url from cloudinary
    },
    
  },
  {
    
    timestamps: true,
  }
);

const User = mongoose.models.User || model("User", userSchema); 
export default User;

