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
    const myToken = await jwt.verify(token);

    if (myToken) {
      req.id = myToken.id;
      req.email = myToken.email;
      next();
    } else {
      return res.status(401).json(unauthorizedResult);
    }
  } catch (err) {
    console.error(err);
    if (err.message === "jwt expired") {
      return res.status(500).json({
        result: resultMsg.fail,
        message: "토큰 유효기간이 만료되었습니다. 로그인이 필요합니다",
      });
    } else {
      return res.status(500).json({
        result: resultMsg.fail,
        message: resultMsg.serverError,
      });
    }
  }
};

module.exports = authJWT;
