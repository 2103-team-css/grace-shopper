const router = require('express').Router({ mergeParams: true });
const sequelize = require('sequelize');
const { Cart, Product, User } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: req.params.userId },
      attributes: [
        'id',
        'quantity',
        'productId',
        [sequelize.col('product.name'), 'name'],
        [sequelize.col('product.price'), 'price'],
      ],
      include: { model: Product, attributes: [] },
    });
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const newCartItem = await Cart.create({
      userId: req.params.userId,
      productId,
      quantity,
    });
    const returnItem = await Cart.findByPk(newCartItem.id, {
      attributes: [
        'id',
        'quantity',
        'productId',
        [sequelize.col('product.name'), 'name'],
        [sequelize.col('product.price'), 'price'],
      ],
      include: { model: Product, attributes: [] },
    });
    res.json(returnItem);
  } catch (error) {
    next(error);
  }
});

router.put('/:cartId', async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cartItem = await Cart.findByPk(req.params.cartId);
    await cartItem.update({ quantity });
    const returnItem = await Cart.findByPk(cartItem.id, {
      attributes: [
        'id',
        'quantity',
        'productId',
        [sequelize.col('product.name'), 'name'],
        [sequelize.col('product.price'), 'price'],
      ],
      include: { model: Product, attributes: [] },
    });
    res.json(returnItem);
  } catch (error) {
    next(error);
  }
});

router.delete('/:cartId', async (req, res, next) => {
  try {
    const cartItem = await Cart.findByPk(req.params.cartId);
    await cartItem.destroy();
    res.json(cartItem);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    await Cart.destroy({ where: { userId: req.params.userId } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
