// used to ensure user is logged in
const isAuth = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.redirect('/');
};

module.exports = isAuth;