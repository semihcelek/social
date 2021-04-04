const express = require("express");
const auth = require("../middlewares/auth");
const { Post, User } = require("../sequelize");

const router = express.Router();

router.get("/all/json", async (req, res) => {
  try {
    const post = await Post.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.send(post);
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id/json", async (req, res) => {
  try {
    const post = await Post.findOne({
      include: User,
      where: {
        id: req.params.id,
      },
    });
    post ? res.send(post) : res.status(404).end();
  } catch (err) {
    console.error(err);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const person = req.user;

    if (person) {
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        author: person.id,
      });
      res.send(newPost);
    } else {
      res.send("not authorized");
      res.status(401).end();
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  console.log(`Im now deleting the ${req.params.id}`);
  const byeBye = await Post.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send(byeBye);
});

module.exports = router;
