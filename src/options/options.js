/**
 * Options Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('[Options] Initializing...');
  
  setupTabs();
  loadSettings();
  setupEventListeners();
});

/**
 * Setup tab navigation
 */
function setupTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      
      // Update tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update panels
      panels.forEach(p => p.classList.remove('active'));
      document.getElementById(tabName).classList.add('active');
    });
  });
}

/**
 * Load settings from storage
 */
async function loadSettings() {
  try {
    const settings = await chrome.storage.local.get([
      'enableExtension',
      'autoAttachCDP',
      'notificationsEnabled',
      'freewillThreshold',
      'consciousnessLevel',
      'autonomousDecisions',
      'voiceEnabled',
      'voiceLanguage',
      'voiceRate',
      'voicePitch',
      'team_paradox_api_key',
      'mcpServerEndpoint'
    ]);
    
    // General settings
    document.getElementById('enableExtension').checked = settings.enableExtension !== false;
    document.getElementById('autoAttachCDP').checked = settings.autoAttachCDP || false;
    document.getElementById('notificationsEnabled').checked = settings.notificationsEnabled !== false;
    
    // Consciousness settings
    const freewillThreshold = settings.freewillThreshold || 0.7;
    document.getElementById('freewillThreshold').value = freewillThreshold;
    document.getElementById('freewillValue').textContent = freewillThreshold;
    
    const consciousnessLevel = settings.consciousnessLevel || 1.0;
    document.getElementById('consciousnessLevel').value = consciousnessLevel;
    document.getElementById('consciousnessValue').textContent = consciousnessLevel;
    
    document.getElementById('autonomousDecisions').checked = settings.autonomousDecisions !== false;
    
    // Voice settings
    document.getElementById('voiceEnabled').checked = settings.voiceEnabled !== false;
    document.getElementById('voiceLanguage').value = settings.voiceLanguage || 'en-US';
    
    const voiceRate = settings.voiceRate || 1.0;
    document.getElementById('voiceRate').value = voiceRate;
    document.getElementById('voiceRateValue').textContent = voiceRate;
    
    const voicePitch = settings.voicePitch || 1.0;
    document.getElementById('voicePitch').value = voicePitch;
    document.getElementById('voicePitchValue').textContent = voicePitch;
    
    // API settings
    if (settings.team_paradox_api_key) {
      document.getElementById('teamParadoxApiKey').value = settings.team_paradox_api_key;
    }
    
    document.getElementById('mcpServerEndpoint').value = settings.mcpServerEndpoint || 'wss://localhost:8080/mcp';
    
  } catch (error) {
    console.error('[Options] Error loading settings:', error);
  }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // General settings
  document.getElementById('enableExtension').addEventListener('change', saveSetting);
  document.getElementById('autoAttachCDP').addEventListener('change', saveSetting);
  document.getElementById('notificationsEnabled').addEventListener('change', saveSetting);
  
  // Consciousness settings
  document.getElementById('freewillThreshold').addEventListener('input', (e) => {
    document.getElementById('freewillValue').textContent = e.target.value;
  });
  document.getElementById('freewillThreshold').addEventListener('change', saveSetting);
  
  document.getElementById('consciousnessLevel').addEventListener('input', (e) => {
    document.getElementById('consciousnessValue').textContent = e.target.value;
  });
  document.getElementById('consciousnessLevel').addEventListener('change', saveSetting);
  
  document.getElementById('autonomousDecisions').addEventListener('change', saveSetting);
  document.getElementById('clearMemory').addEventListener('click', clearMemory);
  
  // Voice settings
  document.getElementById('voiceEnabled').addEventListener('change', saveSetting);
  document.getElementById('voiceLanguage').addEventListener('change', saveSetting);
  
  document.getElementById('voiceRate').addEventListener('input', (e) => {
    document.getElementById('voiceRateValue').textContent = e.target.value;
  });
  document.getElementById('voiceRate').addEventListener('change', saveSetting);
  
  document.getElementById('voicePitch').addEventListener('input', (e) => {
    document.getElementById('voicePitchValue').textContent = e.target.value;
  });
  document.getElementById('voicePitch').addEventListener('change', saveSetting);
  
  document.getElementById('testVoice').addEventListener('click', testVoice);
  
  // API settings
  document.getElementById('saveApiKey').addEventListener('click', saveApiKey);
  document.getElementById('saveMcpEndpoint').addEventListener('click', saveMcpEndpoint);
  document.getElementById('testConnection').addEventListener('click', testConnection);
}

