const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  code: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'http://via.placeholder.com/320x320',
  },
  category: {
    type: Sequelize.ENUM('percussion', 'string', 'keys', 'accessories'),
  },
});

module.exports = Product;
