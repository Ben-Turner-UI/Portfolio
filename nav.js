(function () {
  function updateNavOffset() {
    var nav = document.querySelector('.nav-container');
    if (!nav) return;
    var isDesktop = window.matchMedia('(min-width: 769px)').matches;
    if (isDesktop) {
      document.documentElement.style.setProperty('--nav-top-offset', nav.offsetHeight + 'px');
    } else {
      document.documentElement.style.setProperty('--nav-top-offset', '0px');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavOffset);
  } else {
    updateNavOffset();
  }
  window.addEventListener('resize', updateNavOffset);

  var EMAIL = 'Benjamin.turner.design@gmail.com';

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

  function showCopiedDialog(text) {
    window.alert('Copied:\n' + text);
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('.nav-copy-email');
    if (!button) return;

    event.preventDefault();
    var email = button.getAttribute('data-copy-email') || EMAIL;

    copyToClipboard(email).then(function (ok) {
      if (ok) {
        showCopiedDialog(email);
      } else {
        window.prompt('Copy this email address:', email);
      }
    });
  });

  var agentsScript = document.createElement('script');
  var navSrc = document.currentScript && document.currentScript.src ? document.currentScript.src : 'nav.js';
  agentsScript.src = navSrc.replace(/nav\.js(?:\?.*)?$/, 'agents-view.js');
  document.body.appendChild(agentsScript);
})();
