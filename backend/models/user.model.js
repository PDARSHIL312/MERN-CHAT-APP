import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: "string",
      required: true,
    },
    username: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
      minlength: 6,
    },
    gender: {
      type: "string",
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: "string",
      default: "",
    },
  },
  {
    timestamps: true, // so basically it will add the timestamp createdAt and UpdatedAt fields into the Schema..
  }
);

const User = mongoose.model("User", userSchema);

export default User;
