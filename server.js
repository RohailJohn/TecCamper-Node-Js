const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

// Load Env Var
dotenv.config({ path: "./config/config.env" });
const app = express();
const logger = require("./Middleware/logger");

//Route File
const bootcamps = require("./Routes/Bootcamps");

app.use(express.json());
app.use(logger);

const connectDB = require("./config/db");
connectDB();

//Mount Router
app.use("/api/v1/bootcamps", bootcamps);

//Define PORT
const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(
    `Server Running In ${process.env.NODE_ENV} Mode On PORT ${PORT}`.yellow.bold
  );
});

//handle unhandle promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`.red);

  //close server & exit process
  server.close(() => process.exit(1));
});
