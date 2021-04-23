const router = require('express').Router();
const { v4: uuid } = require('uuid');
const { isLoggedIn, isOwner } = require('../middleware');
const { db, Product, Order, Cart } = require('../db');

// guest checkout
router.post('/guest', async (req, res, next) => {
  try {
    const { cart, payment, shipping } = req.body;
    const orderCode = uuid();
    const email = payment.email;
    let total = 0;

    await db.transaction(async (t) => {
      for (let item of cart) {
        const product = await Product.findByPk(item.productId, { transaction: t });
        await product.update({ quantity: product.quantity - item.quantity }, { transaction: t });
        await Order.create(
          {
            email,
            quantity: item.quantity,
            price: product.price,
            total: product.price * item.quantity,
            orderCode,
            productId: item.productId,
          },
          { transaction: t }
        );
        total += product.price * item.quantity;
      }
    });
    res.send({ orderCode, cart, total });
  } catch (error) {
    next(error);
  }
});

// logged in
// /api/checkout/:userId
router.post('/:userId', isLoggedIn, isOwner, async (req, res, next) => {
  try {
    const { cart, payment, shipping } = req.body;
    const orderCode = uuid();
    const email = req.user.email;
    let total = 0;

    await db.transaction(async (t) => {
      for (let item of cart) {
        const product = await Product.findByPk(item.productId, { transaction: t });
        await product.update({ quantity: product.quantity - item.quantity }, { transaction: t });
        await Cart.destroy({ where: { id: item.id }, transaction: t });
        await Order.create(
          {
            email,
            quantity: item.quantity,
            price: product.price,
            total: product.price * item.quantity,
            orderCode,
            productId: item.productId,
            userId: req.user.id,
          },
          { transaction: t }
        );
        total += product.price * item.quantity;
      }
    });

    res.send({ orderCode, cart, total });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
