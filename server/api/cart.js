const router = require('express').Router();
const {
  models: { Cart, Product },
} = require('../db');

router.post('/', async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;
    const product = await Product.findByPk(productId);
    const newCartItem = await Cart.create({
      userId,
      productId,
      quantity,
      total: quantity * product.price,
    });
    res.json(newCartItem);
  } catch (error) {
    next(error);
  }
});

router.put('/:cartId', async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cartItem = await Product.findByPk(req.params.cardId);
    const product = await Product.findByPk(cartItem.productId);
    await cartItem.update({
      quantity,
      total: quantity * product.price,
    });
    res.json(cartItem);
  } catch (error) {
    next(error);
  }
});

router.delete('/:cartId', async (req, res, next) => {
  try {
    const cartItem = await Product.findByPk(req.params.cartId);
    await cartItem.destroy();
    res.json(cartItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
