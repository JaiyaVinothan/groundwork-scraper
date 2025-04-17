#!/usr/bin/env bash
echo "📦 Installing dependencies (Playwright)"
npm install
npx playwright install --with-deps
