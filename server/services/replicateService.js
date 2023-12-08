const Replicate = require('replicate');

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function generateImage(prompt) {
  try {
    let prediction = await replicate.deployments.predictions.create(
      "arekhalpern",
      "react-app-image-gen",
      { input: { prompt } }
    );
    prediction = await replicate.wait(prediction);
    return prediction.output;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error; // Re-throw to handle at the controller level
  }
}

module.exports = { generateImage };