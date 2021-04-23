//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const Order = require('./models/order');

//Define super many to many relationships
User.belongsToMany(Product, { through: Cart, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Cart, foreignKey: 'productId' });
User.hasMany(Cart);
Cart.belongsTo(User);
Product.hasMany(Cart);
Cart.belongsTo(Product);

User.belongsToMany(Product, { through: Order, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Order, foreignKey: 'productId' });
User.hasMany(Order);
Order.belongsTo(User);
Product.hasMany(Order);
Order.belongsTo(Product);

module.exports = {
  db,
  User,
  Product,
  Cart,
  Order,
};
