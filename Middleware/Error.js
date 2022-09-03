const ErrorResponse = require("../utils/errorResponse");

const errorHandle = (err, req, res, next) => {
  console.log(err.stack.red);
  console.log(err.name);
  if (err.name == "CastError") {
    const message = `Bootcamp Not FOund By Id ${err.value}`;
    error = new ErrorResponse(message, 400);
  }
  if (err.code == 11000) {
    const message = "Duplicate Field value Entered";
    error = new ErrorResponse(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  res
    .status(err.statusCode || 500)
    .json({ success: false, error: err.message || "Server Error" });
};

module.exports = errorHandle;
