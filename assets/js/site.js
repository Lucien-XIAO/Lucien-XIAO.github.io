/* Site-wide interactive behaviour: navigation state, email obfuscation,
   and the light/dark theme toggle.
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

    /* Localized links: pick the href variant matching the active language.
       Usage: <a href="/default/" data-href-en="..." data-href-fr="..." data-href-zh="..."> */
    var applyLocalizedHrefs = function () {
      var lang = currentLanguage();
      var key = 'href' + lang.charAt(0).toUpperCase() + lang.slice(1);
      document.querySelectorAll('a[data-href-en]').forEach(function (link) {
        var target = link.dataset[key] || link.dataset.hrefEn;
        if (target && link.getAttribute('href') !== target) {
          link.setAttribute('href', target);
        }
      });
    };
    applyLocalizedHrefs();
    window.addEventListener('site-language-change', applyLocalizedHrefs);

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
        var fallbackText = email.replace('@', ' [at] ').replace(/\./g, ' [dot] ');

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
