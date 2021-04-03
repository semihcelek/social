const express = require("express");
const auth = require("../middlewares/auth");
const { User } = require("../sequelize");
const router = express.Router();

router.get("/all/json", async (req, res, next) => {
  const person = await User.findAll({
    attributes: ["username", "firstName", "lastName", "email"],
  });

  res.send(person);
});

router.get("/:id/json", auth, async (req, res, next) => {
  const person = await User.findOne({
    // include: posts,
    where: {
      id: req.params.id,
    },
  });
  console.log(person);
  person ? res.send(person) : res.status(404).end();
});

module.exports = router;
