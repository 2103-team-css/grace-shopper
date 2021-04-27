/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const { db, Cart, User, Product } = require('../db');
const seed = require('../../script/seed');
const app = require('../app');

describe('Cart routes', () => {
  let users;
  let products;
  beforeEach(async () => {
    await seed();
    users = await User.findAll();
    products = await Product.findAll();
  });

  describe('/api/carts', () => {
    it('GET /api/carts/:userId', async () => {
      const user = users[0];
      const token = await user.generateToken();
      const cart = await user.getCarts();
      const res = await request(app)
        .get(`/api/carts/${user.id}`)
        .set('Authorization', token)
        .expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(cart.length);
    });
    it('POST /api/carts/:userId', async () => {
      const user = users[0];
      const product = products[0];
      const token = await user.generateToken();
      const cart = await user.getCarts();
      const res = await request(app)
        .post(`/api/carts/${user.id}`)
        .send({ productId: product.id, quantity: 5 })
        .set('Authorization', token)
        .expect(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.all.keys('id', 'quantity', 'productId', 'name', 'price');
      const newCart = await user.getCarts();
      expect(newCart.length).to.equal(cart.length + 1);
    });
    it('PUT /api/carts/:userId/:cartId', async () => {
      const user = users[0];
      const product = products[0];
      const token = await user.generateToken();
      const { body: newCartItem } = await request(app)
        .post(`/api/carts/${user.id}`)
        .send({ productId: product.id, quantity: 5 })
        .set('Authorization', token)
        .expect(200);
      const { body: updatedCartItem } = await request(app)
        .put(`/api/carts/${user.id}/${newCartItem.id}`)
        .send({ quantity: 1 })
        .set('Authorization', token)
        .expect(200);
      expect(updatedCartItem.quantity).to.equal(1);
    });
    it('only works for logged in user', async () => {
      const user = users[0];
      await request(app).get(`/api/carts/${user.id}`).expect(401);
    });
    it('DELETE /api/carts/:userId/:cartId', async () => {
      const user = users[0];
      const product = products[0];
      const token = await user.generateToken();
      await request(app)
        .post(`/api/carts/${user.id}`)
        .send({ productId: product.id, quantity: 5 })
        .set('Authorization', token)
        .expect(200);
      const cart = await user.getCarts();
      await request(app)
        .delete(`/api/carts/${user.id}/${cart[0].id}`)
        .set('Authorization', token)
        .expect(200);
      const newCart = await user.getCarts();
      expect(newCart.length).to.equal(cart.length - 1);
    });
    it('DELETE /api/carts', async () => {
      const user = users[0];
      const token = await user.generateToken();
      const product = products[0];
      const product2 = products[1];
      await request(app)
        .post(`/api/carts/${user.id}`)
        .send({ productId: product.id, quantity: 5 })
        .set('Authorization', token)
        .expect(200);
      await request(app)
        .post(`/api/carts/${user.id}`)
        .send({ productId: product2.id, quantity: 5 })
        .set('Authorization', token)
        .expect(200);
      await request(app).delete(`/api/carts/${user.id}`).set('Authorization', token).expect(204);
      const cart = await user.getCarts();
      expect(cart.length).to.equal(0);
    });
    it('only works for logged in user', async () => {
      const user = users[0];
      await request(app).get(`/api/carts/${user.id}`).expect(401);
    });
    it('only allows an owner access', async () => {
      const user1 = users[0];
      const user2 = users[1];
      const token = await user2.generateToken();
      await request(app).get(`/api/carts/${user1.id}`).set('Authorization', token).expect(403);
    });
  });
});
