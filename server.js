
const express = require('express');
const cors = require('cors');
const { scrapeRentData } = require('./scraper');

const app = express();
app.use(cors());

app.get('/api/scrape-rent', async (req, res) => {
  const { lat, lng, radius } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'Missing coordinates' });

  try {
    const data = await scrapeRentData(lat, lng, radius);
    res.json(data);
  } catch (error) {
    console.error('❌ Scrape failed:', error);
    res.status(500).json({ error: 'Scraping error' });
  }
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
