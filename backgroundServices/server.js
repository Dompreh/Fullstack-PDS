const express = require("express");
const app = express();
require("dotenv").config();
const cron = require("node-cron");
const mongoose = require("mongoose");

//TASK Scheduler
const run = () => {
  cron.schedule("* * * * *", () => {
    console.log("running every minute");
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

//aop listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Background services is running on port ${PORT}`);
});
