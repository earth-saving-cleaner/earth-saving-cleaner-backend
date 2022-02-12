const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const { resultMsg } = require("../constants");

const client = new OAuth2Client(process.env.CLIENT_ID);

const secretKey = process.env.JWT_SECRET_KEY;
const accessTokenOption = {
  algorithm: "HS256",
  expiresIn: "1h",
};

module.exports = {
  sign: async (sub, email) => {
    const payload = {
      id: sub,
      email,
    };
    const result = {
      accessToken: jwt.sign(payload, secretKey, accessTokenOption),
    };

    return result;
  },
  verify: async (token) => {
    let decoded = null;

    try {
      decoded = await jwt.verify(token, secretKey);
    } catch (err) {
      return err.message;
    }

    return decoded;
  },
  verifyGoogleToken: async (token) => {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
      const { sub, email, picture } = ticket.getPayload();

      return {
        result: resultMsg.ok,
        sub,
        email,
        picture,
      };
    } catch (err) {
      console.error(err);
      return {
        result: resultMsg.fail,
        message: err.message,
      };
    }
  },
};
