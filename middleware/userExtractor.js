const jwt = require("jsonwebtoken");
const { config } = require("./../config/config");

const extractorToken = (req, res, next) => {
  const authorization = req.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, config.secretKey);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  console.log(decodedToken);
  const { id } = decodedToken;
  req.userId = id;
  next();
};

module.exports = { extractorToken };
