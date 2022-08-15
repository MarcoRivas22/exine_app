import moongoose from "mongoose";

const uniqueValidator = require("mongoose-unique-validator");

const Schema = moongoose.Schema;

const deviceSchema = new Schema({
  userId: { type: String, required: true },
  dId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  selected: { type: Boolean, required: true, default: false },
  templateId: { type: String, required: true },
  templateName: { type: String, required: true },
  createdTime: { type: Number },
});

//Validator
deviceSchema.plugin(uniqueValidator, {
  message: "Error: This device is already taken.",
});

//Schema to model
const Device = moongoose.model("Device", deviceSchema);

module.exports = Device;
