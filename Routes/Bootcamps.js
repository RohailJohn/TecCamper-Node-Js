const express = require("express");
const router = express.Router();
const {
  getBootcamp,
  getBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
} = require("../Controllers/Bootcamps");

router.route("/").get(getBootcamp).post(createBootcamps);

router
  .route("/:id")
  .get(getBootcamps)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

//Routes
// router.get("/", (req, res) => {
//   res.status(200).json({ success: true, msg: "Show All Bootcamps" });
// });

// router.get("/:id", (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Show Bootcamps ${req.params.id}` });
// });

// router.post("/", (req, res) => {
//   res.status(200).json({ success: true, msg: "Create A New Bootcamps" });
// });

// router.put("/:id", (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Update Bootcamps ${req.params.id}` });
// });

// router.delete("/:id", (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Delete Bootcamps ${req.params.id}` });
// });

module.exports = router;
