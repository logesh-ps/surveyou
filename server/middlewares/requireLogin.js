module.exports = (req, res, next) => {
  if (!req.user) {
    res
      .status(401)
      .send({ error: 'User is not logged in..!' });
  }

  next();
};
