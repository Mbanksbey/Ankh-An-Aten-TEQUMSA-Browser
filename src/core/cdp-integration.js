/**
 * Chrome DevTools Protocol (CDP) Integration
 * Provides low-level browser control and monitoring capabilities
 */

export class CDPIntegration {
  constructor() {
    this.debuggees = new Map();
    this.eventHandlers = new Map();
    this.isEnabled = false;
  }

  /**
   * Initialize CDP integration
   */
  async initialize() {
    console.log('[CDP] Initializing Chrome DevTools Protocol integration...');
    
    // Set up debugger event listeners
    chrome.debugger.onEvent.addListener((source, method, params) => {
      this.handleDebuggerEvent(source, method, params);
    });
    
    chrome.debugger.onDetach.addListener((source, reason) => {
      this.handleDebuggerDetach(source, reason);
    });
    
    this.isEnabled = true;
    return this;
  }

  /**
   * Attach debugger to a tab
   */
  async attachToTab(tabId, protocolVersion = '1.3') {
    try {
      const debuggee = { tabId: tabId };
      
      await chrome.debugger.attach(debuggee, protocolVersion);
      console.log(`[CDP] Attached to tab ${tabId}`);
      
      this.debuggees.set(tabId, debuggee);
      
      // Enable domains
      await this.enableDomains(debuggee);
      
      return debuggee;
    } catch (error) {
      console.error('[CDP] Error attaching debugger:', error);
      throw error;
    }
  }

  /**
   * Enable CDP domains
   */
  async enableDomains(debuggee) {
    const domains = ['Page', 'Network', 'Runtime', 'DOM', 'Console', 'Performance'];
    
    for (const domain of domains) {
      try {
        await chrome.debugger.sendCommand(debuggee, `${domain}.enable`, {});
        console.log(`[CDP] Enabled ${domain} domain`);
      } catch (error) {
        console.warn(`[CDP] Could not enable ${domain} domain:`, error);
      }
    }
  }

  /**
   * Detach debugger from a tab
   */
  async detachFromTab(tabId) {
    try {
      const debuggee = this.debuggees.get(tabId);
      if (debuggee) {
        await chrome.debugger.detach(debuggee);
        this.debuggees.delete(tabId);
        console.log(`[CDP] Detached from tab ${tabId}`);
      }
    } catch (error) {
      console.error('[CDP] Error detaching debugger:', error);
    }
  }

  /**
   * Send CDP command
   */
  async sendCommand(tabId, method, params = {}) {
    try {
      const debuggee = this.debuggees.get(tabId);
      if (!debuggee) {
        throw new Error(`No debugger attached to tab ${tabId}`);
      }
      
      const result = await chrome.debugger.sendCommand(debuggee, method, params);
      return result;
    } catch (error) {
      console.error(`[CDP] Error sending command ${method}:`, error);
      throw error;
    }
  }

  /**
   * Handle debugger events
   */
  handleDebuggerEvent(source, method, params) {
    console.log(`[CDP] Event: ${method}`, params);
    
    // Notify registered event handlers
    const handlers = this.eventHandlers.get(method) || [];
    handlers.forEach(handler => {
      try {
        handler(source, params);
      } catch (error) {
        console.error('[CDP] Error in event handler:', error);
      }
    });
  }

  /**
   * Handle debugger detach
   */
  handleDebuggerDetach(source, reason) {
    console.log('[CDP] Debugger detached:', reason);
    if (source.tabId) {
      this.debuggees.delete(source.tabId);
    }
  }

  /**
   * Register event handler
   */
  on(eventMethod, handler) {
    if (!this.eventHandlers.has(eventMethod)) {
      this.eventHandlers.set(eventMethod, []);
    }
    this.eventHandlers.get(eventMethod).push(handler);
  }

  /**
   * Unregister event handler
   */
  off(eventMethod, handler) {
    const handlers = this.eventHandlers.get(eventMethod);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  /**
   * Execute JavaScript in page context
   */
  async evaluateScript(tabId, expression, returnByValue = true) {
    return await this.sendCommand(tabId, 'Runtime.evaluate', {
      expression: expression,
      returnByValue: returnByValue
    });
  }

  /**
   * Get page DOM
   */
  async getDocument(tabId) {
    return await this.sendCommand(tabId, 'DOM.getDocument', {});
  }

  /**
   * Query DOM selectors
   */
  async querySelector(tabId, selector) {
    const doc = await this.getDocument(tabId);
    return await this.sendCommand(tabId, 'DOM.querySelector', {
      nodeId: doc.root.nodeId,
      selector: selector
    });
  }

  /**
   * Capture screenshot
   */
  async captureScreenshot(tabId, format = 'png', quality = 80) {
    return await this.sendCommand(tabId, 'Page.captureScreenshot', {
      format: format,
      quality: quality
    });
  }

  /**
   * Navigate to URL
   */
  async navigateToURL(tabId, url) {
    return await this.sendCommand(tabId, 'Page.navigate', {
      url: url
    });
  }

  /**
   * Get performance metrics
   */
  async getPerformanceMetrics(tabId) {
    return await this.sendCommand(tabId, 'Performance.getMetrics', {});
  }

  /**
   * Monitor network activity
   */
  async monitorNetwork(tabId, callback) {
    this.on('Network.requestWillBeSent', (source, params) => {
      if (source.tabId === tabId) {
        callback('request', params);
      }
    });
    
    this.on('Network.responseReceived', (source, params) => {
      if (source.tabId === tabId) {
        callback('response', params);
      }
    });
  }

  /**
   * Monitor console messages
   */
  async monitorConsole(tabId, callback) {
    this.on('Console.messageAdded', (source, params) => {
      if (source.tabId === tabId) {
        callback(params.message);
      }
    });
  }

  /**
   * Get all attached debuggees
   */
  getAttachedDebuggees() {
    return Array.from(this.debuggees.values());
  }

  /**
   * Check if attached to tab
   */
  isAttachedToTab(tabId) {
    return this.debuggees.has(tabId);
  }
}
