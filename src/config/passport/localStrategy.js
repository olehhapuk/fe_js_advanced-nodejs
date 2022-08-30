const { Strategy } = require('passport-local');

const { User } = require('../../models');

module.exports = new Strategy(
  {
    usernameField: 'username',
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({
        username,
      });
      if (!user || !(await user.validatePassword(password))) {
        done(null, false);
        return;
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
