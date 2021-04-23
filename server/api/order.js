const router = require('express').Router();
const { Product, Order } = require('../db');
const sequelize = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      attributes: [
        'id',
        'quantity',
        'price',
        'total',
        'orderCode',
        'createdAt',
        'productId',
        [sequelize.col('product.name'), 'name'],
      ],
      include: { model: Product, attributes: [] },
      order: [['createdAt', 'DESC']],
    });

    const groupedOrders = orders.reduce((groups, item) => {
      if (!groups[item.orderCode]) {
        groups[item.orderCode] = [item];
      } else {
        groups[item.orderCode].push(item);
      }
      return groups;
    }, {});

    const result = Object.keys(groupedOrders).map((orderCode) => {
      return {
        orderCode,
        products: groupedOrders[orderCode],
      };
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
