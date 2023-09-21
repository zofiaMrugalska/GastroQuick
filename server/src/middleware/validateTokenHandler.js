const jwt = require("jsonwebtoken");
const blacklist = require("../services/blacklist");

const validateToken = async (req, res, next) => {
  //dekonstrukcja tokenu do autoryzacji
  let token;

  // console.log(req.headers, "header");

  try {
    let authHeader = req.headers.Authorization || req.headers.authorization;
    // console.log(authHeader, "authheader");

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];

      console.log(token, "token middelware");

      //sparwdzenie czy token jest na czarnej liscie
      if (blacklist.isBlacklisted(token)) {
        return res.status(401).json({ message: "Token has been revoked" });
      }

      console.log(token, "token z validate token");

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "user is not authorized" });
        }
        req.token = token;
        req.user = decoded.user;
        next();
      });
    } else {
      res.stus(401).json({ message: "user is not authorized or token is missing" });
    }
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = validateToken;
