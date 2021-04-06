const express = require("express");
const auth = require("../middlewares/auth");
const { User, Post } = require("../sequelize");
const router = express.Router();

router.get("/all/json", async (req, res, next) => {
  const person = await User.findAll({
    attributes: ["username", "firstName", "lastName", "email"],
  });

  res.send(person);
});

router.get("/ID:id/json", auth, async (req, res, next) => {
  const person = await User.findOne({
    include: Post,
    where: {
      id: req.params.id,
    },
  });
  console.log(person);
  person ? res.send(person) : res.status(404).end();
});
router.get("/:username/json", async (req, res, next) => {
  const person = await User.findOne({
    attributes: ["username", "firstName", "lastName", "email", "avatar"],
    where: {
      username: req.params.username,
    },
    // include: Post,
  });
  // const personsPosts = await person.getPosts();  // search for relational queries
  // console.log(personsPosts);
  person ? res.send(person) : res.status(404).end();
});

router.get("/:id/posts/json", auth, async (req, res, next) => {
  const posts = await Post.findAll({
    where: {
      author: req.params.id,
    },
  });

  posts ? res.send(posts) : res.status(404).end();
});

router.put("/:id", auth, async (req, res) => {
  const person = req.user;
  try {
    if (person) {
      const updateUser = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send(updateUser);
    } else {
      res.send("user is not found");
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const person = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (person) {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      }).then(res.send("account is succesfully deleted"));
    } else {
      res.send("User is not found");
      res.status(404).end();
    }
  } catch (err) {
    console.err(err);
  }
});

module.exports = router;
