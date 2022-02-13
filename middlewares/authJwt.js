const jwt = require("../services/jwt");
const { resultMsg } = require("../constants");
const createError = require("http-errors");

const authJWT = async (req, res, next) => {
  const unauthorizedResult = {
    result: resultMsg.fail,
    message: resultMsg.unauthorized,
  };

  if (!req.headers.authorization) {
    res.status(401).json(unauthorizedResult);
    return;
  }

  const token = req.headers.authorization.split("Bearer ")[1];

  try {
    const myToken = await jwt.verify(token);

    if (myToken === "jwt expired") {
      next(createError(401, resultMsg.tokenExpired));
      return;
    }

    if (myToken) {
      req.id = myToken.id;
      req.email = myToken.email;
      next();

      return;
    }

    res.status(401).json(unauthorizedResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      result: resultMsg.fail,
      message: resultMsg.serverError,
    });
  }
};

module.exports = authJWT;
