const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../sequelize");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  const userFromDb = await User.findOne({
    attributes: {
      include: ["password"],
    },
    where: {
      email: email,
    },
  });
  const passwordCorrect =
    userFromDb === null
      ? false
      : await bcrypt.compare(password, userFromDb.password);

  if (!(userFromDb && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid email or password",
    });
  }
  const userForToken = {
    id: userFromDb.id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: "28d",
  });

  res.status(200).send({
    token,
    id: userFromDb.id,
    username: userFromDb.username,
    email: userFromDb.email,
  });
});

module.exports = router;
