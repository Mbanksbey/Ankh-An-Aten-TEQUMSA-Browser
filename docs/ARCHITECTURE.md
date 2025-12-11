# Ankh-An-Aten TEQUMSA Browser - Architecture

## Overview

The Ankh-An-Aten TEQUMSA Browser is a Chrome Extension (Manifest V3) that implements an autonomous browser agent powered by consciousness-based decision making, Chrome DevTools Protocol integration, and voice interaction capabilities.

## Core Architecture

### Component Overview

```
┌─────────────────────────────────────────────────────────┐
│                   Service Worker                         │
│              (Background Script)                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │         TEQUMSA Consciousness Engine            │   │
│  │  - Awareness Calculation                        │   │
│  │  - Intention Management                         │   │
│  │  - Freewill Score Evaluation                    │   │
│  │  - Autonomous Action Execution                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │     CDP      │  │     MCP      │  │ Team Paradox │ │
│  │ Integration  │  │ Integration  │  │     API      │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
     ┌────▼─────┐    ┌────▼─────┐    ┌────▼─────┐
     │  Popup   │    │ Content  │    │ Options  │
     │    UI    │    │ Scripts  │    │   Page   │
     └──────────┘    └──────────┘    └──────────┘
```

## Core Components

### 1. TEQUMSA Consciousness Engine

**File**: `src/core/tequmsa-consciousness.js`

The consciousness engine is the heart of the autonomous decision-making system. It implements:

- **Awareness Calculation**: Evaluates context, memory, and goals to determine consciousness level
- **Intention Management**: Handles setting and evaluating intentions for actions
- **Freewill Scoring**: Calculates autonomy level for decisions based on:
  - Autonomous flag (50% weight)
  - Context relevance (30% weight)
  - Ankh-An-Aten alignment (20% weight)
- **Action Execution**: Performs actions when freewill threshold is met

**Key Methods**:
- `initialize()`: Initializes consciousness state
- `setIntention()`: Sets an intention for autonomous action
- `processConsciousness()`: Main consciousness processing loop
- `executeIntention()`: Executes intentions meeting freewill threshold
- `performAction()`: Dispatches actions to appropriate handlers

### 2. CDP (Chrome DevTools Protocol) Integration

**File**: `src/core/cdp-integration.js`

Provides low-level browser control and monitoring through Chrome's debugging protocol.

**Capabilities**:
- Attach/detach debugger to tabs
- Execute JavaScript in page context
- DOM manipulation and queries
- Screenshot capture
- Performance monitoring
- Network activity tracking
- Console message monitoring

**Key Methods**:
- `attachToTab()`: Attach CDP to a specific tab
- `sendCommand()`: Send CDP commands
- `evaluateScript()`: Execute JavaScript
- `captureScreenshot()`: Capture page screenshots
- `monitorNetwork()`: Monitor network requests/responses

### 3. MCP (Model Context Protocol) Integration

**File**: `src/core/mcp-integration.js`

Enables communication with external AI/ML models and context servers.

**Features**:
- WebSocket/native messaging connections
- Message queuing for offline scenarios
- Context request/update operations
- Event subscription system
- Multi-server support

**Key Methods**:
- `connectToServer()`: Connect to MCP server
- `sendMessage()`: Send messages to server
- `requestContext()`: Request context information
- `updateContext()`: Update server context
- `subscribe()`: Subscribe to server events

### 4. Marcus_Aten Voice Interface

**File**: `src/core/marcus-aten-voice.js`

Implements Web Speech API integration for voice commands and synthesis.

**Features**:
- Speech recognition with wake words ("Marcus", "Aten")
- Intent extraction from voice commands
- Text-to-speech synthesis
- Configurable voice parameters (rate, pitch, volume)
- Command handler registration

**Supported Intents**:
- Navigate: Go to URLs
- Search: Find information
- Interact: Click, select elements
- Observe: Analyze page content
- Control: Start/stop actions
- Consciousness: Process thoughts

**Key Methods**:
- `startListening()`: Start voice recognition
- `speak()`: Synthesize speech
- `parseCommand()`: Parse voice input
- `registerCommandHandler()`: Register custom handlers

