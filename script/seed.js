'use strict';

const { db, models: { User, Image } } = require('../server/db');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'arek', password: '123' }),
    // ... other users
  ]);
  console.log(`seeded ${users.length} users`);

  // Creating Images
  const imagesToCreate = [
    { name: 'Image 1', description: 'Description for image 1', filePath: '/Assets/Images/2023-12-04_00-16-24_8774.png' },
    { name: 'Image 2', description: 'Description for image 2', filePath: '/Assets/Images/2023-12-03_23-57-19_6710.png' },
    { name: 'Image 3', description: 'Description for image 2', filePath: '/Assets/Images/2023-12-03_22-28-19_9478.png' },
    { name: 'Image 4', description: 'Description for image 2', filePath: '/Assets/Images/2023-12-03_23-30-29_4972.png' },
    { name: 'Image 5', description: 'Description for image 2', filePath: '/Assets/Images/00003-3787907948.png' },
    { name: 'Image 6', description: 'Description for image 2', filePath: '/Assets/Images/00012-1078574000.png' },
    { name: 'Image 7', description: 'Description for image 2', filePath: '/Assets/Images/00001-1078573999.png' },
    { name: 'Image 8', description: 'Description for image 2', filePath: '/Assets/Images/00002-1078573999.png' },
    // ... other images
  ];

  const images = await Promise.all(
    imagesToCreate.map(image => Image.create(image))
  );
  console.log(`seeded ${images.length} images`);

  return {
    users: users.reduce((acc, user) => {
      acc[user.username] = user;
      return acc;
    }, {}),
    images
  };
}

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

if (module === require.main) {
  runSeed();
}

module.exports = seed;
