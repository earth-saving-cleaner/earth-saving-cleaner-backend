const jwt = require("../services/jwt");
const { resultMsg } = require("../constants");

const authJWT = async (req, res, next) => {
  const unauthorizedResult = {
    result: resultMsg.fail,
    message: resultMsg.unauthorized,
  };

  if (!req.headers.authorization) return res.status(401).json(unauthorizedResult);

  const token = req.headers.authorization.split("Bearer ")[1];

  try {
    const clientToken = await jwt.verify(token);
    req.id = clientToken.id;
    req.email = clientToken.email;

    next();
  } catch (err) {
    console.error(err);
    const message = err.name === "TokenExpiredError" ? resultMsg.tokenExpired : resultMsg.unauthorized;
    next(createError(401, message));
  }
};

module.exports = authJWT;
