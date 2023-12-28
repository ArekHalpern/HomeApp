const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ensure environment variables are loaded
require('dotenv').config();
const FAL_AI_API_KEY = process.env.FAL_KEY;
const FOOOCUS_MODEL_URL = 'https://110602490-fooocus.gateway.alpha.fal.ai';

router.post('/fooocus', async (req, res) => {
    // Log the request details for troubleshooting
    console.log('Received request to /fooocus with body:', req.body);

    try {
        // Prepare the headers for the API call
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Key ${FAL_AI_API_KEY}`
        };

        // Make the API call to the fal.ai service
        const response = await axios.post(FOOOCUS_MODEL_URL, req.body, { headers });

        // Log the successful response data
        console.log('Response from fal.ai service:', response.data);

        // Forward the response from fal.ai to the client
        res.status(response.status).json(response.data);
    } catch (error) {
        if (error.response?.status === 503) {
            console.error('Service Unavailable:', error.message);
            res.status(503).send('The image generation service is currently unavailable. Please try again later.');
        } else {
            console.error('Error when calling the fooocus model:', error);
            res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
        }
    }
});

router.post('/sdxl', async (req, res) => {
    const SDXL_MODEL_URL = 'https://110602490-fast-sdxl.gateway.alpha.fal.ai';

    console.log('Received request to /sdxl with body:', req.body);

    try {
        console.log('Making API call to:', SDXL_MODEL_URL);
        const response = await axios.post(SDXL_MODEL_URL, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Key ${FAL_AI_API_KEY}`
            },
        });

        console.log('Response received from sdxl model:', response.data);

        // If the response contains image URLs, log them
        if (response.data?.images) {
            response.data.images.forEach((image, index) => {
                console.log(`Image ${index + 1} URL:`, image.url);
            });
        }

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error when calling the sdxl model:', error);

        if (error.response) {
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        }

        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
});

module.exports = router;
