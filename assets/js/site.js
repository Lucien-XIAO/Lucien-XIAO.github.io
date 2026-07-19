/* Site-wide interactive behaviour: navigation state, email obfuscation,
   section reveal/collapse, and the light/dark theme toggle.
   Loaded with `defer` from _layouts/default.html. */
(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', function () {
    var activeNav = document.querySelector('.nav-active');
    if (activeNav) activeNav.scrollIntoView({ block: 'nearest', inline: 'center' });

    var decodeContact = function (value) {
      return value
        .split('-')
        .map(function (code) { return String.fromCharCode(Number(code) - 7); })
        .join('');
    };

    var contactMessages = {
      en: 'Email copied to clipboard',
      fr: 'Adresse e-mail copiée',
      zh: '邮箱地址已复制'
    };

    var currentLanguage = function () {
      var lang = (document.documentElement.lang || document.documentElement.dataset.language || 'en').toLowerCase();
      if (lang.indexOf('zh') === 0) return 'zh';
      if (lang.indexOf('fr') === 0) return 'fr';
      return 'en';
    };

    var contactToastTimer;
    var showContactToast = function (message) {
      var toast = document.querySelector('.contact-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'contact-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
      }

      toast.textContent = message;
      window.clearTimeout(contactToastTimer);
      toast.classList.add('is-visible');
      contactToastTimer = window.setTimeout(function () {
        toast.classList.remove('is-visible');
      }, 1600);
    };

    var copyText = async function (text) {
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch (error) {
          // Fall back to the selection-based copy path below.
        }
      }

      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      try {
        return document.execCommand('copy');
      } finally {
        textarea.remove();
      }
    };

    document.querySelectorAll('.js-email-link[data-contact-code]').forEach(function (link) {
      link.addEventListener('click', async function (event) {
        event.preventDefault();

        var email = decodeContact(link.dataset.contactCode || '');
        var targetSelector = link.dataset.emailTarget;
        var target = targetSelector ? document.querySelector(targetSelector) : null;
        var fallbackText = email.replace('@', ' [at] ').replace(/\./g, ' dot ');

        try {
          var copied = await copyText(email);
          if (!copied) throw new Error('Copy unavailable');
          showContactToast(contactMessages[currentLanguage()]);
        } catch (error) {
          if (target) target.textContent = fallbackText;
          showContactToast(contactMessages[currentLanguage()]);
        }
      });
    });

    /* IntersectionObserver: reveal sections on scroll */
    var sections = document.querySelectorAll('.section');
    var revealObserver = window.IntersectionObserver
      ? new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
      : null;

    sections.forEach(function (el, index) {
      el.style.transitionDelay = Math.min(index * 60, 300) + 'ms';

      if (revealObserver) {
        revealObserver.observe(el);
      } else {
        el.classList.add('visible');
      }

      var title = el.querySelector('.section-title');
      var body = el.querySelector('.section-body');
      if (!title || !body) return;

      var sectionId = el.id || 'section-' + (index + 1);
      if (!el.id) el.id = sectionId;
      if (!body.id) body.id = sectionId + '-body';

      el.classList.add('is-collapsible');
      title.setAttribute('role', 'button');
      title.setAttribute('tabindex', '0');
      title.setAttribute('aria-controls', body.id);
      title.setAttribute('aria-expanded', 'true');

      var openSection = function () {
        el.classList.remove('is-collapsed');
        title.setAttribute('aria-expanded', 'true');
        body.style.height = '0px';
        body.offsetHeight; // eslint-disable-line no-unused-expressions
        body.style.height = body.scrollHeight + 'px';
      };

      var closeSection = function () {
        title.setAttribute('aria-expanded', 'false');
        body.style.height = body.scrollHeight + 'px';
        body.offsetHeight; // eslint-disable-line no-unused-expressions
        el.classList.add('is-collapsed');
        body.style.height = '0px';
      };

      var toggleSection = function () {
        if (el.classList.contains('is-collapsed')) {
          openSection();
        } else {
          closeSection();
        }
      };

      body.addEventListener('transitionend', function (event) {
        if (event.target === body && event.propertyName === 'height' && !el.classList.contains('is-collapsed')) {
          body.style.height = 'auto';
        }
      });

      title.addEventListener('click', toggleSection);
      title.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleSection();
        }
      });
    });
  });

  /* Theme toggle (runs before DOMContentLoaded thanks to `defer`). */
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    var saved = localStorage.getItem('theme');
    var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var effectiveTheme = saved || (systemDark ? 'dark' : 'light');
    var syncThemeToggle = function (theme) {
      toggle.innerHTML = theme === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    };
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
    syncThemeToggle(effectiveTheme);
    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || (systemDark ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      syncThemeToggle(next);
    });
  }
})();
