const express = require("express");
const { User } = require("../sequelize");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    const checkUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (checkUser) {
      res.status(400);
      res.send("! Email is already registered. !");
    } else {
      const passwordHash = await bcrypt.hash(password, 12);
      // hash the password then, crate new user with it.

      const newUser = await User.create({
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: passwordHash,
      });
      res.send(newUser);
    }
  } catch (err) {
    res.status(500).end();
    console.log(err);
  }
});

module.exports = router;
