const express = require('express');
const axios = require('axios');
const router = express.Router();

const FAL_AI_API_KEY = process.env.FAL_KEY;

router.all('/fal/proxy', async (req, res) => {
    const targetUrl = req.header('x-fal-target-url');

    if (!targetUrl || !targetUrl.endsWith('fal.ai')) {
        return res.status(targetUrl ? 412 : 400).send('Bad Request');
    }

    try {
        const response = await axios({
            method: req.method,
            url: targetUrl,
            data: req.body,
            headers: { 
                ...req.headers,
                'Authorization': `Key ${FAL_AI_API_KEY}`
            },
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Internal Server Error');
    }
});

module.exports = router;
