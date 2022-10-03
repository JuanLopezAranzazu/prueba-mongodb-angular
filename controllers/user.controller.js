const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("./../models/user.model");

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate("posts", {
      content: 1,
      date: 1,
    });
    console.log(users);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { name, username, password, tags } = body;
    console.log(body);

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      username,
      password: passwordHash,
      tags,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
