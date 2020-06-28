const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

// documentation: http://www.passportjs.org/docs/username-password/
passport.use(new LocalStrategy(
  // using code block from documentation would not await await resolved promise object, transitioning code to async await solved issue
  async function(username, password, done) {
    let dbUser = await User.findOne({
      where: {
        username: username
      }
    });

    // only run check password if user exists
    let result;
    if (dbUser != null) {
      result = await dbUser.checkPassword(password);
    }

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

// good writeup of serialize and deserializing passport user https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;