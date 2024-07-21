const express = require("express");
const app = express();
require("dotenv").config();
const cron = require("node-cron");
const mongoose = require("mongoose");
const {sendWelcomeEmail} = require("./emailServices/WelcomeEmail")

//TASK Scheduler
const run = () => {
  cron.schedule("*/15 * * * * *", () => {
    console.log("running every 15s");
    sendWelcomeEmail()
  });
};

run();

//DB connection
const DB = process.env.DB; 
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

//app listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Background services is running on port ${PORT}`);
});
