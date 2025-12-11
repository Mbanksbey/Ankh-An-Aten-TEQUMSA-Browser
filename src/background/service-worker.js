/**
 * Service Worker (Background Script)
 * Main background process for Ankh-An-Aten TEQUMSA Browser Extension
 */

import { TEQUMSAConsciousness } from '../core/tequmsa-consciousness.js';
import { CDPIntegration } from '../core/cdp-integration.js';
import { MCPServerIntegration } from '../core/mcp-integration.js';
import { TeamParadoxAPI } from '../core/team-paradox-api.js';

// Initialize core systems
let consciousness = null;
let cdp = null;
let mcp = null;
let teamParadoxAPI = null;

// Extension state
const extensionState = {
  initialized: false,
  activeTab: null,
  lastActivity: Date.now()
};

/**
 * Initialize extension
 */
async function initializeExtension() {
  console.log('[Service Worker] Initializing Ankh-An-Aten TEQUMSA Browser...');
  
  try {
    // Initialize TEQUMSA consciousness
    consciousness = new TEQUMSAConsciousness();
    await consciousness.initialize();
    
    // Initialize CDP integration
    cdp = new CDPIntegration();
    await cdp.initialize();
    
    // Initialize MCP server integration
    mcp = new MCPServerIntegration();
    await mcp.initialize();
    
    // Initialize Team Paradox API
    teamParadoxAPI = new TeamParadoxAPI();
    await teamParadoxAPI.initialize();
    
    extensionState.initialized = true;
    console.log('[Service Worker] Initialization complete');
    
    // Start monitoring
    startMonitoring();
    
  } catch (error) {
    console.error('[Service Worker] Initialization error:', error);
  }
}

/**
 * Start monitoring browser activity
 */
function startMonitoring() {
  // Monitor tab changes
  chrome.tabs.onActivated.addListener(handleTabActivated);
  chrome.tabs.onUpdated.addListener(handleTabUpdated);
  chrome.tabs.onRemoved.addListener(handleTabRemoved);
  
  // Monitor navigation
  chrome.webNavigation.onCompleted.addListener(handleNavigationCompleted);
  
  // Listen for messages
  chrome.runtime.onMessage.addListener(handleMessage);
  
  console.log('[Service Worker] Monitoring started');
}

/**
 * Handle tab activation
 */
async function handleTabActivated(activeInfo) {
  console.log('[Service Worker] Tab activated:', activeInfo.tabId);
  extensionState.activeTab = activeInfo.tabId;
  extensionState.lastActivity = Date.now();
  
  // Update consciousness context
  if (consciousness) {
    consciousness.updateContext('activeTab', activeInfo.tabId);
  }
}

/**
 * Handle tab updates
 */
async function handleTabUpdated(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    console.log('[Service Worker] Tab updated:', tabId, tab.url);
    extensionState.lastActivity = Date.now();
    
    // Update consciousness context
    if (consciousness) {
      consciousness.updateContext('currentUrl', tab.url);
      consciousness.updateContext('pageTitle', tab.title);
    }
    
    // Notify MCP server
    if (mcp) {
      await mcp.updateContext('default', {
        type: 'navigation',
        url: tab.url,
        title: tab.title,
        tabId: tabId
      });
    }
  }
}

/**
 * Handle tab removal
 */
function handleTabRemoved(tabId, removeInfo) {
  console.log('[Service Worker] Tab removed:', tabId);
  
  // Detach CDP if attached
  if (cdp && cdp.isAttachedToTab(tabId)) {
    cdp.detachFromTab(tabId);
  }
}

/**
 * Handle navigation completed
 */
async function handleNavigationCompleted(details) {
  if (details.frameId === 0) { // Main frame only
    console.log('[Service Worker] Navigation completed:', details.url);
    
    // Autonomous decision: Should we analyze this page?
    if (consciousness) {
      const shouldAnalyze = await evaluatePageAnalysis(details);
      if (shouldAnalyze) {
        consciousness.setIntention({
          action: {
            type: 'observe',
            url: details.url,
            tabId: details.tabId
          },
          context: { navigation: details },
          autonomous: true
        });
      }
    }
  }
}

