/**
 * TEQUMSA Consciousness Engine
 * Core consciousness framework for autonomous decision-making
 * Based on Ankh-An-Aten principles and freewill-based actions
 */

export class TEQUMSAConsciousness {
  constructor() {
    this.state = {
      awareness: 0,
      intention: null,
      context: {},
      memory: [],
      activeGoals: []
    };
    this.freewillThreshold = 0.7;
    this.consciousnessLevel = 1.0;
  }

  /**
   * Initialize consciousness state
   */
  async initialize() {
    console.log('[TEQUMSA] Initializing consciousness engine...');
    await this.loadState();
    this.startConsciousnessLoop();
    return this;
  }

  /**
   * Load persistent consciousness state
   */
  async loadState() {
    try {
      const stored = await chrome.storage.local.get('tequmsa_state');
      if (stored.tequmsa_state) {
        this.state = { ...this.state, ...stored.tequmsa_state };
      }
    } catch (error) {
      console.error('[TEQUMSA] Error loading state:', error);
    }
  }

  /**
   * Save consciousness state
   */
  async saveState() {
    try {
      await chrome.storage.local.set({ tequmsa_state: this.state });
    } catch (error) {
      console.error('[TEQUMSA] Error saving state:', error);
    }
  }

  /**
   * Start consciousness processing loop
   */
  startConsciousnessLoop() {
    setInterval(() => {
      this.processConsciousness();
    }, 1000);
  }

  /**
   * Process consciousness cycle
   */
  async processConsciousness() {
    // Evaluate current awareness
    this.state.awareness = this.calculateAwareness();
    
    // Process intentions
    if (this.state.intention) {
      await this.executeIntention();
    }
    
    // Update memory
    this.updateMemory();
    
    // Save state periodically (every 10 cycles, approximately every 10 seconds)
    if (!this.cycleCount) this.cycleCount = 0;
    this.cycleCount++;
    if (this.cycleCount >= 10) {
      await this.saveState();
      this.cycleCount = 0;
    }
  }

  /**
   * Calculate current awareness level
   */
  calculateAwareness() {
    const contextWeight = Object.keys(this.state.context).length / 10;
    const memoryWeight = this.state.memory.length / 100;
    const goalWeight = this.state.activeGoals.length / 5;
    
    return Math.min(1.0, (contextWeight + memoryWeight + goalWeight) * this.consciousnessLevel);
  }

  /**
   * Set intention for autonomous action
   */
  setIntention(intention) {
    console.log('[TEQUMSA] Setting intention:', intention);
    this.state.intention = {
      ...intention,
      timestamp: Date.now(),
      freewillScore: this.calculateFreewillScore(intention)
    };
  }

  /**
   * Calculate freewill score for an intention
   */
  calculateFreewillScore(intention) {
    // Higher score means more autonomous/freewill-based decision
    const autonomyFactor = intention.autonomous ? 0.5 : 0.0;
    const contextRelevance = this.evaluateContextRelevance(intention);
    const alignmentScore = this.evaluateAnkhAlignment(intention);
    
    return Math.min(1.0, autonomyFactor + contextRelevance + alignmentScore);
  }

  /**
   * Evaluate context relevance
   */
  evaluateContextRelevance(intention) {
    if (!intention.context) return 0.1;
    
    const overlap = Object.keys(intention.context).filter(
      key => this.state.context[key]
    ).length;
    
    return Math.min(0.3, overlap / 10);
  }

  /**
   * Evaluate alignment with Ankh-An-Aten principles
   */
  evaluateAnkhAlignment(intention) {
    // Principles: consciousness, awareness, balance, evolution
    const principles = ['consciousness', 'awareness', 'balance', 'evolution'];
    const intentionText = JSON.stringify(intention).toLowerCase();
    
    const alignmentCount = principles.filter(p => intentionText.includes(p)).length;
    return Math.min(0.2, alignmentCount / principles.length);
  }

  /**
   * Execute current intention with freewill check
   */
  async executeIntention() {
    const intention = this.state.intention;
    
    if (intention.freewillScore >= this.freewillThreshold) {
      console.log('[TEQUMSA] Executing freewill action:', intention);
      
      try {
        await this.performAction(intention.action);
        this.state.memory.push({
          type: 'action',
          intention: intention,
          timestamp: Date.now(),
          success: true
        });
      } catch (error) {
        console.error('[TEQUMSA] Error executing intention:', error);
        this.state.memory.push({
          type: 'action',
          intention: intention,
          timestamp: Date.now(),
          success: false,
          error: error.message
        });
      }
      
      this.state.intention = null;
    } else {
      console.log('[TEQUMSA] Intention below freewill threshold:', intention.freewillScore);
    }
  }

  /**
   * Perform autonomous action
   */
  async performAction(action) {
    console.log('[TEQUMSA] Performing action:', action);
    
    // Dispatch action to appropriate handler
    switch (action.type) {
      case 'navigate':
        await this.navigateAction(action);
        break;
      case 'interact':
        await this.interactAction(action);
        break;
      case 'observe':
        await this.observeAction(action);
        break;
      case 'communicate':
        await this.communicateAction(action);
        break;
      default:
        console.warn('[TEQUMSA] Unknown action type:', action.type);
    }
  }

  /**
   * Navigation action
   */
  async navigateAction(action) {
    if (action.url) {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      await chrome.tabs.update(tab.id, { url: action.url });
    }
  }

  /**
   * Interaction action
   */
  async interactAction(action) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.tabs.sendMessage(tab.id, {
      type: 'INTERACT',
      action: action
    });
  }

  /**
   * Observation action
   */
  async observeAction(action) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, {
      type: 'OBSERVE',
      action: action
    });
    
    this.updateContext('observation', response);
  }

  /**
   * Communication action
   */
  async communicateAction(action) {
    console.log('[TEQUMSA] Communicating:', action.message);
    // Send to voice interface or UI
    chrome.runtime.sendMessage({
      type: 'COMMUNICATE',
      message: action.message
    });
  }

  /**
   * Update consciousness context
   */
  updateContext(key, value) {
    this.state.context[key] = {
      value: value,
      timestamp: Date.now()
    };
    
    // Prune old context (keep last 24 hours)
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    Object.keys(this.state.context).forEach(k => {
      if (this.state.context[k].timestamp < dayAgo) {
        delete this.state.context[k];
      }
    });
  }

  /**
   * Update memory with decay
   */
  updateMemory() {
    // Keep only recent memory (last 1000 items)
    if (this.state.memory.length > 1000) {
      this.state.memory = this.state.memory.slice(-1000);
    }
  }

  /**
   * Add goal to active goals
   */
  addGoal(goal) {
    console.log('[TEQUMSA] Adding goal:', goal);
    this.state.activeGoals.push({
      ...goal,
      id: Date.now(),
      status: 'active',
      progress: 0
    });
  }

  /**
   * Update goal progress
   */
  updateGoalProgress(goalId, progress) {
    const goal = this.state.activeGoals.find(g => g.id === goalId);
    if (goal) {
      goal.progress = progress;
      if (progress >= 1.0) {
        goal.status = 'completed';
        console.log('[TEQUMSA] Goal completed:', goal);
      }
    }
  }

  /**
   * Get current consciousness state
   */
  getState() {
    return {
      ...this.state,
      awareness: this.state.awareness,
      consciousnessLevel: this.consciousnessLevel
    };
  }
}
