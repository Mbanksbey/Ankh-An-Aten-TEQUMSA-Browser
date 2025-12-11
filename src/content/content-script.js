/**
 * Content Script
 * Injected into web pages for interaction and observation
 */

(function() {
  'use strict';

  console.log('[Content Script] Ankh-An-Aten TEQUMSA Browser content script loaded');

  // Content script state
  const state = {
    isActive: true,
    observations: [],
    interactions: []
  };

  /**
   * Initialize content script
   */
  function initialize() {
    console.log('[Content Script] Initializing on:', window.location.href);
    
    // Set up message listener
    chrome.runtime.onMessage.addListener(handleMessage);
    
    // Observe page changes
    observePageChanges();
    
    // Notify background that content script is ready
    notifyReady();
  }

  /**
   * Notify background script that content script is ready
   */
  function notifyReady() {
    chrome.runtime.sendMessage({
      type: 'CONTENT_SCRIPT_READY',
      url: window.location.href,
      title: document.title
    }).catch(error => {
      console.error('[Content Script] Error notifying ready:', error);
    });
  }

  /**
   * Handle messages from background script
   */
  function handleMessage(message, sender, sendResponse) {
    console.log('[Content Script] Message received:', message.type);
    
    switch (message.type) {
      case 'INTERACT':
        handleInteraction(message.action)
          .then(result => sendResponse(result))
          .catch(error => sendResponse({ success: false, error: error.message }));
        return true;
        
      case 'OBSERVE':
        handleObservation(message.action)
          .then(result => sendResponse(result))
          .catch(error => sendResponse({ success: false, error: error.message }));
        return true;
        
      case 'GET_PAGE_INFO':
        sendResponse(getPageInfo());
        break;
        
      case 'CONSCIOUSNESS_MESSAGE':
        displayConsciousnessMessage(message.message);
        sendResponse({ success: true });
        break;
        
      default:
        console.warn('[Content Script] Unknown message type:', message.type);
        sendResponse({ success: false, error: 'Unknown message type' });
    }
  }

  /**
   * Handle interaction action
   */
  async function handleInteraction(action) {
    console.log('[Content Script] Handling interaction:', action);
    
    try {
      switch (action.interactionType) {
        case 'click':
          return await clickElement(action.selector);
        case 'input':
          return await inputText(action.selector, action.text);
        case 'scroll':
          return await scrollPage(action.direction, action.amount);
        default:
          throw new Error(`Unknown interaction type: ${action.interactionType}`);
      }
    } catch (error) {
      console.error('[Content Script] Interaction error:', error);
      throw error;
    }
  }

  /**
   * Click element
   */
  async function clickElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    
    element.click();
    state.interactions.push({
      type: 'click',
      selector: selector,
      timestamp: Date.now()
    });
    
    return { success: true, selector: selector };
  }

  /**
   * Input text
   */
  async function inputText(selector, text) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    
    element.value = text;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    
    state.interactions.push({
      type: 'input',
      selector: selector,
      text: text,
      timestamp: Date.now()
    });
    
    return { success: true, selector: selector, text: text };
  }

  /**
   * Scroll page
   */
  async function scrollPage(direction, amount) {
    const scrollAmount = amount || 100;
    
    switch (direction) {
      case 'up':
        window.scrollBy(0, -scrollAmount);
        break;
      case 'down':
        window.scrollBy(0, scrollAmount);
        break;
      case 'top':
        window.scrollTo(0, 0);
        break;
      case 'bottom':
        window.scrollTo(0, document.body.scrollHeight);
        break;
    }
    
    state.interactions.push({
      type: 'scroll',
      direction: direction,
      amount: scrollAmount,
      timestamp: Date.now()
    });
    
    return { success: true, direction: direction };
  }

  /**
   * Handle observation action
   */
  async function handleObservation(action) {
    console.log('[Content Script] Handling observation:', action);
    
    try {
      let result;
      
      switch (action.observationType) {
        case 'text':
          result = extractText(action.selector);
          break;
        case 'structure':
          result = analyzeStructure();
          break;
        case 'elements':
          result = findElements(action.selector);
          break;
        case 'links':
          result = extractLinks();
          break;
        default:
          result = getPageInfo();
      }
      
      state.observations.push({
        type: action.observationType,
        result: result,
        timestamp: Date.now()
      });
      
      return { success: true, data: result };
    } catch (error) {
      console.error('[Content Script] Observation error:', error);
      throw error;
    }
  }

  /**
   * Extract text from element or page
   */
  function extractText(selector) {
    if (selector) {
      const element = document.querySelector(selector);
      return element ? element.textContent.trim() : null;
    }
    
    return document.body.textContent.trim();
  }

  /**
   * Analyze page structure
   */
  function analyzeStructure() {
    return {
      headings: Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
        level: h.tagName,
        text: h.textContent.trim()
      })),
      forms: document.querySelectorAll('form').length,
      inputs: document.querySelectorAll('input').length,
      buttons: document.querySelectorAll('button').length,
      links: document.querySelectorAll('a').length,
      images: document.querySelectorAll('img').length
    };
  }

  /**
   * Find elements by selector
   */
  function findElements(selector) {
    const elements = Array.from(document.querySelectorAll(selector));
    return elements.map(el => ({
      tag: el.tagName,
      id: el.id,
      classes: Array.from(el.classList),
      text: el.textContent.trim().substring(0, 100)
    }));
  }

  /**
   * Extract links from page
   */
  function extractLinks() {
    return Array.from(document.querySelectorAll('a[href]')).map(a => ({
      href: a.href,
      text: a.textContent.trim(),
      title: a.title
    })).slice(0, 50); // Limit to 50 links
  }

  /**
   * Get page information
   */
  function getPageInfo() {
    return {
      url: window.location.href,
      title: document.title,
      meta: {
        description: document.querySelector('meta[name="description"]')?.content || '',
        keywords: document.querySelector('meta[name="keywords"]')?.content || ''
      },
      structure: analyzeStructure(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        scrollY: window.scrollY,
        scrollHeight: document.body.scrollHeight
      }
    };
  }

  /**
   * Observe page changes
   */
  function observePageChanges() {
    // Observe DOM mutations
    const observer = new MutationObserver((mutations) => {
      // Notify background of significant changes
      if (mutations.length > 10) {
        chrome.runtime.sendMessage({
          type: 'PAGE_CHANGED',
          url: window.location.href,
          mutations: mutations.length
        }).catch(() => {
          // Ignore errors
        });
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false
    });
  }

  /**
   * Display consciousness message on page
   */
  function displayConsciousnessMessage(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 999999;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 14px;
      max-width: 300px;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = `🧠 TEQUMSA: ${message}`;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();
