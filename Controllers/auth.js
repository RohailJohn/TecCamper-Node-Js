const asyncHandle = require("../Middleware/async");
const User = require("../model/User");

//  @desc Register User
//  @route Post api/v1/auth
//  @access Public

exports.register = asyncHandle(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //   create User
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(200).json({ success: true });
});
