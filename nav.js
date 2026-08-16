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

  var pageCache = Object.create(null);
  var navigating = false;

  function normalizePath(href) {
    var url = new URL(href, location.href);
    var path = url.pathname.replace(/\/index\.html$/i, '/');
    if (!path) path = '/';
    return url.origin + path + url.search;
  }

  function updateActiveNav(href) {
    var target = normalizePath(href);
    document.querySelectorAll('.nav-group .nav-item').forEach(function (link) {
      var active = normalizePath(link.href) === target;
      if (active) {
        link.id = 'nav-item-active';
        link.setAttribute('aria-current', 'page');
      } else {
        if (link.id === 'nav-item-active') link.removeAttribute('id');
        link.removeAttribute('aria-current');
      }
    });
  }

  function shouldKeepNode(node) {
    if (node.nodeType !== 1) return false;
    return node.classList.contains('nav-container') ||
      node.classList.contains('agents-toggle') ||
      node.classList.contains('agents-view');
  }

  function runPageScripts(srcs) {
    srcs.forEach(function (src) {
      document.querySelectorAll('script[src]').forEach(function (el) {
        if (el.getAttribute('src') === src) el.parentNode.removeChild(el);
      });
      var script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    });
  }

  function swapPage(html, href, push) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var nav = document.querySelector('.nav-container');
    var agentsView = document.querySelector('.agents-view');
    var pageScripts = [];
    var agentsOn = document.body.classList.contains('is-agents-view');

    if (typeof window.__personalLightboxTeardown === 'function') {
      window.__personalLightboxTeardown();
      window.__personalLightboxTeardown = null;
    }

    document.title = doc.title;
    document.body.className = doc.body.className || '';
    if (agentsOn) document.body.classList.add('is-agents-view');
    document.body.classList.remove('personal-lightbox-open');

    var node = nav ? nav.nextSibling : document.body.firstChild;
    while (node && node !== agentsView) {
      var next = node.nextSibling;
      if (!shouldKeepNode(node)) node.parentNode.removeChild(node);
      node = next;
    }

    var insertBefore = agentsView || null;
    Array.prototype.forEach.call(doc.body.childNodes, function (child) {
      if (child.nodeType === 1 && child.classList.contains('nav-container')) return;
      if (child.nodeType === 1 && child.tagName === 'SCRIPT') {
        var src = child.getAttribute('src');
        if (src && !/nav\.js(?:\?|$)/.test(src) && !/agents-view\.js(?:\?|$)/.test(src)) {
          pageScripts.push(src);
        }
        return;
      }
      document.body.insertBefore(document.importNode(child, true), insertBefore);
    });

    updateActiveNav(href);
    updateNavOffset();
    window.scrollTo(0, 0);
    runPageScripts(pageScripts);

    if (push) {
      history.pushState({ spaNav: true }, '', href);
    }

    if (typeof gtag === 'function') {
      try {
        gtag('config', 'G-THTRN14NFN', { page_path: new URL(href, location.href).pathname });
      } catch (err) {}
    }
  }

  function navigateTo(href, push) {
    var url = new URL(href, location.href).href;
    if (push && normalizePath(url) === normalizePath(location.href)) {
      window.scrollTo(0, 0);
      return Promise.resolve();
    }
    if (navigating) return Promise.resolve();
    navigating = true;

    var apply = function (html) {
      pageCache[normalizePath(url)] = html;
      swapPage(html, url, push);
      navigating = false;
    };

    var cached = pageCache[normalizePath(url)];
    if (cached) {
      apply(cached);
      return Promise.resolve();
    }

    return fetch(url, { credentials: 'same-origin' }).then(function (response) {
      if (!response.ok) throw new Error('nav fetch failed');
      return response.text();
    }).then(apply).catch(function () {
      navigating = false;
      location.href = url;
    });
  }

  function prefetchNavPages() {
    fetch(location.href, { credentials: 'same-origin' }).then(function (response) {
      return response.ok ? response.text() : null;
    }).then(function (html) {
      if (html) pageCache[normalizePath(location.href)] = html;
    }).catch(function () {});

    document.querySelectorAll('.nav-group .nav-item[href]').forEach(function (link) {
      var url = link.href;
      var key = normalizePath(url);
      if (pageCache[key] || key === normalizePath(location.href)) return;
      fetch(url, { credentials: 'same-origin' }).then(function (response) {
        return response.ok ? response.text() : null;
      }).then(function (html) {
        if (html) pageCache[key] = html;
      }).catch(function () {});
    });
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('.nav-group .nav-item');
    if (!link || !link.href) return;
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.origin !== location.origin) return;

    event.preventDefault();
    navigateTo(link.href, true);
  });

  window.addEventListener('popstate', function () {
    navigateTo(location.href, false);
  });

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  prefetchNavPages();

  var agentsScript = document.createElement('script');
  var navSrc = document.currentScript && document.currentScript.src ? document.currentScript.src : 'nav.js';
  agentsScript.src = navSrc.replace(/nav\.js(?:\?.*)?$/, 'agents-view.js');
  document.body.appendChild(agentsScript);
})();
