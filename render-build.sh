#!/usr/bin/env bash
echo "📦 Installing Playwright dependencies..."
npm install
echo "🎯 Installing Chromium only..."
npx playwright install chromium
