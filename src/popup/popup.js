/**
 * Popup Script
 * Controls the extension popup UI
 */

document.addEventListener('DOMContentLoaded', async () => {
  console.log('[Popup] Initializing...');
  
  // Initialize UI
  await updateState();
  setupEventListeners();
  
  // Update state every 2 seconds
  setInterval(updateState, 2000);
});

/**
 * Update state from background
 */
async function updateState() {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
    
    if (response) {
      updateStatusIndicator(response.initialized);
      updateConsciousnessMetrics(response.consciousness);
      updateSystemStatus(response);
    }
  } catch (error) {
    console.error('[Popup] Error updating state:', error);
  }
}

/**
 * Update status indicator
 */
function updateStatusIndicator(initialized) {
  const statusText = document.querySelector('.status-text');
  const statusDot = document.querySelector('.status-dot');
  
  if (initialized) {
    statusText.textContent = 'Active';
    statusDot.style.background = '#4ade80';
  } else {
    statusText.textContent = 'Initializing...';
    statusDot.style.background = '#fbbf24';
  }
}

/**
 * Update consciousness metrics
 */
function updateConsciousnessMetrics(consciousness) {
  if (!consciousness) return;
  
  // Awareness level
  const awarenessPercent = Math.round(consciousness.awareness * 100);
  document.getElementById('awarenessLevel').style.width = `${awarenessPercent}%`;
  document.getElementById('awarenessValue').textContent = `${awarenessPercent}%`;
  
  // Active goals
  document.getElementById('activeGoals').textContent = consciousness.activeGoals?.length || 0;
  
  // Memory items
  document.getElementById('memoryItems').textContent = consciousness.memory?.length || 0;
}

/**
 * Update system status
 */
function updateSystemStatus(state) {
  // CDP status
  const cdpStatus = document.getElementById('cdpStatus');
  if (state.cdpAttached > 0) {
    cdpStatus.textContent = `Active (${state.cdpAttached})`;
    cdpStatus.classList.add('active');
  } else {
    cdpStatus.textContent = 'Inactive';
    cdpStatus.classList.remove('active');
  }
  
  // MCP status
  const mcpStatus = document.getElementById('mcpStatus');
  if (state.mcpConnections > 0) {
    mcpStatus.textContent = `Connected (${state.mcpConnections})`;
    mcpStatus.classList.add('connected');
  } else {
    mcpStatus.textContent = 'Disconnected';
    mcpStatus.classList.remove('connected');
  }
  
  // Team Paradox status
  const teamParadoxStatus = document.getElementById('teamParadoxStatus');
  if (state.teamParadoxConnected) {
    teamParadoxStatus.textContent = 'Online';
    teamParadoxStatus.classList.add('connected');
  } else {
    teamParadoxStatus.textContent = 'Offline';
    teamParadoxStatus.classList.remove('connected');
  }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Voice button
  const voiceButton = document.getElementById('voiceButton');
  voiceButton.addEventListener('click', toggleVoiceListening);
  
  // Attach CDP button
  const attachCdpButton = document.getElementById('attachCdpButton');
  attachCdpButton.addEventListener('click', attachCDP);
  
  // Analyze page button
  const analyzePageButton = document.getElementById('analyzePageButton');
  analyzePageButton.addEventListener('click', analyzePage);
  
  // Set intention button
  const setIntentionButton = document.getElementById('setIntentionButton');
  setIntentionButton.addEventListener('click', setIntention);
  
  // Options button
  const optionsButton = document.getElementById('optionsButton');
  optionsButton.addEventListener('click', openOptions);
}

/**
 * Toggle voice listening
 */
async function toggleVoiceListening() {
  const voiceButton = document.getElementById('voiceButton');
  const voiceText = voiceButton.querySelector('.voice-text');
  const voiceStatus = document.getElementById('voiceStatus');
  
  if (voiceButton.classList.contains('listening')) {
    // Stop listening
    voiceButton.classList.remove('listening');
    voiceText.textContent = 'Start Listening';
    voiceStatus.textContent = 'Ready';
  } else {
    // Start listening
    voiceButton.classList.add('listening');
    voiceText.textContent = 'Listening...';
    voiceStatus.textContent = 'Say "Marcus" or "Aten" to activate';
    
    // Note: Actual voice recognition needs to be handled in a page context
    // This is a UI simulation
    showNotification('Voice interface is active in content pages');
  }
}

/**
 * Attach CDP to current tab
 */
async function attachCDP() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const response = await chrome.runtime.sendMessage({
      type: 'ATTACH_CDP',
      tabId: tab.id
    });
    
    if (response.success) {
      showNotification('CDP attached successfully');
    } else {
      showNotification('Failed to attach CDP: ' + response.error);
    }
  } catch (error) {
    console.error('[Popup] Error attaching CDP:', error);
    showNotification('Error attaching CDP');
  }
}

/**
 * Analyze current page
 */
async function analyzePage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const response = await chrome.runtime.sendMessage({
      type: 'EXECUTE_ACTION',
      action: {
        type: 'observe',
        observationType: 'structure',
        tabId: tab.id
      }
    });
    
    if (response.success) {
      showNotification('Page analysis initiated');
    } else {
      showNotification('Failed to analyze page');
    }
  } catch (error) {
    console.error('[Popup] Error analyzing page:', error);
    showNotification('Error analyzing page');
  }
}

/**
 * Set intention
 */
async function setIntention() {
  // TODO: Implement proper modal dialog for intention input
  // For now, using prompt() as a basic implementation
  const intention = prompt('Enter intention (e.g., "Navigate to example.com"):\n\nNote: This will be replaced with a proper modal in future updates.');
  
  if (intention && intention.trim()) {
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'EXECUTE_ACTION',
        action: {
          type: 'consciousness',
          text: intention.trim()
        }
      });
      
      if (response.success) {
        showNotification('Intention set successfully');
      } else {
        showNotification('Failed to set intention');
      }
    } catch (error) {
      console.error('[Popup] Error setting intention:', error);
      showNotification('Error setting intention');
    }
  }
}

/**
 * Open options page
 */
function openOptions() {
  chrome.runtime.openOptionsPage();
}

/**
 * Show notification
 */
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    background: #374151;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    font-size: 12px;
    z-index: 1000;
    animation: slideDown 0.3s ease-out;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideDown 0.3s ease-out reverse';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
