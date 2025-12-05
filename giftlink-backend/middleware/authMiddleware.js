// backend: middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // Try Authorization header: "Bearer <token>"
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user id to req for controllers
    req.user = { id: payload.userId || payload.id || payload._id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
}

module.exports = authMiddleware;
