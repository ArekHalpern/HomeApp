const axios = require('axios');
require('dotenv').config();

const FAL_AI_API_KEY = process.env.FAL_KEY;

async function callFalAiService(prompt) {
    console.log('Sending prompt to fal.ai:', prompt);
    try {
      const response = await axios.post('https://110602490-fooocus.gateway.alpha.fal.ai', {
        input: { "prompt": "blue sky",
        "negative_prompt": "bad",
        "style": "cinematic-default",
        "performance": "Speed",
        "seed": 176400,
        "aspect_ratio": "1024x1024",
        "image_number": 1 }
      }, {
        headers: { 'Authorization': `Key ${FAL_AI_API_KEY}` }
      });
  
      return response.data;
    } catch (error) {
        console.error('Error sending request to fal.ai:', error);
        if (error.response?.data?.detail) {
          error.response.data.detail.forEach(err => {
            console.error(`Error at ${err.loc}: ${err.msg}`);
          });
        } else {
          console.error('Full error response from fal.ai:', error.response?.data);
        }
        throw error;
      }
  }

module.exports = { callFalAiService };
