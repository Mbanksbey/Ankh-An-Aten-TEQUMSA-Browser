# Ankh-An-Aten TEQUMSA Browser - API Reference

## Core Classes

### TEQUMSAConsciousness

Main consciousness engine for autonomous decision-making.

#### Constructor

```javascript
const consciousness = new TEQUMSAConsciousness();
```

#### Methods

##### `async initialize()`

Initialize the consciousness engine.

**Returns**: `Promise<TEQUMSAConsciousness>` - The initialized instance

**Example**:
```javascript
await consciousness.initialize();
```

##### `setIntention(intention)`

Set an intention for autonomous action.

**Parameters**:
- `intention` (Object):
  - `action` (Object): Action to perform
  - `context` (Object): Context information
  - `autonomous` (Boolean): Whether action is autonomous

**Example**:
```javascript
consciousness.setIntention({
  action: {
    type: 'navigate',
    url: 'https://example.com'
  },
  context: { source: 'user' },
  autonomous: true
});
```

##### `updateContext(key, value)`

Update consciousness context with new information.

**Parameters**:
- `key` (String): Context key
- `value` (Any): Context value

**Example**:
```javascript
consciousness.updateContext('currentUrl', 'https://example.com');
```

##### `addGoal(goal)`

Add a new goal to active goals.

**Parameters**:
- `goal` (Object): Goal description

**Example**:
```javascript
consciousness.addGoal({
  name: 'Analyze page structure',
  priority: 'high'
});
```

##### `getState()`

Get current consciousness state.

**Returns**: `Object` - Current state including awareness, goals, and memory

**Example**:
```javascript
const state = consciousness.getState();
console.log('Awareness:', state.awareness);
```

---

### CDPIntegration

Chrome DevTools Protocol integration for browser control.

#### Constructor

```javascript
const cdp = new CDPIntegration();
```

#### Methods

##### `async initialize()`

Initialize CDP integration.

**Returns**: `Promise<CDPIntegration>` - The initialized instance

##### `async attachToTab(tabId, protocolVersion = '1.3')`

Attach debugger to a tab.

**Parameters**:
- `tabId` (Number): Tab ID to attach to
- `protocolVersion` (String): CDP protocol version

**Returns**: `Promise<Object>` - Debuggee object

**Example**:
```javascript
const debuggee = await cdp.attachToTab(123);
```

##### `async detachFromTab(tabId)`

Detach debugger from a tab.

**Parameters**:
- `tabId` (Number): Tab ID to detach from

##### `async sendCommand(tabId, method, params = {})`

Send CDP command.

**Parameters**:
- `tabId` (Number): Tab ID
- `method` (String): CDP method name
- `params` (Object): Method parameters

**Returns**: `Promise<Object>` - Command result

**Example**:
```javascript
const result = await cdp.sendCommand(123, 'Runtime.evaluate', {
  expression: 'document.title'
});
```

##### `async evaluateScript(tabId, expression, returnByValue = true)`

Execute JavaScript in page context.

**Parameters**:
- `tabId` (Number): Tab ID
- `expression` (String): JavaScript code
- `returnByValue` (Boolean): Return result as value

**Returns**: `Promise<Object>` - Evaluation result

**Example**:
```javascript
const result = await cdp.evaluateScript(123, 'document.body.innerText');
```

##### `async captureScreenshot(tabId, format = 'png', quality = 80)`

Capture page screenshot.

**Parameters**:
- `tabId` (Number): Tab ID
- `format` (String): Image format ('png' or 'jpeg')
- `quality` (Number): JPEG quality (0-100)

**Returns**: `Promise<Object>` - Screenshot data

##### `on(eventMethod, handler)`

Register CDP event handler.

**Parameters**:
- `eventMethod` (String): CDP event name
- `handler` (Function): Event handler function

**Example**:
```javascript
cdp.on('Network.requestWillBeSent', (source, params) => {
  console.log('Request:', params.request.url);
});
```

