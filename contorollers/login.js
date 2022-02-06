const { OAuth2Client } = require("google-auth-library");

const User = require("../models/User");
const jwt = require("../services/jwt");
const { resultMsg } = require("../constants");
const client = new OAuth2Client(process.env.CLIENT_ID);

exports.verifyGoogleIdToken = async (req, res, next) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const { sub, email } = ticket.getPayload();
    // sub = googleId, email = googleEmail

    const existedUser = await User.findOne({ email }).exec();

    const result = {
      result: resultMsg.ok,
      message: "nickname Request",
    };

    if (!existedUser) return res.json(result);

    try {
      const jwtToken = await jwt.sign(sub, email);
      return res.status(200).json({
        result: resultMsg.ok,
        token: jwtToken.accessToken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        result: resultMsg.serverError,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({
      result: resultMsg.unauthorized,
    });
  }
};
