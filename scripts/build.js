#!/usr/bin/env node
/**
 * Build script for Ankh-An-Aten TEQUMSA Browser Extension
 */

const fs = require('fs');
const path = require('path');

console.log('Building Ankh-An-Aten TEQUMSA Browser Extension...\n');

// Check that all required files exist
const requiredFiles = [
  'manifest.json',
  'src/background/service-worker.js',
  'src/content/content-script.js',
  'src/popup/popup.html',
  'src/popup/popup.css',
  'src/popup/popup.js',
  'src/options/options.html',
  'src/options/options.css',
  'src/options/options.js',
  'src/core/tequmsa-consciousness.js',
  'src/core/cdp-integration.js',
  'src/core/mcp-integration.js',
  'src/core/marcus-aten-voice.js',
  'src/core/team-paradox-api.js',
  'icons/icon16.png',
  'icons/icon48.png',
  'icons/icon128.png'
];

let allFilesExist = true;

console.log('Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.error('\n❌ Build failed: Some required files are missing');
  process.exit(1);
}

console.log('\n✅ Build complete! Extension is ready to load.');
console.log('\nTo load the extension in Chrome:');
console.log('1. Open Chrome and navigate to chrome://extensions/');
console.log('2. Enable "Developer mode" in the top right');
console.log('3. Click "Load unpacked"');
console.log('4. Select this directory');
console.log('\nThe extension should now be loaded and active!');
