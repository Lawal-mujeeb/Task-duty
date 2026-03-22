import mongoose, { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    tag: {
      type: String,
      enum: ["low", "urgent ", "important "],
    },
  },
  { timestamps: true }
);
const Task = mongoose.models.Task || model("Task", noteSchema);
export default Task;