const express = require("express");
require("dotenv").config();
const connectDB = require("./configs/db");

// connect to db
connectDB();

// Express app
const app = express();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// API test
app.get("/", (req, res) => {
  res.send("API working properly...");
});

// Server runner
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.SERVER_PORT}`
  );
});

process.env;
