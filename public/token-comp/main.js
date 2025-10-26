// Removed Supabase initialization

// Analytics tracking removed
function trackEvent(eventType, eventData = {}) {
  console.log('Event:', eventType, eventData);
}

function trackButtonClick(buttonName, location) {
  console.log('Button click:', buttonName, location);
}

function trackExitIntent() {
  console.log('Exit intent detected');
}

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  toastMessage.textContent = message;
  toast.className = `toast ${type}`;
  toast.hidden = false;

  setTimeout(() => {
    toast.hidden = true;
  }, 3000);
}

// Smooth scroll
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    // Use both scrollIntoView and window.scrollTo for better compatibility
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - 80; // Account for fixed header

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    const focusableElement = element.querySelector('button, a, input, [tabindex]:not([tabindex="-1"])');
    if (focusableElement) {
      setTimeout(() => {
        focusableElement.focus();
      }, 500);
    }
  }
}

// Modal management
class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.backdrop = this.modal?.querySelector('.modal-backdrop');
    this.closeButtons = this.modal?.querySelectorAll('.modal-close');
    this.previousActiveElement = null;
    this.init();
  }

  init() {
    if (!this.modal) return;

    this.closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    this.backdrop?.addEventListener('click', () => this.close());

    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  open() {
    this.previousActiveElement = document.activeElement;
    this.modal.hidden = false;
    document.body.style.overflow = 'hidden';

    const firstFocusable = this.modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }

    this.trapFocus();
  }

  close() {
    this.modal.hidden = true;
    document.body.style.overflow = '';

    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }

  trapFocus() {
    const focusableElements = this.modal.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    this.modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }
}

// Form validation
class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.errors = {};
    this.init();
  }

  init() {
    if (!this.form) return;

    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (this.errors[input.name]) {
          this.validateField(input);
        }
      });
    });

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validateField(field) {
    const value = field.value.trim();
    const name = field.name;
    let error = '';

    if (field.hasAttribute('required') && !value) {
      error = 'This field is required';
    } else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Please enter a valid email address';
      }
    }

    this.setFieldError(field, error);
    this.errors[name] = error;
    return !error;
  }

  setFieldError(field, error) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup?.querySelector('.form-error');

    if (errorElement) {
      errorElement.textContent = error;
    }

    if (error) {
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.classList.remove('error');
      field.setAttribute('aria-invalid', 'false');
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const inputs = this.form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      const firstError = this.form.querySelector('.error');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    try {
      await this.submitForm(data);
    } catch (error) {
      console.error('Form submission error:', error);
      showToast('An error occurred. Please try again.', 'error');
    }
  }

  async submitForm(data) {
    throw new Error('submitForm must be implemented by subclass');
  }
}

// Signup Form
class SignupForm extends FormValidator {
  async submitForm(data) {
    console.log('Signup form submitted:', data);
    showToast('Successfully joined the waitlist!', 'success');
    this.form.reset();
    signupModal.close();
    trackEvent('signup', { email: data.email, company: data.company });
  }
}

// Exit Form - Removed

// FAQ Accordion
function initFAQ() {
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const answer = button.nextElementSibling;

      faqButtons.forEach(btn => {
        if (btn !== button) {
          btn.setAttribute('aria-expanded', 'false');
          btn.nextElementSibling.hidden = true;
        }
      });

      button.setAttribute('aria-expanded', !isExpanded);
      answer.hidden = isExpanded;
    });
  });
}

// Exit intent detection - Removed

// Keyboard shortcuts
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    const activeElement = document.activeElement;
    const isInputActive = activeElement.tagName === 'INPUT' ||
                          activeElement.tagName === 'TEXTAREA' ||
                          activeElement.tagName === 'SELECT';

    if (isInputActive) return;

    const isModalOpen = !document.getElementById('signup-modal').hidden;

    if (isModalOpen) return;

    if (e.altKey) {
      switch(e.key) {
        case 'b':
          e.preventDefault();
          scrollToSection('booking');
          break;
        case 'f':
          e.preventDefault();
          scrollToSection('features');
          break;
        case 'q':
          e.preventDefault();
          scrollToSection('faq-heading');
          break;
      }
    }
  });
}

// Cal.com integration
function initCalEmbed() {
  (function (C, A, L) {
    let p = function (a, ar) {
      a.q.push(ar);
    };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () {
          p(api, arguments);
        };
        const namespace = ar[1];
        api.q = api.q || [];
        typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", { origin: "https://app.cal.com" });

  Cal("inline", {
    elementOrSelector: "#cal-embed",
    calLink: "tokenaccrual/30min",
    config: {
      layout: "month_view",
      theme: "dark"
    }
  });

  Cal("ui", {
    theme: "dark",
    styles: { branding: { brandColor: "#10b981" } },
    hideEventTypeDetails: false,
    layout: "month_view"
  });
}

// Initialize everything
let signupModal, signupForm;

document.addEventListener('DOMContentLoaded', () => {
  signupModal = new Modal('signup-modal');
  signupForm = new SignupForm('signup-form');

  initFAQ();
  initKeyboardShortcuts();
  initCalEmbed();

  // Navigation buttons
  const navBookBtn = document.getElementById('nav-book-btn');
  navBookBtn?.addEventListener('click', () => {
    trackButtonClick('Book Consultation', 'header');
    scrollToSection('booking');
  });

  const heroBookBtn = document.getElementById('hero-book-btn');
  heroBookBtn?.addEventListener('click', () => {
    trackButtonClick('Schedule Free Consultation', 'hero');
    scrollToSection('booking');
  });

  const ctaBookBtn = document.getElementById('cta-book-btn');
  ctaBookBtn?.addEventListener('click', () => {
    trackButtonClick('Schedule Free Consultation', 'cta');
    scrollToSection('booking');
  });

  const seeHowBtn = document.getElementById('see-how-btn');
  seeHowBtn?.addEventListener('click', () => {
    scrollToSection('features');
  });

  // Track page load
  trackEvent('page_view', { page: 'home' });
});
