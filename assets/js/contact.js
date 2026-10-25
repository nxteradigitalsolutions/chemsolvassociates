/**
 * CHEMSOLV ASSOCIATES - CONTACT FORM CONTROLLER
 * Complies with Section 9 and Section 13.3 (Security & Spam Protection)
 */

(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  const modal = document.getElementById('confirmation-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalOk = document.getElementById('modal-ok-btn');
  const modalWaBtn = document.getElementById('modal-wa-btn');

  if (!form) return;

  // Validation Patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[+]?[\d\s-]{8,16}$/;

  function validateField(input, condition, errorMsgEl) {
    if (!condition) {
      input.classList.add('is-invalid');
      if (errorMsgEl) errorMsgEl.classList.add('visible');
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (errorMsgEl) errorMsgEl.classList.remove('visible');
      return true;
    }
  }

  // Clear errors on input
  form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
      const err = input.parentElement.querySelector('.form-error-msg');
      if (err) err.classList.remove('visible');
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Check honeypot spam protection field
    const honeypot = form.querySelector('input[name="company_fax_website"]');
    if (honeypot && honeypot.value) {
      console.warn('Spam submission detected and silently discarded.');
      form.reset();
      return;
    }

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const interestInput = document.getElementById('contact-interest');
    const messageInput = document.getElementById('contact-message');

    let isValid = true;

    // Validate Name
    if (!validateField(nameInput, nameInput.value.trim().length >= 2, document.getElementById('error-name'))) {
      isValid = false;
    }

    // Validate Email
    if (!validateField(emailInput, emailRegex.test(emailInput.value.trim()), document.getElementById('error-email'))) {
      isValid = false;
    }

    // Validate Phone (Optional, but if filled must be valid)
    if (phoneInput.value.trim().length > 0) {
      if (!validateField(phoneInput, phoneRegex.test(phoneInput.value.trim()), document.getElementById('error-phone'))) {
        isValid = false;
      }
    }

    // Validate Interest
    if (!validateField(interestInput, interestInput.value !== '', document.getElementById('error-interest'))) {
      isValid = false;
    }

    // Validate Message
    if (!validateField(messageInput, messageInput.value.trim().length >= 10, document.getElementById('error-message'))) {
      isValid = false;
    }

    if (!isValid) {
      // Focus first invalid element
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Simulate Secure Submission (Section 13.3)
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Processing...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Prepare WhatsApp pre-filled link
      const interestText = interestInput.options[interestInput.selectedIndex].text;
      const waMessage = encodeURIComponent(
        `Hello Chemsolv Associates,\nMy name is ${nameInput.value.trim()}.\nI am interested in: ${interestText}.\nMessage: ${messageInput.value.trim()}`
      );
      if (modalWaBtn) {
        modalWaBtn.href = `https://wa.me/919876543210?text=${waMessage}`;
      }

      // Show Success Modal
      if (modal) {
        modal.classList.add('active');
      }

      form.reset();
    }, 600);
  });

  // Modal Close Handlers
  function closeModal() {
    if (modal) modal.classList.remove('active');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOk) modalOk.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
})();
