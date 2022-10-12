import { timeStamp } from "console";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      default: "user",
    },
    root: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: "string",
      default:
        "https://res.cloudinary.com/dxfiq0rpz/image/upload/v1665247243/samples/avatar/avatar_gwyp3r.jpg",
    },
  },
  { timestamps: true }
);

const dataSet = mongoose.models.user || mongoose.model("user", userSchema);

export default dataSet;
