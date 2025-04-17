#!/usr/bin/env bash
echo "⚙️ Skipping Chromium download for Puppeteer on Render"
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
npm install
