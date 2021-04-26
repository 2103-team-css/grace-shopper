/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const { db, Order, User, Product, OrderProduct } = require('../db');
const seed = require('../../script/seed');
const app = require('../app');

describe('Order routes', () => {
  let users;
  let products;
  beforeEach(async () => {
    await seed();
    users = await User.findAll();
    products = await Product.findAll();
  });

  describe('/api/orders/userId', () => {
    it('GET /api/orders/:userId', async () => {
      const user = users[0];
      const token = await user.generateToken();
      const product = products[0];
      const cart = [{ productId: product.id, quantity: 1, id: 1 }];
      await request(app)
        .post(`/api/checkout/${user.id}`)
        .send({ cart, payment: {}, shipping: {} })
        .set('Authorization', token);
      const { body: orders } = await request(app)
        .get(`/api/orders/${user.id}`)
        .set('Authorization', token)
        .expect(200);
      expect(orders.length).to.be.equal(1);
      const order = orders[0];
      expect(order.products[0].id).to.be.equal(product.id);
      expect(order.products[0].quantity).to.be.equal(1);
    });
    it('must be logged in to get order history', async () => {
      const user = users[0];
      await request(app).get(`/api/orders/${user.id}`).expect(401);
    });
    it('must be owner in to get order history', async () => {
      const user = users[0];
      const user2 = users[1];
      const token = await user2.generateToken();
      await request(app).get(`/api/orders/${user.id}`).set('Authorization', token).expect(403);
    });
  });
});
