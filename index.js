const express = require("express");
const app = express();

const cors = require("cors");

const { config } = require("./config/config");
const handleErrors = require("./middleware/handleErrors");
const port = config.port;

require("./mongo");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userController = require("./controllers/user.controller");
const authController = require("./controllers/auth.controller");
const postController = require("./controllers/post.controller");

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/api/v1/users", userController);
app.use("/api/v1/auth", authController);
app.use("/api/v1/posts", postController);
app.use(handleErrors);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
