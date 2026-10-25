/**
 * CHEMSOLV ASSOCIATES - RAG CHATBOT CONTROLLER
 * Complies with Section 10 of Requirements Specification
 */

(function () {
  'use strict';

  // DOM Elements
  const launcher = document.getElementById('chatbot-launcher');
  const panel = document.getElementById('chatbot-panel');
  const closeBtn = document.getElementById('chatbot-close');
  const resetBtn = document.getElementById('chatbot-reset');
  const messagesContainer = document.getElementById('chatbot-messages');
  const inputField = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const typingIndicator = document.getElementById('chatbot-typing');
  const suggestionContainer = document.getElementById('chatbot-suggestions');

  if (!launcher || !panel) return;

  // State
  let isOpen = false;
  let isThinking = false;

  // Toggle Chatbot
  function toggleChatbot(forceState) {
    isOpen = typeof forceState === 'boolean' ? forceState : !isOpen;
    if (isOpen) {
      panel.classList.add('active');
      document.body.classList.add('chatbot-open');
      launcher.setAttribute('aria-expanded', 'true');
      setTimeout(() => inputField.focus(), 150);
    } else {
      panel.classList.remove('active');
      document.body.classList.remove('chatbot-open');
      launcher.setAttribute('aria-expanded', 'false');
    }
  }

  launcher.addEventListener('click', () => toggleChatbot());
  closeBtn.addEventListener('click', () => toggleChatbot(false));

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      toggleChatbot(false);
    }
  });

  // Reset Chat Conversation
  function resetChat() {
    messagesContainer.innerHTML = '';
    renderWelcomeMessage();
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetChat);
  }

  // Render Bot Message
  function appendBotMessage(text, sourceLink, actions) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message bot';

    let formattedText = text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/• /g, '&bull; ');

    let actionsHtml = '';
    if (actions && actions.length > 0) {
      actionsHtml = `<div class="chat-actions-inline">` +
        actions.map(a => {
          const isWa = a.action === 'whatsapp';
          const target = a.url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : '';
          return `<a href="${a.url}" class="chat-btn-action ${isWa ? 'chat-btn-whatsapp' : ''}" ${target}>${a.label}</a>`;
        }).join('') +
        `</div>`;
    }

    let sourceHtml = '';
    if (sourceLink) {
      sourceHtml = `<span class="chat-bubble-source">Source: Approved Chemsolv Documentation &bull; <a href="${sourceLink}" style="color:var(--color-accent); text-decoration:underline;">View Section</a></span>`;
    }

    msgEl.innerHTML = `
      <div class="chat-bubble">
        <p>${formattedText}</p>
        ${sourceHtml}
        ${actionsHtml}
      </div>
    `;

    messagesContainer.appendChild(msgEl);
    scrollToBottom();
  }

  // Render User Message
  function appendUserMessage(text) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message user';
    msgEl.innerHTML = `
      <div class="chat-bubble">
        <p>${escapeHtml(text)}</p>
      </div>
    `;
    messagesContainer.appendChild(msgEl);
    scrollToBottom();
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Retrieval Algorithm (RAG Engine over Verified Knowledge Base)
  function retrieveInformation(query) {
    const cleanQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    const queryTokens = cleanQuery.split(/\s+/).filter(t => t.length > 1);

    if (queryTokens.length === 0) {
      return null;
    }

    let bestScore = 0;
    let bestMatch = null;

    if (typeof CHEMSOLV_KB !== 'undefined' && Array.isArray(CHEMSOLV_KB)) {
      CHEMSOLV_KB.forEach(item => {
        let score = 0;

        // Check keywords
        item.keywords.forEach(kw => {
          if (cleanQuery.includes(kw)) {
            score += 15;
          }
          queryTokens.forEach(token => {
            if (kw.includes(token)) {
              score += 6;
            }
          });
        });

        // Check title
        const cleanTitle = item.title.toLowerCase();
        queryTokens.forEach(token => {
          if (cleanTitle.includes(token)) score += 8;
        });

        // Check content
        const cleanContent = item.content.toLowerCase();
        queryTokens.forEach(token => {
          if (cleanContent.includes(token)) score += 2;
        });

        if (score > bestScore) {
          bestScore = score;
          bestMatch = item;
        }
      });
    }

    // Minimum confidence threshold to avoid hallucination/unsupported answers (Section 10.2)
    if (bestScore >= 10 && bestMatch) {
      return {
        success: true,
        data: bestMatch
      };
    }

    return {
      success: false
    };
  }

  // Handle Query Submission
  function handleUserQuery(queryText) {
    const trimmed = queryText.trim();
    if (!trimmed || isThinking) return;

    appendUserMessage(trimmed);
    inputField.value = '';
    isThinking = true;

    // Show retrieval animation
    if (typingIndicator) typingIndicator.classList.add('active');
    scrollToBottom();

    // Simulate realistic async retrieval latency (400ms - 750ms)
    setTimeout(() => {
      if (typingIndicator) typingIndicator.classList.remove('active');
      isThinking = false;

      const retrieval = retrieveInformation(trimmed);

      if (retrieval && retrieval.success) {
        appendBotMessage(retrieval.data.content, retrieval.data.link, [
          { label: "View Details", action: "link", url: retrieval.data.link },
          { label: "Enquire on WhatsApp", action: "whatsapp", url: `https://wa.me/919876543210?text=Hello%20Chemsolv%20Associates,%20I%20have%20an%20enquiry%20regarding%20${encodeURIComponent(retrieval.data.title)}.` }
        ]);
      } else {
        // Fallback policy (Section 10.2)
        appendBotMessage(
          CHATBOT_FALLBACK.message,
          null,
          CHATBOT_FALLBACK.actions
        );
      }
    }, 550);
  }

  // Event Listeners for Input
  sendBtn.addEventListener('click', () => {
    handleUserQuery(inputField.value);
  });

  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserQuery(inputField.value);
    }
  });

  // Suggestion Chips Click
  if (suggestionContainer) {
    suggestionContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.suggestion-chip');
      if (chip) {
        const query = chip.getAttribute('data-query') || chip.textContent;
        handleUserQuery(query);
      }
    });
  }

  // Initial Welcome Message
  function renderWelcomeMessage() {
    appendBotMessage(
      "Hello! Welcome to **Chemsolv Associates**. I am your verified technical knowledge assistant. How can I assist you today with water treatment systems, wastewater plants (STP/ETP), process monitoring, or AMC services?",
      null,
      [
        { label: "Water Treatment", action: "link", url: "products.html#water-treatment" },
        { label: "STP & ETP", action: "link", url: "products.html#wastewater-treatment" },
        { label: "AMC Services", action: "link", url: "services.html" }
      ]
    );
  }

  // Initialize
  renderWelcomeMessage();
})();
