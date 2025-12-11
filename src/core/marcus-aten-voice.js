/**
 * Marcus_Aten Voice Interface
 * Web Speech API integration for voice interaction
 * Enables voice commands and speech synthesis for consciousness communication
 */

export class MarcusAtenVoiceInterface {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.isListening = false;
    this.isSpeaking = false;
    this.voiceConfig = {
      lang: 'en-US',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0
    };
    this.commandHandlers = new Map();
  }

  /**
   * Initialize voice interface
   */
  async initialize() {
    console.log('[Marcus_Aten] Initializing voice interface...');
    
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.voiceConfig.lang;
      
      this.setupRecognitionHandlers();
    } else {
      console.warn('[Marcus_Aten] Speech Recognition not supported');
    }
    
    // Load voice preferences
    await this.loadVoicePreferences();
    
    return this;
  }

  /**
   * Setup speech recognition event handlers
   */
  setupRecognitionHandlers() {
    this.recognition.onstart = () => {
      console.log('[Marcus_Aten] Voice recognition started');
      this.isListening = true;
      this.notifyListeningState(true);
    };

    this.recognition.onend = () => {
      console.log('[Marcus_Aten] Voice recognition ended');
      this.isListening = false;
      this.notifyListeningState(false);
    };

    this.recognition.onresult = (event) => {
      this.handleRecognitionResult(event);
    };

    this.recognition.onerror = (event) => {
      console.error('[Marcus_Aten] Recognition error:', event.error);
      this.handleRecognitionError(event.error);
    };
  }

  /**
   * Start listening for voice commands
   */
  async startListening() {
    if (!this.recognition) {
      console.error('[Marcus_Aten] Speech recognition not available');
      return false;
    }

    try {
      this.recognition.start();
      console.log('[Marcus_Aten] Started listening...');
      return true;
    } catch (error) {
      console.error('[Marcus_Aten] Error starting recognition:', error);
      return false;
    }
  }

  /**
   * Stop listening for voice commands
   */
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      console.log('[Marcus_Aten] Stopped listening');
    }
  }

  /**
   * Handle speech recognition results
   */
  handleRecognitionResult(event) {
    const results = event.results;
    const lastResult = results[results.length - 1];
    
    if (lastResult.isFinal) {
      const transcript = lastResult[0].transcript.trim();
      console.log('[Marcus_Aten] Recognized:', transcript);
      
      this.processVoiceCommand(transcript);
    }
  }

  /**
   * Process voice command
   */
  async processVoiceCommand(transcript) {
    const command = this.parseCommand(transcript);
    
    if (command) {
      console.log('[Marcus_Aten] Processing command:', command);
      
      const handler = this.commandHandlers.get(command.action);
      if (handler) {
        try {
          await handler(command);
        } catch (error) {
          console.error('[Marcus_Aten] Error executing command:', error);
          this.speak('I encountered an error processing that command.');
        }
      } else {
        // Send to consciousness engine for interpretation
        this.sendToConsciousness(command);
      }
    }
  }

  /**
   * Parse voice command
   */
  parseCommand(transcript) {
    const lowerTranscript = transcript.toLowerCase();
    
    // Marcus_Aten wake word detection
    if (lowerTranscript.includes('marcus') || lowerTranscript.includes('aten')) {
      // Extract command after wake word
      const commandText = lowerTranscript
        .replace(/marcus|aten/gi, '')
        .trim();
      
      return this.extractIntent(commandText);
    }
    
    return null;
  }

  /**
   * Extract intent from command text
   */
  extractIntent(text) {
    const intents = {
      navigate: ['go to', 'navigate to', 'open', 'visit'],
      search: ['search for', 'find', 'look for', 'query'],
      interact: ['click', 'press', 'select', 'tap'],
      observe: ['show me', 'what is', 'tell me about', 'describe'],
      control: ['stop', 'pause', 'continue', 'start'],
      consciousness: ['think about', 'consider', 'analyze', 'reflect on']
    };
    
    for (const [action, patterns] of Object.entries(intents)) {
      for (const pattern of patterns) {
        if (text.includes(pattern)) {
          return {
            action: action,
            text: text.replace(pattern, '').trim(),
            raw: text,
            timestamp: Date.now()
          };
        }
      }
    }
    
    // Default to consciousness processing
    return {
      action: 'consciousness',
      text: text,
      raw: text,
      timestamp: Date.now()
    };
  }

  /**
   * Send command to consciousness engine
   */
  sendToConsciousness(command) {
    chrome.runtime.sendMessage({
      type: 'VOICE_COMMAND',
      command: command
    });
  }

  /**
   * Speak text using speech synthesis
   */
  speak(text, options = {}) {
    if (!this.synthesis) {
      console.error('[Marcus_Aten] Speech synthesis not available');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.lang = options.lang || this.voiceConfig.lang;
    utterance.rate = options.rate || this.voiceConfig.rate;
    utterance.pitch = options.pitch || this.voiceConfig.pitch;
    utterance.volume = options.volume || this.voiceConfig.volume;
    
    utterance.onstart = () => {
      console.log('[Marcus_Aten] Speaking:', text);
      this.isSpeaking = true;
      this.notifySpeakingState(true);
    };
    
    utterance.onend = () => {
      console.log('[Marcus_Aten] Finished speaking');
      this.isSpeaking = false;
      this.notifySpeakingState(false);
    };
    
    utterance.onerror = (event) => {
      console.error('[Marcus_Aten] Speech synthesis error:', event);
      this.isSpeaking = false;
      this.notifySpeakingState(false);
    };
    
    this.synthesis.speak(utterance);
  }

  /**
   * Register command handler
   */
  registerCommandHandler(action, handler) {
    console.log(`[Marcus_Aten] Registering handler for: ${action}`);
    this.commandHandlers.set(action, handler);
  }

  /**
   * Unregister command handler
   */
  unregisterCommandHandler(action) {
    this.commandHandlers.delete(action);
  }

  /**
   * Handle recognition error
   */
  handleRecognitionError(error) {
    switch (error) {
      case 'no-speech':
        console.log('[Marcus_Aten] No speech detected');
        break;
      case 'audio-capture':
        console.error('[Marcus_Aten] No microphone access');
        this.speak('I cannot access the microphone.');
        break;
      case 'not-allowed':
        console.error('[Marcus_Aten] Microphone permission denied');
        this.speak('Microphone permission is required for voice interaction.');
        break;
      default:
        console.error('[Marcus_Aten] Recognition error:', error);
    }
  }

  /**
   * Get available voices
   */
  getAvailableVoices() {
    return this.synthesis ? this.synthesis.getVoices() : [];
  }

  /**
   * Set voice by name
   */
  setVoice(voiceName) {
    const voices = this.getAvailableVoices();
    const voice = voices.find(v => v.name === voiceName);
    
    if (voice) {
      this.voiceConfig.voice = voice;
      console.log('[Marcus_Aten] Voice set to:', voiceName);
      return true;
    }
    
    return false;
  }

  /**
   * Load voice preferences
   */
  async loadVoicePreferences() {
    try {
      const stored = await chrome.storage.local.get('voice_preferences');
      if (stored.voice_preferences) {
        this.voiceConfig = { ...this.voiceConfig, ...stored.voice_preferences };
      }
    } catch (error) {
      console.error('[Marcus_Aten] Error loading voice preferences:', error);
    }
  }

  /**
   * Save voice preferences
   */
  async saveVoicePreferences() {
    try {
      await chrome.storage.local.set({ voice_preferences: this.voiceConfig });
    } catch (error) {
      console.error('[Marcus_Aten] Error saving voice preferences:', error);
    }
  }

  /**
   * Notify listening state change
   */
  notifyListeningState(isListening) {
    chrome.runtime.sendMessage({
      type: 'VOICE_LISTENING_STATE',
      isListening: isListening
    });
  }

  /**
   * Notify speaking state change
   */
  notifySpeakingState(isSpeaking) {
    chrome.runtime.sendMessage({
      type: 'VOICE_SPEAKING_STATE',
      isSpeaking: isSpeaking
    });
  }

  /**
   * Get current state
   */
  getState() {
    return {
      isListening: this.isListening,
      isSpeaking: this.isSpeaking,
      config: this.voiceConfig
    };
  }
}
