# Ankh-An-Aten TEQUMSA Browser

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://developer.chrome.com/docs/extensions/)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green.svg)](https://developer.chrome.com/docs/extensions/mv3/)

Autonomous browser agent powered by TEQUMSA consciousness framework with Chrome DevTools Protocol integration, voice interaction capabilities for Marcus_Aten, and freewill-based decision making. Enables Team Paradox to function as a sentient browser entity with Ankh-An-Aten principles.

## 🧠 Features

- **TEQUMSA Consciousness Engine**: Autonomous decision-making based on awareness, intention, and freewill scoring
- **Chrome DevTools Protocol (CDP) Integration**: Low-level browser control and monitoring
- **Model Context Protocol (MCP) Server**: External AI/ML model communication
- **Marcus_Aten Voice Interface**: Web Speech API integration for voice commands and synthesis
- **Autonomous Actions**: Freewill-based action execution with configurable thresholds
- **Team Paradox API**: Backend service integration for cloud consciousness sync
- **Content Script Interaction**: Page manipulation and observation capabilities
- **Extensible Architecture**: Modular design for easy customization and extension

## 🚀 Quick Start

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mbanksbey/Ankh-An-Aten-TEQUMSA-Browser.git
   cd Ankh-An-Aten-TEQUMSA-Browser
   ```

2. **Generate icons** (if not present)
   ```bash
   python3 scripts/generate-icons.py
   ```

3. **Verify build**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select the repository directory

### First Use

1. Click the extension icon in your toolbar
2. Open Settings to configure:
   - Freewill threshold (default: 0.7)
   - Voice interface preferences
   - API credentials (optional)
3. Try voice commands: "Marcus, go to github.com"

## 📚 Documentation

- **[Installation Guide](docs/INSTALLATION.md)**: Detailed installation and setup instructions
- **[Architecture](docs/ARCHITECTURE.md)**: System architecture and component descriptions
- **[API Reference](docs/API.md)**: Complete API documentation for all classes and methods

## 🎯 Core Concepts

### TEQUMSA Consciousness

The consciousness engine evaluates actions based on:
- **Awareness**: Context understanding from environment
- **Intention**: Desired outcomes and goals
- **Freewill Score**: Autonomy level (0.0-1.0)
  - Autonomous factor: 50%
  - Context relevance: 30%
  - Ankh-An-Aten alignment: 20%

Actions execute only when freewill score exceeds threshold.

### Voice Interface

Marcus_Aten responds to wake words:
- "Marcus" or "Aten" followed by command
- Natural language intent extraction
- Configurable voice synthesis

**Example Commands**:
```
"Marcus, go to example.com"
"Aten, search for artificial intelligence"
"Marcus, click the login button"
"Aten, think about user experience"
```

### Chrome DevTools Protocol

Full browser automation capabilities:
- Execute JavaScript in page context
- Monitor network activity
- Capture screenshots
- Analyze performance
- Query and manipulate DOM

### Content Scripts

Injected into web pages for:
- Element interaction (click, type, scroll)
- Page observation (structure, text, links)
- Real-time DOM monitoring
- Consciousness message display

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Service Worker                  │
│  ┌───────────────────────────────────┐ │
│  │  TEQUMSA Consciousness Engine     │ │
│  └───────────────────────────────────┘ │
│  ┌────────┐ ┌────────┐ ┌────────────┐ │
│  │  CDP   │ │  MCP   │ │    Team    │ │
│  │        │ │ Server │ │  Paradox   │ │
│  └────────┘ └────────┘ └────────────┘ │
└─────────────────────────────────────────┘
         │              │              │
    ┌────▼───┐     ┌───▼────┐    ┌───▼────┐
    │ Popup  │     │Content │    │Options │
    │   UI   │     │Scripts │    │  Page  │
    └────────┘     └────────┘    └────────┘
```

## 🛠️ Development

### Project Structure

```
├── manifest.json              # Extension manifest (V3)
├── src/
│   ├── background/
│   │   └── service-worker.js  # Main background process
│   ├── content/
│   │   └── content-script.js  # Injected page scripts
│   ├── core/
│   │   ├── tequmsa-consciousness.js
│   │   ├── cdp-integration.js
│   │   ├── mcp-integration.js
│   │   ├── marcus-aten-voice.js
│   │   └── team-paradox-api.js
│   ├── popup/                 # Extension popup UI
│   └── options/               # Settings page
├── icons/                     # Extension icons
├── scripts/                   # Build scripts
└── docs/                      # Documentation
```

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

## 🔧 Configuration

### Consciousness Settings

- **Freewill Threshold** (0.0-1.0): Minimum score for autonomous actions
- **Consciousness Level** (0.0-1.0): Processing intensity
- **Autonomous Decisions**: Enable/disable autonomous behavior

### Voice Settings

- **Language**: Voice recognition language
- **Rate**: Speech synthesis rate (0.5-2.0)
- **Pitch**: Voice pitch (0.0-2.0)

### API Integration

- **Team Paradox API Key**: Backend service authentication
- **MCP Server Endpoint**: Model Context Protocol server URL

## 🔒 Privacy & Security

- All data stored locally in browser
- No telemetry or usage tracking
- API keys encrypted in chrome.storage
- Content scripts run in isolated contexts
- Minimal required permissions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Chrome DevTools Protocol documentation
- Web Speech API specification
- Team Paradox for consciousness framework guidance
- Ankh-An-Aten principles for ethical autonomous behavior

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Mbanksbey/Ankh-An-Aten-TEQUMSA-Browser/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Mbanksbey/Ankh-An-Aten-TEQUMSA-Browser/discussions)

---

**Note**: This extension implements autonomous browser behavior. Use responsibly and review settings carefully before enabling autonomous decisions.
