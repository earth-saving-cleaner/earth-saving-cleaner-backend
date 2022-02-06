const jwt = require("../services/jwt");
const { resultMsg } = require("../constants");

const authJWT = (req, res, next) => {
  const unauthorizedResult = {
    result: resultMsg.unauthorized,
  };

  if (!req.headers.authorization) return res.status(401).json(unauthorizedResult);

  const token = req.headers.authorization.split("Bearer ")[1];

  try {
    const myToken = await jwt.verify(token);

    if (myToken.result.ok) {
      req.id = myToken.id;
      req.email = myToken.email;
      next();
    } else {
      return res.status(401).json(unauthorizedResult);
    }
  } catch (error) {
    res.status(500).json(serverError);
  }
};

module.exports = authJWT;
