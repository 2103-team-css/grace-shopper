const { User } = require('./db');

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isOwner = (req, res, next) => {
  if (req.user.id == req.params.userId) {
    next();
  } else {
    const error = new Error('not authorized');
    error.status = 403;
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).send({ msg: 'Not an admin, sorry' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isLoggedIn, isOwner, isAdmin };
