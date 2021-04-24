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
      const order = await Order.create(
        {
          email,
          orderCode,
        },
        { transaction: t }
      );

      for (let item of cart) {
        const product = await Product.findByPk(item.productId, { transaction: t });
        await product.update({ quantity: product.quantity - item.quantity }, { transaction: t });
        await order.addProduct(product, {
          through: {
            quantity: item.quantity,
            price: product.price,
            total: product.price * item.quantity,
          },
          transaction: t,
        });
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
      const order = await Order.create(
        {
          email,
          orderCode,
          userId: req.user.id,
        },
        { transaction: t }
      );

      for (let item of cart) {
        const product = await Product.findByPk(item.productId, { transaction: t });
        await product.update({ quantity: product.quantity - item.quantity }, { transaction: t });
        await Cart.destroy({ where: { id: item.id }, transaction: t });
        await order.addProduct(product, {
          through: {
            quantity: item.quantity,
            price: product.price,
            total: product.price * item.quantity,
          },
          transaction: t,
        });
        total += product.price * item.quantity;
      }
    });
    res.send({ orderCode, cart, total });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
