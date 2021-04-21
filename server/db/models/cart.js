const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = Cart;
