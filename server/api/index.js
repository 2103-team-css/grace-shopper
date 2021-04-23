const router = require('express').Router();
const { isLoggedIn, isOwner } = require('../middleware');

module.exports = router;

router.use('/users', require('./users'));
router.use('/carts/:userId', isLoggedIn, isOwner, require('./cart'));
router.use('/products', require('./products'));
router.use('/checkout', require('./checkout'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