---

### MCPServerIntegration

Model Context Protocol server integration.

#### Constructor

```javascript
const mcp = new MCPServerIntegration();
```

#### Methods

##### `async initialize(config = {})`

Initialize MCP integration.

**Parameters**:
- `config` (Object):
  - `serverEndpoint` (String): MCP server endpoint
  - `reconnectInterval` (Number): Reconnection interval in ms
  - `maxReconnectAttempts` (Number): Max reconnection attempts

**Returns**: `Promise<MCPServerIntegration>` - The initialized instance

##### `async connectToServer(serverId, endpoint)`

Connect to MCP server.

**Parameters**:
- `serverId` (String): Server identifier
- `endpoint` (String): Server endpoint URL

**Returns**: `Promise<Object>` - Connection object

##### `async sendMessage(serverId, message)`

Send message to MCP server.

**Parameters**:
- `serverId` (String): Server ID
- `message` (Object): Message to send

**Returns**: `Promise<Object>` - Server response

**Example**:
```javascript
const response = await mcp.sendMessage('default', {
  type: 'query',
  data: { query: 'What is the current context?' }
});
```

##### `async requestContext(serverId, contextRequest)`

Request context from MCP server.

**Parameters**:
- `serverId` (String): Server ID
- `contextRequest` (Object): Context request details

##### `async subscribe(serverId, eventType, callback)`

Subscribe to MCP server events.

**Parameters**:
- `serverId` (String): Server ID
- `eventType` (String): Event type
- `callback` (Function): Event callback

**Returns**: `Promise<String>` - Subscription ID

---

### MarcusAtenVoiceInterface

Web Speech API integration for voice interaction.

#### Constructor

```javascript
const voice = new MarcusAtenVoiceInterface();
```

#### Methods

##### `async initialize()`

Initialize voice interface.

**Returns**: `Promise<MarcusAtenVoiceInterface>` - The initialized instance

##### `async startListening()`

Start listening for voice commands.

**Returns**: `Promise<Boolean>` - Success status

##### `stopListening()`

Stop listening for voice commands.

##### `speak(text, options = {})`

Speak text using speech synthesis.

**Parameters**:
- `text` (String): Text to speak
- `options` (Object):
  - `lang` (String): Language code
  - `rate` (Number): Speech rate (0.1-10)
  - `pitch` (Number): Voice pitch (0-2)
  - `volume` (Number): Volume (0-1)

**Example**:
```javascript
voice.speak('Hello, I am Marcus Aten', {
  rate: 1.0,
  pitch: 1.0
});
```

##### `registerCommandHandler(action, handler)`

Register custom voice command handler.

**Parameters**:
- `action` (String): Action name
- `handler` (Function): Handler function

**Example**:
```javascript
voice.registerCommandHandler('navigate', async (command) => {
  console.log('Navigate to:', command.text);
  // Custom navigation logic
});
```

##### `getAvailableVoices()`

Get available speech synthesis voices.

**Returns**: `Array<SpeechSynthesisVoice>` - Available voices

---

### TeamParadoxAPI

Team Paradox backend API integration.

#### Constructor

```javascript
const api = new TeamParadoxAPI();
```

#### Methods

##### `async initialize(config = {})`

Initialize API integration.

**Parameters**:
- `config` (Object):
  - `apiEndpoint` (String): API endpoint URL

**Returns**: `Promise<TeamParadoxAPI>` - The initialized instance

##### `async authenticate()`

Authenticate with Team Paradox API.

**Returns**: `Promise<Boolean>` - Authentication success

##### `async sendConsciousnessState(state)`

Send consciousness state to API.

**Parameters**:
- `state` (Object): Consciousness state object

**Returns**: `Promise<Object>` - API response

##### `async sendActionReport(action)`

Report executed action to API.

**Parameters**:
- `action` (Object): Action details

