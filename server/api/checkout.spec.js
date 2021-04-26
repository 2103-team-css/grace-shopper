/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const { db, Order, User, Product, OrderProduct } = require('../db');
const seed = require('../../script/seed');
const app = require('../app');

describe('Checkout routes', () => {
  let users;
  let products;
  beforeEach(async () => {
    await seed();
    users = await User.findAll();
    products = await Product.findAll();
  });

  describe('/api/checkout/guest', () => {
    it('POST /api/checkout/guest', async () => {
      const product = products[0];
      const quantity = product.quantity;
      const cart = [{ productId: product.id, quantity: 1 }];
      const payment = { email: 'test@email.com' };
      const res = await request(app)
        .post(`/api/checkout/guest`)
        .send({ cart, payment, shipping: {} })
        .expect(200);
      const orders = await Order.findAll({ where: { orderCode: res.body.orderCode } });
      expect(orders.length).to.be.equal(1);
      const orderItems = await OrderProduct.findAll({ where: { orderId: orders[0].id } });
      expect(orderItems.length).to.be.equal(1);
      expect(orderItems[0].productId).to.be.equal(product.id);
      expect(orderItems[0].quantity).to.be.equal(1);
      await product.reload();
      expect(product.quantity).to.be.equal(quantity - 1);
    });
    it('POST /api/checkout/:userId', async () => {
      const user = users[0];
      const token = await user.generateToken();
      const product = products[0];
      const quantity = product.quantity;
      const cart = [{ productId: product.id, quantity: 1, id: 1 }];
      const res = await request(app)
        .post(`/api/checkout/${user.id}`)
        .send({ cart, payment: {}, shipping: {} })
        .set('Authorization', token)
        .expect(200);
      const orders = await Order.findAll({ where: { orderCode: res.body.orderCode } });
      expect(orders.length).to.be.equal(1);
      const orderItems = await OrderProduct.findAll({ where: { orderId: orders[0].id } });
      expect(orderItems.length).to.be.equal(1);
      expect(orderItems[0].productId).to.be.equal(product.id);
      expect(orderItems[0].quantity).to.be.equal(1);
      await product.reload();
      expect(product.quantity).to.be.equal(quantity - 1);
    });
    it('does not allow buying out of stock', async () => {
      const product = products[0];
      const quantity = product.quantity;
      const cart = [{ productId: product.id, quantity: quantity + 1 }];
      const payment = { email: 'test@email.com' };
      await request(app)
        .post(`/api/checkout/guest`)
        .send({ cart, payment, shipping: {} })
        .expect(500);
    });

  });
});
