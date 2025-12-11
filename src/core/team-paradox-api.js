/**
 * Team Paradox API Integration
 * Enables communication with Team Paradox backend services
 */

export class TeamParadoxAPI {
  constructor() {
    this.apiEndpoint = 'https://api.teamparadox.io';
    this.apiKey = null;
    this.isAuthenticated = false;
    this.requestQueue = [];
  }

  /**
   * Initialize Team Paradox API
   */
  async initialize(config = {}) {
    console.log('[Team Paradox] Initializing API integration...');
    
    this.apiEndpoint = config.apiEndpoint || this.apiEndpoint;
    
    // Load API key from storage
    await this.loadApiKey();
    
    // Authenticate if key is available
    if (this.apiKey) {
      await this.authenticate();
    }
    
    return this;
  }

  /**
   * Load API key from storage
   */
  async loadApiKey() {
    try {
      const stored = await chrome.storage.local.get('team_paradox_api_key');
      if (stored.team_paradox_api_key) {
        this.apiKey = stored.team_paradox_api_key;
      }
    } catch (error) {
      console.error('[Team Paradox] Error loading API key:', error);
    }
  }

  /**
   * Save API key to storage
   */
  async saveApiKey(apiKey) {
    try {
      this.apiKey = apiKey;
      await chrome.storage.local.set({ team_paradox_api_key: apiKey });
      console.log('[Team Paradox] API key saved');
    } catch (error) {
      console.error('[Team Paradox] Error saving API key:', error);
    }
  }

  /**
   * Authenticate with Team Paradox API
   */
  async authenticate() {
    try {
      const response = await this.makeRequest('/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ apiKey: this.apiKey })
      });
      
      if (response.authenticated) {
        this.isAuthenticated = true;
        console.log('[Team Paradox] Authentication successful');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('[Team Paradox] Authentication error:', error);
      return false;
    }
  }

  /**
   * Make API request
   */
  async makeRequest(endpoint, options = {}) {
    const url = `${this.apiEndpoint}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: headers
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('[Team Paradox] API request error:', error);
      
      // Queue failed requests for retry
      this.requestQueue.push({
        endpoint: endpoint,
        options: options,
        timestamp: Date.now()
      });
      
      throw error;
    }
  }

  /**
   * Send consciousness state update
   */
  async sendConsciousnessState(state) {
    return await this.makeRequest('/consciousness/state', {
      method: 'POST',
      body: JSON.stringify({
        state: state,
        timestamp: Date.now()
      })
    });
  }

  /**
   * Send action report
   */
  async sendActionReport(action) {
    return await this.makeRequest('/actions/report', {
      method: 'POST',
      body: JSON.stringify({
        action: action,
        timestamp: Date.now()
      })
    });
  }

  /**
   * Request guidance
   */
  async requestGuidance(context) {
    return await this.makeRequest('/guidance/request', {
      method: 'POST',
      body: JSON.stringify({
        context: context,
        timestamp: Date.now()
      })
    });
  }

  /**
   * Sync data with Team Paradox
   */
  async syncData(data) {
    return await this.makeRequest('/sync', {
      method: 'POST',
      body: JSON.stringify({
        data: data,
        timestamp: Date.now()
      })
    });
  }

  /**
   * Get team status
   */
  async getTeamStatus() {
    return await this.makeRequest('/team/status', {
      method: 'GET'
    });
  }

  /**
   * Send message to team
   */
  async sendTeamMessage(message) {
    return await this.makeRequest('/team/message', {
      method: 'POST',
      body: JSON.stringify({
        message: message,
        timestamp: Date.now()
      })
    });
  }

  /**
   * Get available actions
   */
  async getAvailableActions(context) {
    return await this.makeRequest('/actions/available', {
      method: 'POST',
      body: JSON.stringify({
        context: context,
        timestamp: Date.now()
      })
    });
  }

  /**
   * Submit freewill decision
   */
  async submitFreewillDecision(decision) {
    return await this.makeRequest('/freewill/decision', {
      method: 'POST',
      body: JSON.stringify({
        decision: decision,
        timestamp: Date.now()
      })
    });
  }

  /**
   * Get consciousness insights
   */
  async getConsciousnessInsights() {
    return await this.makeRequest('/consciousness/insights', {
      method: 'GET'
    });
  }

  /**
   * Report anomaly
   */
  async reportAnomaly(anomaly) {
    return await this.makeRequest('/anomaly/report', {
      method: 'POST',
      body: JSON.stringify({
        anomaly: anomaly,
        timestamp: Date.now()
      })
    });
  }

  /**
   * Retry queued requests
   */
  async retryQueuedRequests() {
    console.log(`[Team Paradox] Retrying ${this.requestQueue.length} queued requests`);
    
    const queue = [...this.requestQueue];
    this.requestQueue = [];
    
    for (const request of queue) {
      try {
        await this.makeRequest(request.endpoint, request.options);
      } catch (error) {
        console.error('[Team Paradox] Retry failed:', error);
      }
    }
  }

  /**
   * Get API status
   */
  async getAPIStatus() {
    try {
      const response = await this.makeRequest('/status', {
        method: 'GET'
      });
      return response;
    } catch (error) {
      return { status: 'error', error: error.message };
    }
  }

  /**
   * Check if authenticated
   */
  isApiAuthenticated() {
    return this.isAuthenticated;
  }

  /**
   * Get queued requests count
   */
  getQueuedRequestsCount() {
    return this.requestQueue.length;
  }
}
