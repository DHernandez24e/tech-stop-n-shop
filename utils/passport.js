const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

// documentation: http://www.passportjs.org/docs/username-password/
passport.use(new LocalStrategy(
  async function(username, password, done) {
    let dbUser = await User.findOne({
      where: {
        username: username
      }
    });
    let result = await dbUser.checkPassword(password);

    if (!dbUser) {
      console.log('Incorrect username');
      return done(null, false, { message: 'Incorrect username.' });
    } else if (!result) {
      console.log('Incorrect password');
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, dbUser)
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;