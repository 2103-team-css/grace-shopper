'use strict';

const { db, User, Product } = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: 'email@email.com',
      username: 'cody',
      password: '123',
      isAdmind: true,
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      code: '1',
      name: 'drums',
      quantity: 1,
      description: 'its a drum',
      price: 1,
      imageUrl:
        'https://i.pinimg.com/originals/90/04/41/900441b9bb16cadd019298c815a99a68.jpg',
      category: 'percussion',
    }),
    Product.create({
      code: '2',
      name: 'keyboard',
      quantity: 2,
      description: 'its a keyboard',
      price: 2,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71HQQWhlK9L._AC_SL1500_.jpg',
      category: 'keys',
    }),
    Product.create({
      code: '3',
      name: 'guitar',
      quantity: 3,
      description: 'its a guitar',
      price: 3,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/4/45/GuitareClassique5.png',
      category: 'string',
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
