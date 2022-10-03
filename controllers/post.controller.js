const postRouter = require("express").Router();
const Post = require("./../models/post.model");
const User = require("./../models/user.model");

const { extractorToken } = require("./../middleware/userExtractor");

postRouter.get("/", extractorToken, async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    console.log(posts);
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

postRouter.post("/", extractorToken, async (req, res, next) => {
  try {
    const { body, userId } = req;
    const { content } = body;
    console.log(body, userId);

    const user = await User.findById(userId);

    const post = new Post({
      content,
      date: new Date(),
      user: user._id,
    });

    const savedPost = await post.save();
    user.posts = user.posts.concat(savedPost._id);
    await user.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
});

module.exports = postRouter;
