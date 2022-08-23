const { ExtractJwt, Strategy } = require('passport-jwt');
// const JWTStrategy = require('passport-jwt').Strategy;

const { User } = require('../../models');

module.exports = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload._id);
      if (!user) {
        done(null, false);
        return;
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
