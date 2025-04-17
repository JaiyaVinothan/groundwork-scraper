
# GroundWork Scraper

This project scrapes live commercial rent listings from Singapore based on a user's coordinates and radius. Intended for integration with the GroundWork market insights platform.

## How to Run

1. Install dependencies:
```
npm install
```

2. Start the server:
```
node server.js
```

3. Call the API:
```
GET http://localhost:3000/api/scrape-rent?lat=1.3521&lng=103.8198&radius=2000
```

## Deployment

Works great on Render (Free or Starter Plan). Just connect this repo, set the start command to `node server.js`, and you're good to go.
