const {
  models: { User },
} = require('./db');

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
  if (req.user.id === req.body.userId) {
    next();
  } else {
    next(new Error('not authorized'));
  }
};

module.exports = { isLoggedIn, isOwner };
