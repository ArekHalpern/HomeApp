const Replicate = require('replicate');
require('dotenv').config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function main() {
  const training = await replicate.trainings.create(
    'stability-ai',
    'sdxl',
    'a00d0b7dcbb9c3fbb34ba87d2d5b46c56969c84a628bf778a7fdaec30b1b99c5',
    {
      destination: 'arekhalpern/home-model',
      input: {
        input_images: 'https://storage.cloud.google.com/touchworld-7c4b5.appspot.com/imgs.zip'
      }
    })
  console.log(`URL: https://replicate.com/p/${training.id}`)
}

main()

// Run: 
// node train-sdxl.js