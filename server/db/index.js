//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const { Order, OrderProduct } = require('./models/order');

//Define super many to many relationship
User.belongsToMany(Product, { through: Cart, foreignKey: 'userId' });
Product.belongsToMany(User, { through: Cart, foreignKey: 'productId' });
User.hasMany(Cart);
Cart.belongsTo(User);
Product.hasMany(Cart);
Cart.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: 'orderId',
});
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: 'productId',
  onDelete: 'SET NULL',
});

module.exports = {
  db,
  User,
  Product,
  Cart,
  Order,
  OrderProduct,
};
