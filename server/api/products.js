const router = require('express').Router();
const { Product } = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name'],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});
