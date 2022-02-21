const jwt = require("jsonwebtoken");

const HttpError = require("../model/http-error");

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // headers and case insensitive
    if (!token) {
      throw new Error("Authentication failed");
    }

    // decoded token have payload which we encoded when creating token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(new HttpError("Authentication failed", 403));
  }
};
