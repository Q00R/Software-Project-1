module.exports= function authorizationMiddleware(roles) {
  const jwt = require('jsonwebtoken');
  return (req, res, next) => {
    // check if there is a jwt token in the cookies
    if (!req.cookies.token) return res.status(401).json("unauthorized access");
    const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    const userRole = decoded.user.role;
    if (!roles.includes(userRole))
      return res.status(403).json("unauthorized access");
    // console.log('authormid')
    next();
  };
}