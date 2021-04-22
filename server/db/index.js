//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const Order = require('./models/order');

User.belongsToMany(Product, { through: Cart, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Cart, foreignKey: 'productId' });

User.belongsToMany(Product, { through: Order, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Order, foreignKey: 'productId' });

module.exports = {
  db,
  User,
  Product,
  Cart,
};
