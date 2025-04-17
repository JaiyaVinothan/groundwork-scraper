
const { chromium } = require('playwright');

async function scrapeRentData(lat, lng, radius) {
  const keyword = 'commercial space near ' + lat + ',' + lng;
  console.log("🚀 Launching Chromium from hardcoded path...");

  const browser = await chromium.launch({
    headless: true,
    executablePath: '/opt/render/.cache/ms-playwright/chromium-1169/chrome-linux/chrome',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  try {
    console.log("🌐 Navigating to CommercialGuru...");
    await page.goto('https://www.commercialguru.com.sg/property-for-rent', { waitUntil: 'networkidle' });

    console.log("⌨️ Typing query...");
    await page.fill('input[name="query"]', keyword);
    await Promise.all([
      page.keyboard.press('Enter'),
      page.waitForNavigation({ waitUntil: 'networkidle' }),
    ]);

    await page.waitForTimeout(2000);

    console.log("📄 Capturing HTML...");
    const htmlContent = await page.content();
    console.log("📄 Snapshot:", htmlContent.slice(0, 1500));

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

  } catch (err) {
    await browser.close();
    console.error("❌ Scrape failed:", err.message);
    throw new Error("Scraping error");
  }
}

module.exports = { scrapeRentData };