##### `async requestGuidance(context)`

Request AI guidance from API.

**Parameters**:
- `context` (Object): Context information

**Returns**: `Promise<Object>` - Guidance response

##### `async submitFreewillDecision(decision)`

Submit autonomous decision to API.

**Parameters**:
- `decision` (Object): Decision details

---

## Chrome Extension APIs

### Message Passing

#### Background → Content Script

```javascript
// Send message to content script
chrome.tabs.sendMessage(tabId, {
  type: 'INTERACT',
  action: {
    interactionType: 'click',
    selector: '#button'
  }
});
```

#### Content Script → Background

```javascript
// Send message to background
chrome.runtime.sendMessage({
  type: 'VOICE_COMMAND',
  command: { action: 'navigate', text: 'google.com' }
});
```

#### Popup → Background

```javascript
// Get state from background
const response = await chrome.runtime.sendMessage({ 
  type: 'GET_STATE' 
});
```

### Message Types

#### `GET_STATE`

Get extension state from background.

**Response**:
```javascript
{
  initialized: Boolean,
  consciousness: Object,
  activeTab: Number,
  cdpAttached: Number,
  mcpConnections: Number,
  teamParadoxConnected: Boolean
}
```

#### `VOICE_COMMAND`

Process voice command.

**Request**:
```javascript
{
  type: 'VOICE_COMMAND',
  command: {
    action: String,
    text: String,
    raw: String
  }
}
```

#### `EXECUTE_ACTION`

Execute autonomous action.

**Request**:
```javascript
{
  type: 'EXECUTE_ACTION',
  action: {
    type: String,
    // ...action-specific fields
  }
}
```

#### `ATTACH_CDP` / `DETACH_CDP`

Attach/detach CDP to tab.

**Request**:
```javascript
{
  type: 'ATTACH_CDP',
  tabId: Number
}
```

#### `INTERACT`

Page interaction (Content Script).

**Request**:
```javascript
{
  type: 'INTERACT',
  action: {
    interactionType: 'click' | 'input' | 'scroll',
    selector: String,
    text: String,      // for input
    direction: String, // for scroll
    amount: Number     // for scroll
  }
}
```

#### `OBSERVE`

Page observation (Content Script).

**Request**:
```javascript
{
  type: 'OBSERVE',
  action: {
    observationType: 'text' | 'structure' | 'elements' | 'links',
    selector: String
  }
}
```

---

## Storage Schema

### chrome.storage.local

#### `tequmsa_state`

Consciousness engine state.

```javascript
{
  awareness: Number,
  intention: Object,
  context: Object,
  memory: Array,
  activeGoals: Array
}
```

#### `voice_preferences`

Voice interface preferences.

```javascript
{
  lang: String,
  rate: Number,
  pitch: Number,
  volume: Number
}
```

#### `team_paradox_api_key`

Team Paradox API key (String).

#### `mcpServerEndpoint`

MCP server endpoint (String).

---

## Events

### CDP Events

Listen to CDP events:

```javascript
cdp.on('Network.requestWillBeSent', (source, params) => {
  console.log('Request:', params.request.url);
});

cdp.on('Console.messageAdded', (source, params) => {
  console.log('Console:', params.message);
});
```

### MCP Events

Subscribe to MCP server events:

```javascript
await mcp.subscribe('default', 'context_update', (data) => {
  console.log('Context updated:', data);
});
```

---

## Type Definitions

### Intention

```typescript
interface Intention {
  action: Action;
  context: Object;
  autonomous: boolean;
  timestamp?: number;
  freewillScore?: number;
}
```

### Action

```typescript
interface Action {
  type: 'navigate' | 'interact' | 'observe' | 'communicate';
  // type-specific fields
}
```

### Goal

```typescript
interface Goal {
  id?: number;
  name: string;
  priority?: string;
  status?: 'active' | 'completed' | 'failed';
  progress?: number;
}
```
