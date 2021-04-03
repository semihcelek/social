const jwt = require("jsonwebtoken");
const { User } = require("../sequelize");

module.exports = auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next({
      message: "You need to be logged in to visit this route",
      statusCode: 401,
    });
  }
  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const person = await User.findOne({
      where: {
        id: decoded.id,
      },
    });

    req.user = person;
    next();
  } catch (err) {
    console.log(err);
    next({
      message: "You need to be logged in to visit this route",
      statusCode: 401,
    });
  }
};
