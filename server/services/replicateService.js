const Replicate = require('replicate');
require('dotenv').config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function generateImage(prompt) {
    console.log('Calling Replicate API with prompt:', prompt);
  try {
    let prediction = await replicate.deployments.predictions.create(
      "arekhalpern",
      "react-app-image-gen",
      { input: { 
        width: 528,
        height: 528,
        prompt: prompt,
        refine: "expert_ensemble_refiner",
        scheduler: "K_EULER",
        lora_scale: 0.6,
        num_outputs: 1,
        guidance_scale: 7.5,
        apply_watermark: false,
        high_noise_frac: 0.8,
        negative_prompt: "",
        prompt_strength: 0.8,
        num_inference_steps: 25 } }
    );
    prediction = await replicate.wait(prediction);
    return prediction.output;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

module.exports = { generateImage };