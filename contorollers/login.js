const User = require("../models/User");
const jwt = require("../services/jwt");
const { resultMsg } = require("../constants");

exports.login = async (req, res, next) => {
  const { token } = req.body;

  try {
    const verifiedUser = await jwt.verifyGoogleToken(token);
    const email = verifiedUser.email;
    const existedUser = await User.findOne({ email });
    const result = {
      result: resultMsg.ok,
      googleToken: token,
      email,
      message: "nickname Request",
    };

    if (existedUser === null) return res.json(result);

    try {
      const jwtToken = await jwt.sign(verifiedUser.sub, email);
      return res.status(200).json({
        result: resultMsg.ok,
        token: jwtToken.accessToken,
        email,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        result: resultMsg.fail,
        message: resultMsg.serverError,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({
      result: resultMsg.fail,
      message: resultMsg.unauthorized,
    });
  }
};
