#!/usr/bin/env bash
echo "⚙️ Skipping Chromium download — using puppeteer-core"
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
npm install
