const router = require('express').Router();
const { v4: uuid } = require('uuid');
const stripe = require('stripe')('sk_test_51IjxKTGFSgaIbDDaFA14lyE6FCAfS9isY4OXdreQdG4yDmdYf0Vp4gULY4OXOKkKOX9G0e8xdy5gSQF73f6qegh500OYvXpo5N')

const { isLoggedIn, isOwner } = require('../middleware');
const { db, Product, Order, Cart } = require('../db');

// guest checkout
// router.post('/guest', async (req, res, next) => {
//   try {
//     const { cart, payment, shipping } = req.body;
//     const orderCode = uuid();
//     const email = payment.email;
//     let total = 0;

//     await db.transaction(async (t) => {
//       const order = await Order.create(
//         {
//           email,
//           orderCode,
//         },
//         { transaction: t }
//       );

//       for (let item of cart) {
//         const product = await Product.findByPk(item.productId, { transaction: t });
//         await product.update({ quantity: product.quantity - item.quantity }, { transaction: t });
//         await order.addProduct(product, {
//           through: {
//             quantity: item.quantity,
//             price: product.price,
//             total: product.price * item.quantity,
//           },
//           transaction: t,
//         });
//         total += product.price * item.quantity;
//       }
//     });
//     res.send({ orderCode, cart, total });
//   } catch (error) {
//     next(error);
//   }
// });

// // logged in
// // /api/checkout/:userId
// router.post('/:userId', isLoggedIn, isOwner, async (req, res, next) => {
//   try {
//     const { cart, payment, shipping } = req.body;
//     const orderCode = uuid();
//     const email = req.user.email;
//     let total = 0;

//     await db.transaction(async (t) => {
//       const order = await Order.create(
//         {
//           email,
//           orderCode,
//           userId: req.user.id,
//         },
//         { transaction: t }
//       );

//       for (let item of cart) {
//         const product = await Product.findByPk(item.productId, { transaction: t });
//         await product.update({ quantity: product.quantity - item.quantity }, { transaction: t });
//         await Cart.destroy({ where: { id: item.id }, transaction: t });
//         await order.addProduct(product, {
//           through: {
//             quantity: item.quantity,
//             price: product.price,
//             total: product.price * item.quantity,
//           },
//           transaction: t,
//         });
//         total += product.price * item.quantity;
//       }
//     });
//     res.send({ orderCode, cart, total });
//   } catch (error) {
//     next(error);
//   }
// });

// POST /api/checkout
router.post('/', async(req, res) => {
  console.log("Req body>>>", req.body);
  let error;
  let status;

  try {
    const { cart, token } = req.body;
    const customer = await 
    stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const unique_key = uuid();

    const charge = await stripe.charges.create({
      amount: cart.price * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: "Cart items purchased!",
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip,

        }
      }
    },
    {
      unique_key
    });
    console.log('Charge success: ', { charge });
    status = 'success';
  } catch (err) {
    console.error('Error:', err);
    status = 'failure';
  }

  res.json( {error, status} );
})

module.exports = router;
