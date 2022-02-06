const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;
const accessTokenOption = {
  algorithm: "HS256",
  expiresIn: "1h",
};
const refreshTokenOption = {
  algorithm: "HS256",
  expiresIn: "14d",
};

module.exports = {
  sign: async (sub, email) => {
    const payload = {
      id: sub,
      email,
    };
    const result = {
      accessToken: jwt.sign(payload, secretKey, accessTokenOption),
      refreshToken: jwt.sign(payload, secretKey, refreshTokenOption),
    };

    return result;
  },
  verify: async (token) => {
    let decoded = null;

    try {
      decoded = jwt.verify(token, secretKey);
      return {
        result: resultMsg.ok,
        id: decoded.id,
        email: decoded.email,
      };
    } catch (error) {
      return {
        result: resultMsg.fail,
        message: error.message,
      };
    }
  },
};
