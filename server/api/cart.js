const router = require('express').Router({ mergeParams: true });
const { Cart, Product, User } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: [],
      include: {
        model: Product,
        attributes: ['name', 'price'],
        through: { model: Cart, as: 'cart', attributes: ['id', 'quantity', 'productId'] },
      },
    });
    res.json(user.products);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    await Cart.create({
      userId: req.params.userId,
      productId,
      quantity,
    });
    const user = await User.findByPk(req.params.userId, {
      attributes: [],
      include: {
        model: Product,
        attributes: ['name', 'price'],
        through: { model: Cart, as: 'cart', attributes: ['id', 'quantity', 'productId'] },
        where: { id: productId },
      },
    });
    res.json(user.products[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:cartId', async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cartItem = await Cart.findByPk(req.params.cartId);
    await cartItem.update({ quantity });
    const user = await User.findByPk(req.params.userId, {
      attributes: [],
      include: {
        model: Product,
        attributes: ['name', 'price'],
        through: { model: Cart, as: 'cart', attributes: ['id', 'quantity', 'productId'] },
        where: { id: cartItem.productId },
      },
    });
    res.json(user.products[0]);
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
