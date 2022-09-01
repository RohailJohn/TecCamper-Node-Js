const Bootcamp = require("../model/Bootcamp");

// @desc Get All BootCamps
// @Routes Get /api/v1/bootcamps
// @Access Public

exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show All Bootcamps" });
};

// @desc Get Single BootCamps
// @Routes Get /api/v1/bootcamps/:id
// @Access Public

exports.getBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show Bootcamps ${req.params.id}` });
};

// @desc Create A New BootCamps
// @Routes Post /api/v1/bootcamps
// @Access Private

exports.createBootcamps = async (req, res, next) => {
  console.log(req.body);
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc Update BootCamps
// @Routes Put /api/v1/bootcamps
// @Access Private

exports.updateBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update Bootcamps ${req.params.id}` });
};

// @desc Delete BootCamps
// @Routes Delete /api/v1/bootcamps
// @Access Private

exports.deleteBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
};
