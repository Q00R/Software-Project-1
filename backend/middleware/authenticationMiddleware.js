// Just a copy of Donia's
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const userModel = require("../models/userModel");

module.exports = function authenticationMiddleware(req, res, next) {
  const cookie = req.cookies;
  
  // console.log(req.headers);

  if (!cookie) {
    return res.status(401).json({ message: "No Cookie provided" });
  }
  const token = cookie.token;
  if (!token) {
    return res.status(405).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Attach the decoded user ID to the request object for further use
    
    req.user = decoded.user;
    console.log("authenticationMiddleware: req.user: ", req.user);
    return next();
  });
};