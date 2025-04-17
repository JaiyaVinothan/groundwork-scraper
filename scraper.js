
const puppeteer = require('puppeteer');

async function scrapeRentData(lat, lng, radius) {
  const keyword = 'commercial space near ' + lat + ',' + lng;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.commercialguru.com.sg/property-for-rent', { waitUntil: 'networkidle2' });

  await page.type('input[name="query"]', keyword);
  await Promise.all([
    page.keyboard.press('Enter'),
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

  const listings = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.listing-card'));
    return cards.slice(0, 5).map(card => {
      const name = card.querySelector('h3 a')?.innerText || '';
      const info = card.querySelector('.listing-details')?.innerText || '';
      const rentMatch = info.match(/\$(\d{1,3}(,\d{3})*(\.\d{2})?)/);
      const sqftMatch = info.match(/(\d{3,4})\s*sqft/i);

      const rent = rentMatch ? parseFloat(rentMatch[1].replace(/[^\d.]/g, '')) : null;
      const sqft = sqftMatch ? parseInt(sqftMatch[1]) : null;
      const rate = rent && sqft ? +(rent / sqft).toFixed(2) : null;

      return { name, rent, sqft, rate };
    });
  });

  await browser.close();

  const validListings = listings.filter(l => l.rate !== null);
  const avgRate = validListings.reduce((acc, l) => acc + l.rate, 0) / validListings.length || 0;

  return {
    area: keyword,
    average_rent_per_sqft: +avgRate.toFixed(2),
    sample_listings: validListings,
  };
}

module.exports = { scrapeRentData };
