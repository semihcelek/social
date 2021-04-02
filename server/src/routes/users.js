const express = require("express");
const { User } = require("../sequelize");
const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const user = await User.findAll();

  res.send(user);
});

module.exports = router;