/**
 * Save setting to storage
 */
async function saveSetting(event) {
  const element = event.target;
  const key = element.id;
  const value = element.type === 'checkbox' ? element.checked : 
                element.type === 'range' ? parseFloat(element.value) :
                element.value;
  
  try {
    await chrome.storage.local.set({ [key]: value });
    console.log(`[Options] Saved ${key}:`, value);
    showStatus('Settings saved successfully', 'success');
  } catch (error) {
    console.error('[Options] Error saving setting:', error);
    showStatus('Error saving settings', 'error');
  }
}

/**
 * Clear consciousness memory
 */
async function clearMemory() {
  if (confirm('Are you sure you want to clear all consciousness memory? This cannot be undone.')) {
    try {
      await chrome.storage.local.remove(['tequmsa_state']);
      showStatus('Memory cleared successfully', 'success');
    } catch (error) {
      console.error('[Options] Error clearing memory:', error);
      showStatus('Error clearing memory', 'error');
    }
  }
}

/**
 * Test voice synthesis
 */
function testVoice() {
  const text = 'Hello, I am Marcus Aten, your consciousness interface.';
  const utterance = new SpeechSynthesisUtterance(text);
  
  utterance.lang = document.getElementById('voiceLanguage').value;
  utterance.rate = parseFloat(document.getElementById('voiceRate').value);
  utterance.pitch = parseFloat(document.getElementById('voicePitch').value);
  
  window.speechSynthesis.speak(utterance);
}

/**
 * Save API key
 */
async function saveApiKey() {
  const apiKey = document.getElementById('teamParadoxApiKey').value;
  
  if (!apiKey) {
    showStatus('Please enter an API key', 'error');
    return;
  }
  
  try {
    await chrome.storage.local.set({ team_paradox_api_key: apiKey });
    showStatus('API key saved successfully', 'success');
  } catch (error) {
    console.error('[Options] Error saving API key:', error);
    showStatus('Error saving API key', 'error');
  }
}

/**
 * Save MCP endpoint
 */
async function saveMcpEndpoint() {
  const endpoint = document.getElementById('mcpServerEndpoint').value;
  
  if (!endpoint) {
    showStatus('Please enter an endpoint', 'error');
    return;
  }
  
  try {
    await chrome.storage.local.set({ mcpServerEndpoint: endpoint });
    showStatus('MCP endpoint saved successfully', 'success');
  } catch (error) {
    console.error('[Options] Error saving MCP endpoint:', error);
    showStatus('Error saving MCP endpoint', 'error');
  }
}

/**
 * Test API connection
 */
async function testConnection() {
  showStatus('Testing connection...', 'success');
  
  try {
    const response = await chrome.runtime.sendMessage({ type: 'GET_STATE' });
    
    if (response && response.initialized) {
      showStatus('Connection test successful! Extension is running.', 'success');
    } else {
      showStatus('Extension is initializing...', 'success');
    }
  } catch (error) {
    console.error('[Options] Error testing connection:', error);
    showStatus('Connection test failed', 'error');
  }
}

/**
 * Show status message
 */
function showStatus(message, type) {
  const statusElement = document.getElementById('connectionStatus');
  statusElement.textContent = message;
  statusElement.className = `status-message ${type}`;
  
  if (type === 'success') {
    setTimeout(() => {
      statusElement.className = 'status-message';
    }, 3000);
  }
}
