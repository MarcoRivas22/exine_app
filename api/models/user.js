import mongoose from "mongoose";

const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [20, "Name must be at most 20 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

//Validator
userSchema.plugin(uniqueValidator, { message: "This email is already taken" });

//Convert to model
const User = mongoose.model("User", userSchema);

export default User;
