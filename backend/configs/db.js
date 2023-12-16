const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Successfully connected to DB!");
    })
    .catch((err) => {
      console.log("Error establishing a DB connection!\n");
    });
};

module.exports = connectDB;
