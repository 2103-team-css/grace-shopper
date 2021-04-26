/* global describe beforeEach it */

const { expect } = require('chai');
const { db, User } = require('../index');
const jwt = require('jsonwebtoken');
const seed = require('../../../script/seed');

describe('User model', () => {
  let users;
  beforeEach(async () => {
    await seed();
    users = await User.findAll();
  });

  describe('instanceMethods', () => {
    describe('generateToken', () => {
      it('returns a token with the id of the user', async () => {
        const user = users[0];
        const token = await user.generateToken();
        const { id } = await jwt.verify(token, process.env.JWT);
        expect(id).to.equal(user.id);
      });
    });
    describe('authenticate', () => {
      let user;
      beforeEach(
        async () =>
          (user = await User.create({
            email: 'lucy@gmail.com',
            password: 'loo',
          }))
      );
      describe('with correct credentials', () => {
        it('returns a token', async () => {
          const token = await User.authenticate({
            email: 'lucy@gmail.com',
            password: 'loo',
          });
          expect(token).to.be.ok;
        });
      });
      describe('with incorrect credentials', () => {
        it('throws a 401', async () => {
          try {
            await User.authenticate({
              email: 'lucy@gmail.com',
              password: '123',
            });
            throw 'nooo';
          } catch (ex) {
            expect(ex.status).to.equal(401);
          }
        });
      });
    });
  });
});
