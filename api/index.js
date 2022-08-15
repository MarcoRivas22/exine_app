//requires
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");

require("dotenv").config();

//instances
const app = express();

//express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());

//express routes
app.use("/api", require("./routes/devices.js"));
app.use("/api", require("./routes/users.js"));
app.use("/api", require("./routes/templates.js"));
app.use("/api", require("./routes/webhooks.js"));
app.use("/api", require("./routes/emqxapi.js"));
app.use("/api", require("./routes/alarms.js"));
app.use("/api", require("./routes/dataprovider.js"));

module.exports = app;

//listener
app.listen(process.env.API_PORT, () => {
  console.log("listening on port ".green + process.env.API_PORT.green);
});

//Mongo connection
const mongoUserName = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoDatabase = process.env.MONGO_DATABASE;

const uri = `mongodb://${mongoUserName}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`;
// uri = "mongodb://devuser:devpassword@localhost:27017/iotgl";

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  authSource: "admin",
};

mongoose
  .connect(uri, options)
  .then(() => {
    console.log("\n");
    console.log("******************************".green);
    console.log("MongoDB connected successfully".green);
    console.log("******************************".green);
    console.log("\n");
    global.check_mqtt_superuser();
  })
  .catch((err) => {
    console.log("\n");
    console.log("******************************".red);
    console.log(err.message.red);
    console.log("******************************".red);
    console.log("\n");
  });