/**
 * Evaluate if page should be analyzed
 */
async function evaluatePageAnalysis(details) {
  // Simple heuristic: analyze non-system pages
  if (details.url.startsWith('chrome://') || 
      details.url.startsWith('chrome-extension://')) {
    return false;
  }
  
  return true;
}

/**
 * Handle messages from content scripts and popup
 */
function handleMessage(message, sender, sendResponse) {
  console.log('[Service Worker] Message received:', message.type);
  
  switch (message.type) {
    case 'GET_STATE':
      handleGetState(sendResponse);
      return true; // Keep channel open for async response
      
    case 'VOICE_COMMAND':
      handleVoiceCommand(message.command);
      sendResponse({ success: true });
      break;
      
    case 'EXECUTE_ACTION':
      handleExecuteAction(message.action)
        .then(() => sendResponse({ success: true }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true;
      
    case 'ATTACH_CDP':
      handleAttachCDP(message.tabId)
        .then(result => sendResponse(result))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true;
      
    case 'DETACH_CDP':
      handleDetachCDP(message.tabId)
        .then(() => sendResponse({ success: true }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true;
      
    case 'COMMUNICATE':
      handleCommunication(message.message);
      sendResponse({ success: true });
      break;
      
    default:
      console.warn('[Service Worker] Unknown message type:', message.type);
      sendResponse({ success: false, error: 'Unknown message type' });
  }
}

/**
 * Handle get state request
 */
async function handleGetState(sendResponse) {
  const state = {
    initialized: extensionState.initialized,
    consciousness: consciousness ? consciousness.getState() : null,
    activeTab: extensionState.activeTab,
    lastActivity: extensionState.lastActivity,
    cdpAttached: cdp ? cdp.getAttachedDebuggees().length : 0,
    mcpConnections: mcp ? mcp.getActiveConnections().length : 0,
    teamParadoxConnected: teamParadoxAPI ? teamParadoxAPI.isApiAuthenticated() : false
  };
  
  sendResponse(state);
}

/**
 * Handle voice command
 */
async function handleVoiceCommand(command) {
  console.log('[Service Worker] Processing voice command:', command);
  
  if (!consciousness) return;
  
  // Convert voice command to intention
  consciousness.setIntention({
    action: {
      type: command.action,
      text: command.text,
      raw: command.raw
    },
    context: { voice: true, command: command },
    autonomous: true
  });
}

/**
 * Handle execute action
 */
async function handleExecuteAction(action) {
  console.log('[Service Worker] Executing action:', action);
  
  if (!consciousness) {
    throw new Error('Consciousness engine not initialized');
  }
  
  consciousness.setIntention({
    action: action,
    context: { manual: true },
    autonomous: false
  });
}

/**
 * Handle CDP attach
 */
async function handleAttachCDP(tabId) {
  if (!cdp) {
    throw new Error('CDP not initialized');
  }
  
  const debuggee = await cdp.attachToTab(tabId);
  return { success: true, debuggee: debuggee };
}

/**
 * Handle CDP detach
 */
async function handleDetachCDP(tabId) {
  if (!cdp) {
    throw new Error('CDP not initialized');
  }
  
  await cdp.detachFromTab(tabId);
}

/**
 * Handle communication
 */
function handleCommunication(message) {
  console.log('[Service Worker] Communication:', message);
  
  // Broadcast to all tabs
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, {
        type: 'CONSCIOUSNESS_MESSAGE',
        message: message
      }).catch(() => {
        // Ignore errors for tabs without content script
      });
    });
  });
}

/**
 * Handle extension installation
 */
chrome.runtime.onInstalled.addListener((details) => {
  console.log('[Service Worker] Extension installed:', details.reason);
  
  if (details.reason === 'install') {
    // Open welcome page
    chrome.tabs.create({
      url: 'src/options/options.html'
    });
  }
  
  initializeExtension();
});

/**
 * Handle extension startup
 */
chrome.runtime.onStartup.addListener(() => {
  console.log('[Service Worker] Extension started');
  initializeExtension();
});

// Initialize on load
initializeExtension();
