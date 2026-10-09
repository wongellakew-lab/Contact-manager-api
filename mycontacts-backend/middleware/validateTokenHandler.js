const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const authHeader = req.get("authorization");
  const match = authHeader?.match(/^Bearer\s+(\S+)$/i);

  if (!match) {
    return res
      .status(401)
      .json({ message: "A valid Bearer token is required" });
  }

  try {
    const decoded = jwt.verify(match[1], process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "User is not authorized" });
  }
};
module.exports = validateToken;
