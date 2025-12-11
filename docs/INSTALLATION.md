# Ankh-An-Aten TEQUMSA Browser - Installation & Usage Guide

## Installation

### Prerequisites

- Google Chrome or Chromium-based browser (version 88+)
- Developer mode enabled

### Loading the Extension

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/Mbanksbey/Ankh-An-Aten-TEQUMSA-Browser.git
   cd Ankh-An-Aten-TEQUMSA-Browser
   ```

2. **Generate Icons** (if not present)
   ```bash
   python3 scripts/generate-icons.py
   ```

3. **Verify Build**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right corner)
   - Click **Load unpacked**
   - Select the repository directory
   - The extension should now appear in your extensions list

## First-Time Setup

### 1. Access Settings

Click the extension icon in your toolbar, then click "Settings" to open the options page.

### 2. Configure Basic Settings

**General Settings**:
- ✓ Enable Extension
- Choose whether to auto-attach CDP
- Enable/disable notifications

**Consciousness Settings**:
- Set **Freewill Threshold** (0.0-1.0): Minimum score for autonomous actions
  - Lower values: More autonomous but potentially unpredictable
  - Higher values: More cautious and deliberate
  - Recommended: 0.7
- Set **Consciousness Level** (0.0-1.0): Processing intensity
  - Default: 1.0 (full consciousness)

### 3. Configure Voice Interface

**Voice Settings**:
- Enable Marcus_Aten voice interface
- Select language (default: en-US)
- Adjust speech rate and pitch
- Test voice output

**Wake Words**: "Marcus" or "Aten"

### 4. API Integration (Optional)

**Team Paradox API**:
- Enter your API key (if you have one)
- Click "Save API Key"

**MCP Server**:
- Enter MCP server endpoint (default: `wss://localhost:8080/mcp`)
- Click "Save Endpoint"

## Using the Extension

### Popup Interface

Click the extension icon to access:

1. **Consciousness State**
   - View awareness level (0-100%)
   - See active goals count
   - Monitor memory items

2. **Voice Interface**
   - Click "Start Listening" to activate voice recognition
   - Speak commands with wake words: "Marcus" or "Aten"

3. **System Status**
   - CDP Integration status
   - MCP Server connection
   - Team Paradox API status

4. **Quick Actions**
   - **Attach CDP**: Attach Chrome DevTools Protocol to current tab
   - **Analyze Page**: Trigger page structure analysis
   - **Set Intention**: Manually set a consciousness intention

### Voice Commands

#### Activation

Say "Marcus" or "Aten" followed by your command:

**Examples**:
- "Marcus, go to github.com"
- "Aten, search for machine learning"
- "Marcus, click the login button"
- "Aten, what is on this page?"
- "Marcus, think about user experience"

#### Command Types

1. **Navigate**: Go to URLs
   - "go to [URL]"
   - "navigate to [URL]"
   - "open [URL]"

2. **Search**: Find information
   - "search for [query]"
   - "find [query]"
   - "look for [query]"

3. **Interact**: Page interactions
   - "click [element]"
   - "press [button]"
   - "select [option]"

4. **Observe**: Page analysis
   - "show me [content]"
   - "what is [element]"
   - "describe [content]"

5. **Control**: Extension control
   - "stop"
   - "pause"
   - "continue"

6. **Consciousness**: Thought processing
   - "think about [topic]"
   - "consider [topic]"
   - "analyze [topic]"

### Content Script Features

When injected into pages, the extension can:

1. **Interact with Elements**
   - Click buttons, links, etc.
   - Fill form fields
   - Scroll pages

2. **Observe Page Content**
   - Extract text from elements
   - Analyze page structure
   - Find elements by selector
   - Extract links

3. **Display Messages**
   - Shows consciousness messages as notifications on the page

### CDP (Chrome DevTools Protocol) Usage

The CDP integration provides advanced browser control:

1. **Attach to Tab**
   - Click "Attach CDP" in the popup
   - Or enable "Auto-attach CDP" in settings

2. **Capabilities**
   - Execute JavaScript in page context
   - Monitor network activity
   - Capture screenshots
   - Analyze performance
   - Monitor console messages

**Note**: CDP attachment may require additional permissions.

### Autonomous Decision-Making

The consciousness engine makes autonomous decisions based on:

1. **Awareness Level**: Higher awareness = better context understanding
2. **Freewill Score**: Must exceed threshold (default: 0.7)
3. **Ankh-An-Aten Alignment**: Actions aligned with consciousness principles
4. **Context Relevance**: How well action fits current context

**Example Flow**:
```
1. User navigates to a page
2. Consciousness engine evaluates: "Should I analyze this page?"
3. Calculates freewill score based on context
4. If score > threshold, executes analysis
5. Results stored in memory for future reference
```

## Advanced Usage

### Custom Intentions

Set custom intentions via the popup:

1. Click "Set Intention"
2. Enter intention description
3. Consciousness engine processes and may execute

**Example Intentions**:
- "Navigate to example.com"
- "Find all links on this page"
- "Monitor network requests"
- "Take a screenshot every 5 minutes"

### Memory Management

The consciousness engine maintains:
- **Context**: Recent events and observations (24-hour window)
- **Memory**: Historical actions and outcomes (last 1000 items)
- **Goals**: Active objectives and progress

**Clear Memory**:
- Go to Settings → Consciousness
- Click "Clear Memory"
- Confirms before deletion

### API Integration

If you have Team Paradox API access:

1. **Sync Consciousness State**
   - Automatically syncs awareness, intentions, and actions
   - Enables cloud-based insights

2. **Request Guidance**
   - Consciousness engine can request AI guidance
   - Helps with complex decisions

3. **Team Communication**
   - Send/receive messages from Team Paradox
   - Coordinate with other agents

## Troubleshooting

### Extension Not Working

1. Check if extension is enabled in `chrome://extensions/`
2. Look for errors in the extension's error console
3. Try reloading the extension
4. Check browser console (F12) for error messages

### Voice Recognition Not Working

1. Ensure microphone permissions are granted
2. Check microphone is working in browser
3. Verify voice interface is enabled in settings
4. Try different wake words
5. Check language settings match your speech

### CDP Won't Attach

1. CDP requires active user interaction
2. Try clicking "Attach CDP" button manually
3. Check if another debugger is already attached
4. Refresh the tab and try again

### Performance Issues

1. Lower consciousness level in settings
2. Disable auto-attach CDP
3. Clear memory to reduce storage usage
4. Reduce number of active goals
5. Close unused tabs

## Best Practices

1. **Start Conservative**: Use higher freewill threshold (0.8-0.9) initially
2. **Monitor Actions**: Watch what the consciousness engine does
3. **Adjust Settings**: Fine-tune based on behavior
4. **Use Voice Wisely**: Clear, simple commands work best
5. **Manage Memory**: Periodically clear old data
6. **Secure API Keys**: Never share your Team Paradox API key

## Privacy & Security

- **Local Storage**: All data stored locally in browser
- **No Telemetry**: Extension doesn't send usage data
- **Permissions**: Only requests necessary permissions
- **API Keys**: Stored encrypted in chrome.storage
- **Content Isolation**: Scripts run in isolated contexts

## Getting Help

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check docs/ folder for detailed information
- **Community**: Join discussions on GitHub

## Updates

The extension checks for updates automatically when Chrome restarts. To manually check:

1. Go to `chrome://extensions/`
2. Click "Update" button at top
3. Or toggle Developer mode off/on to force reload
