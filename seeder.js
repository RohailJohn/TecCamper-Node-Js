const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Bootcamp = require("./model/Bootcamp");

// Connect To DB
mongoose.connect(process.env.MONGO_URL);

// Read Json File
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// Imported Data to DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Data Imported......".green.inverse);
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
};

// Delete Data From DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data Destoryed......".red.inverse);
  } catch (error) {
    console.log(error);
  }
};

// Giving Cammand In Terminal (node seeder -i or -d)
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
