const express = require("express");
require("dotenv").config();
const connectDB = require("./configs/db");
// const bodyParser = require("body-parser");
const participantRoutes = require("./routes/participantRoutes");
const { notFound, errorHandler } = require("./utils/errors");

// connect to db
connectDB();

// Express app
const app = express();

// Middleware
app.use(express.json());
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// API test
app.get("/", (req, res) => {
  res.send("API working properly...");
});

// Routes
app.use("/api/participants", participantRoutes);

// Errors handling
app.use(notFound);
app.use(errorHandler);

// Server runner
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.SERVER_PORT}`
  );
});

process.env;
