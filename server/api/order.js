const router = require('express').Router();
const { Product, Order } = require('../db');
const sequelize = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      attributes: ['id', 'orderCode', 'createdAt'],
      include: {
        model: Product,
        attributes: [
          'id',
          'name',
          [sequelize.literal('"products->orderProduct".price'), 'price'],
          [sequelize.literal('"products->orderProduct".quantity'), 'quantity'],
          [sequelize.literal('"products->orderProduct".total'), 'total'],
        ],
        through: { attributes: [] },
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