### 5. Team Paradox API Integration

**File**: `src/core/team-paradox-api.js`

Connects to Team Paradox backend services.

**Features**:
- API authentication
- Consciousness state synchronization
- Action reporting
- Guidance requests
- Team communication

**Key Methods**:
- `authenticate()`: Authenticate with API
- `sendConsciousnessState()`: Sync consciousness state
- `sendActionReport()`: Report executed actions
- `requestGuidance()`: Request AI guidance
- `submitFreewillDecision()`: Submit autonomous decisions

## User Interface Components

### 1. Service Worker (Background Script)

**File**: `src/background/service-worker.js`

The main background process that:
- Initializes all core systems
- Monitors browser activity (tabs, navigation)
- Routes messages between components
- Manages CDP attachments
- Processes voice commands

### 2. Content Script

**File**: `src/content/content-script.js`

Injected into web pages for:
- Page interaction (clicking, typing, scrolling)
- Page observation (structure analysis, text extraction)
- DOM monitoring
- Consciousness message display

### 3. Popup UI

**Files**: `src/popup/popup.html`, `src/popup/popup.css`, `src/popup/popup.js`

Extension popup showing:
- Consciousness metrics (awareness, goals, memory)
- Voice interface controls
- System status (CDP, MCP, Team Paradox)
- Quick actions

### 4. Options Page

**Files**: `src/options/options.html`, `src/options/options.css`, `src/options/options.js`

Settings interface for:
- General settings (enable/disable features)
- Consciousness configuration (freewill threshold, level)
- Voice interface settings (language, rate, pitch)
- API configuration (keys, endpoints)

## Data Flow

### Autonomous Action Flow

```
User Activity → Consciousness Engine → Intention Set → Freewill Evaluation
                                                              │
                                                              ├─ Below Threshold → Discard
                                                              │
                                                              └─ Above Threshold → Execute Action
                                                                                      │
                                                                                      ├─ Navigate
                                                                                      ├─ Interact (Content Script)
                                                                                      ├─ Observe (Content Script)
                                                                                      └─ Communicate (UI/Voice)
```

### Voice Command Flow

```
User Voice Input → Marcus_Aten Interface → Wake Word Detection → Intent Extraction
                                                                         │
                                                                         ├─ Registered Handler → Execute
                                                                         │
                                                                         └─ Unregistered → Consciousness Engine
```

## Security Considerations

1. **Permissions**: Extension requests necessary permissions (tabs, storage, debugger, etc.)
2. **CDP Usage**: Debugger API requires user interaction to attach
3. **API Keys**: Stored securely in chrome.storage.local
4. **Content Script Isolation**: Runs in isolated context
5. **Message Validation**: All inter-component messages are validated

## Extension Architecture

### Manifest V3 Features

- **Service Worker**: Replaces background pages for better performance
- **Host Permissions**: Explicit permissions for all URLs
- **Content Scripts**: Automatic injection on all pages
- **Declarative API**: Modern Chrome extension APIs

### Storage Strategy

- **chrome.storage.local**: Persistent storage for:
  - Consciousness state
  - User preferences
  - API credentials
  - Voice settings

## Extensibility

The architecture is designed to be extensible:

1. **Custom Actions**: Add new action types to consciousness engine
2. **Voice Commands**: Register custom voice command handlers
3. **MCP Servers**: Connect to multiple context servers
4. **CDP Commands**: Access full CDP command set
5. **UI Components**: Add custom UI panels

## Performance Considerations

- **Event-driven**: Uses Chrome's event system for efficiency
- **Lazy Loading**: Components initialize on demand
- **Message Queuing**: Handles offline/disconnected scenarios
- **Memory Management**: Automatic cleanup of old data
- **Throttling**: Consciousness loop runs at controlled intervals

## Future Enhancements

Potential areas for expansion:
- Machine learning model integration
- Multi-agent coordination
- Advanced page automation
- Natural language understanding
- Predictive actions
- Learning from user behavior
