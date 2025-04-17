
# GroundWork Scraper (puppeteer-core version)

Scrapes commercial listings using puppeteer-core (lightweight) + system Chromium path, optimized for Render free tier.

## Deploy Instructions

1. Upload to GitHub
2. Set Render build command to: `./render-build.sh`
3. Use Free instance (512MB) — works with puppeteer-core

## Example Endpoint

GET `/api/scrape-rent?lat=1.3521&lng=103.8198&radius=2000`
