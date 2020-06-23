const isAuth = (req, res, next) => {
  // if (!req.session.user_id)
  if (req.user) {
    return next();
  }
  return res.redirect('/');
};

module.exports = isAuth;