import mongoose, { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["Urgent", "Important"],
      default: "Urgent",
    },
     owner: {
      type: Schema.Types.ObjectId, // reference to User
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || model("Task", taskSchema);

export default Task;