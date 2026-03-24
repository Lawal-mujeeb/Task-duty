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
      enum: ["low", "urgent", "important"], 
      default: "low",
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || model("Task", taskSchema);

export default Task;