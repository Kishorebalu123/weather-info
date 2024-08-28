const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;

app.get('/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'Please provide a city.' });
  }

  try {
    const response = await axios.get(`http://api.weatherstack.com/current`, {
      params: {
        access_key: WEATHERSTACK_API_KEY,
        query: city,
      },
    });

    const weatherData = response.data;

    if (weatherData.error) {
      return res.status(404).json({ error: 'City not found.' });
    }

    res.json({weatherData});
   
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
