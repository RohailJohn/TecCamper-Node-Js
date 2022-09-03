const Bootcamp = require("../model/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandle = require("../Middleware/async");
const geocoder = require("../utils/geocoder");

// @desc Get All BootCamps
// @Routes Get /api/v1/bootcamps
// @Access Public

exports.getBootcamp = asyncHandle(async (req, res, next) => {
  let query;
  // let queryStr = JSON.stringify(req.params);
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  console.log(queryStr);
  query = Bootcamp.find(JSON.parse(queryStr));

  const bootcamps = await query;
  res
    .status(200)
    .json({ suceess: true, count: bootcamps.lenght, data: bootcamps });
  // const bootcamp = await Bootcamp.find(req.query);
  // console.log(bootcamp);
  // res
  //   .status(200)
  //   .json({ success: true, count: bootcamp.lenght, data: bootcamp });
});

// @desc Get Single BootCamps
// @Routes Get /api/v1/bootcamps/:id
// @Access Public

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    res.status(400).json({ success: true, data: bootcamp });
    if (!bootcamp) {
      // return res.status(400).json({ success: false });
      next(
        new ErrorResponse(`Bootcamp not found with Id ${req.params.id} `, 400)
      );
    }
  } catch (error) {
    // res.status(200).json({ success: false });
    next(error);
    next(
      new ErrorResponse(`Bootcamp not found with Id ${req.params.id} `, 400)
    );
  }
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

exports.updateBootcamps = async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    newvalidation: true,
  });
  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data: bootcamp });
};

// @desc Delete BootCamps
// @Routes Delete /api/v1/bootcamps
// @Access Private

exports.deleteBootcamps = async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data: bootcamp });
};

// exports.getBootcampsInRadius = asyncHandle(async (req, res, next) => {
//   const { zipcode, distance } = req.params;
//   console.log(zipcode);
//   // // Get lat/lng from geocoder
//   const loc = await geocoder.geocode(zipcode);
//   const lat = loc[0].latitude;
//   const lng = loc[0].longitude;

//   // Calc radius using radius
//   // Divide dist by radius of Earth
//   // Earth Radius = 3,963 mi / 6,378 km
//   const radius = distance / 3963;

//   const bootcamps = await Bootcamp.find({
//     location: { $geocoder: { $centerSphere: [[lng, lat], radius] } },
//   });

//   res.status(200).json({
//     success: true,
//     // count: bootcamps.lenght,
//     // data: bootcamps,
//   });
// });

// @desc      Get bootcamps within a radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private

exports.getBootcampsInRadius = asyncHandle(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
