const User = require("../models/User");

module.exports = {
  verifyDuplicate: async (data) => {
    try {
      const result = await User.find({ nickname: data }).exec();
      return result.length;
    } catch (err) {
      console.error(err);
      return {
        result: resultMsg.fail,
        message: err.message,
      };
    }
  },
};
