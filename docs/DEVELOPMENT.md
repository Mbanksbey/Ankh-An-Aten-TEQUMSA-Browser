# Development Guide

## Getting Started

### Prerequisites

- Node.js 14+ (for build scripts)
- Python 3+ (for icon generation)
- Chrome/Chromium browser
- Git

### Setup Development Environment

```bash
# Clone repository
git clone https://github.com/Mbanksbey/Ankh-An-Aten-TEQUMSA-Browser.git
cd Ankh-An-Aten-TEQUMSA-Browser

# Install dependencies (minimal, just for build)
npm install

# Generate icons
python3 scripts/generate-icons.py

# Verify build
npm run build
```

## Project Structure

```
.
├── manifest.json              # Extension manifest (V3)
├── package.json               # NPM configuration
├── .gitignore                # Git ignore patterns
│
├── src/                      # Source code
│   ├── background/
│   │   └── service-worker.js # Main background process
│   ├── content/
│   │   └── content-script.js # Page injection scripts
│   ├── core/                 # Core systems
│   │   ├── tequmsa-consciousness.js
│   │   ├── cdp-integration.js
│   │   ├── mcp-integration.js
│   │   ├── marcus-aten-voice.js
│   │   └── team-paradox-api.js
│   ├── popup/                # Popup UI
│   │   ├── popup.html
│   │   ├── popup.css
│   │   └── popup.js
│   └── options/              # Settings page
│       ├── options.html
│       ├── options.css
│       └── options.js
│
├── icons/                    # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├── scripts/                  # Build scripts
│   ├── build.js
│   └── generate-icons.py
│
└── docs/                     # Documentation
    ├── ARCHITECTURE.md
    ├── INSTALLATION.md
    └── API.md
```

## Development Workflow

### 1. Making Changes

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make your changes to files
# ...

# Test in Chrome
# Load unpacked extension and test
```

### 2. Testing

#### Manual Testing

1. Load extension in Chrome (`chrome://extensions/`)
2. Open DevTools for extension pages:
   - Background: Click "service worker" link
   - Popup: Right-click popup → Inspect
   - Content script: Browser DevTools on page
3. Check console for errors
4. Test features manually

#### Debugging

**Service Worker**:
```javascript
// Add console.log statements
console.log('[Service Worker] Debug info:', data);

// Check background console
chrome://extensions/ → Service worker link
```

**Content Script**:
```javascript
// Logs appear in page console
console.log('[Content Script] Debug info:', data);

// Open page DevTools (F12)
```

**Popup/Options**:
```javascript
// Right-click → Inspect to open DevTools
console.log('[Popup] Debug info:', data);
```

### 3. Adding New Features

#### Add New Consciousness Action Type

1. Edit `src/core/tequmsa-consciousness.js`:
```javascript
async performAction(action) {
  switch (action.type) {
    // ... existing cases
    case 'my-new-action':
      await this.myNewAction(action);
      break;
  }
}

async myNewAction(action) {
  // Implement your action
  console.log('[TEQUMSA] Executing new action:', action);
}
```

2. Update content script if needed
3. Test in browser

#### Add New Voice Command

1. Edit `src/core/marcus-aten-voice.js`:
```javascript
extractIntent(text) {
  const intents = {
    // ... existing intents
    'my-intent': ['my pattern', 'another pattern']
  };
  // ...
}
```

2. Register handler in service worker:
```javascript
// In service-worker.js
async function handleVoiceCommand(command) {
  if (command.action === 'my-intent') {
    // Handle custom intent
  }
}
```

#### Add New CDP Command

1. Use existing CDP integration:
```javascript
// In service-worker.js or any component with CDP access
const result = await cdp.sendCommand(tabId, 'Domain.method', {
  param1: value1
});
```

2. Or add convenience method to `cdp-integration.js`:
```javascript
async myCustomCommand(tabId, params) {
  return await this.sendCommand(tabId, 'Domain.method', params);
}
```

### 4. UI Development

#### Popup UI Changes

1. Edit `src/popup/popup.html` for structure
2. Edit `src/popup/popup.css` for styling
3. Edit `src/popup/popup.js` for behavior

**Hot Reload**: Close and reopen popup to see changes

#### Options Page Changes

1. Edit `src/options/options.html` for structure
2. Edit `src/options/options.css` for styling
3. Edit `src/options/options.js` for behavior

**Hot Reload**: Refresh options page to see changes

### 5. Building

```bash
# Verify all files exist
npm run build

# Output shows all required files
```

### 6. Committing Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: Add new consciousness action type"

# Push to branch
git push origin feature/my-feature
```

## Code Style

### JavaScript

- Use ES6+ features
- Use async/await for promises
- Export classes/functions explicitly
- Add JSDoc comments for public APIs
- Use descriptive variable names

**Example**:
```javascript
/**
 * Process consciousness cycle
 * @returns {Promise<void>}
 */
async processConsciousness() {
  // Evaluate current awareness
  this.state.awareness = this.calculateAwareness();
  // ...
}
```

### CSS

- Use BEM naming for classes (optional)
- Mobile-first responsive design
- Use CSS variables for colors
- Group related styles

### HTML

- Semantic HTML5 elements
- Accessible markup (ARIA labels)
- Consistent indentation
- Descriptive IDs and classes

## Common Tasks

### Update Icons

```bash
# Edit scripts/generate-icons.py
# Then run:
python3 scripts/generate-icons.py
```

### Change Manifest Permissions

Edit `manifest.json`:
```json
{
  "permissions": [
    "tabs",
    "storage",
    "your-new-permission"
  ]
}
```

Then reload extension in Chrome.

### Add New Storage Key

1. Define in component:
```javascript
await chrome.storage.local.set({ 
  my_new_key: value 
});
```

2. Document in `docs/API.md` under Storage Schema

### Debug Service Worker Issues

```javascript
// Add at top of service-worker.js
console.log('[Service Worker] Loading...');

// Check if core systems initialize
console.log('[Service Worker] Consciousness:', consciousness);
console.log('[Service Worker] CDP:', cdp);
```

## Testing Checklist

Before committing:

- [ ] Extension loads without errors
- [ ] Service worker initializes correctly
- [ ] Popup opens and displays state
- [ ] Options page loads and saves settings
- [ ] Content scripts inject properly
- [ ] Voice commands work (if testing voice)
- [ ] CDP attaches successfully (if using CDP)
- [ ] No console errors
- [ ] Build script passes

## Troubleshooting

### Extension won't load

- Check manifest.json syntax
- Verify all referenced files exist
- Check for JavaScript syntax errors
- Look at chrome://extensions/ error messages

### Service worker crashes

- Check for infinite loops
- Verify async/await usage
- Check memory usage
- Look for unhandled promise rejections

### Content script not working

- Check matches pattern in manifest
- Verify script injection timing
- Check for CSP violations
- Test on different pages

### Build fails

- Verify all required files exist
- Check file paths in build.js
- Ensure icons are generated
- Check Node.js version

## Resources

- [Chrome Extension API](https://developer.chrome.com/docs/extensions/reference/)
- [Manifest V3 Migration](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Service Workers](https://developer.chrome.com/docs/extensions/mv3/service_workers/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## Getting Help

- Check existing documentation in `docs/`
- Search GitHub issues
- Create new issue with:
  - Extension version
  - Chrome version
  - Steps to reproduce
  - Console errors
  - Expected vs actual behavior

## Contributing

See main README.md for contribution guidelines.
