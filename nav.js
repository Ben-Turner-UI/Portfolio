(function () {
  function updateNavOffset() {
    var nav = document.querySelector('.nav-container');
    if (!nav) return;
    document.documentElement.style.setProperty('--nav-offset', nav.offsetHeight + 'px');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavOffset);
  } else {
    updateNavOffset();
  }
  window.addEventListener('resize', updateNavOffset);

  var EMAIL = 'Benjamin.turner.design@gmail.com';
  var TOAST_HIDE_MS = 2200;
  var toast = null;
  var hideTimer = null;

  function getToast() {
    if (toast) return toast;

    toast = document.createElement('div');
    toast.className = 'nav-copy-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
    return toast;
  }

  function showToast(message) {
    var el = getToast();
    el.textContent = message;

    el.classList.remove('nav-copy-toast--visible');
    void el.offsetWidth;
    el.classList.add('nav-copy-toast--visible');

    if (hideTimer) window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(function () {
      el.classList.remove('nav-copy-toast--visible');
    }, TOAST_HIDE_MS);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return fallbackCopy(text); }
      );
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(textarea);
    return ok;
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('.nav-copy-email');
    if (!button) return;

    event.preventDefault();
    var email = button.getAttribute('data-copy-email') || EMAIL;

    copyToClipboard(email).then(function (copied) {
      if (copied) {
        showToast('Copied to clipboard');
      } else {
        showToast('Could not copy. Try again');
      }
    });
  });
})();
