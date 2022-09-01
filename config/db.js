const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);
  console.log(`MongoDB Connect : ${conn.connection.host}`.blue.bold);
};

module.exports = connectDB;
