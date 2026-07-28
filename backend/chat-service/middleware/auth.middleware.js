const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Extract JWT
    const token = authHeader.split(" ")[1];

    console.log("Extracted Token:", token);

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //console.log("Decoded JWT:", decoded);

    // Save decoded user
    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);

    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;