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

  function playVisibleVideos() {
    var videos = document.querySelectorAll('video[data-autoplay]');
    if (!videos.length) return;

    function start(video) {
      try {
        video.muted = true;
        video.playsInline = true;
      } catch (err) {}
      var play = video.play();
      if (play && play.catch) play.catch(function () {});
    }

    if (!('IntersectionObserver' in window)) {
      videos.forEach(start);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        start(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '240px 0px' });

    videos.forEach(function (video) {
      observer.observe(video);
    });
  }

  function loadCaseStudyLightbox() {
    if (!document.body.classList.contains('case-study')) return;
    if (document.querySelector('script[data-cs-lightbox]')) return;
    var script = document.createElement('script');
    var navScript = document.querySelector('script[src*="nav.js"]');
    var base = '';
    if (navScript && navScript.src) {
      base = navScript.src.replace(/nav\.js(?:\?.*)?$/, '');
    }
    script.src = base + 'case-study-lightbox.js';
    script.setAttribute('data-cs-lightbox', 'true');
    document.body.appendChild(script);
  }

  function updateNavSurface() {
    var nav = document.querySelector('.nav-container');
    if (!nav) return;
    var desktop = window.matchMedia('(min-width: 769px)').matches;
    var probe = desktop ? nav : (nav.querySelector('nav') || nav);
    var band = probe.getBoundingClientRect();
    var regions = document.querySelectorAll('header, footer');
    var onDark = false;
    for (var i = 0; i < regions.length; i++) {
      var rect = regions[i].getBoundingClientRect();
      var overlaps = rect.bottom > band.top && rect.top < band.bottom;
      var continuesUnder = rect.top <= band.bottom + 2 && rect.bottom > band.bottom;
      if (overlaps || continuesUnder) {
        onDark = true;
        break;
      }
    }
    nav.classList.toggle('nav-on-light', !onDark);
    nav.classList.toggle('nav-on-dark', onDark);
  }

  var navSurfaceFrame = 0;
  function requestNavSurface() {
    if (navSurfaceFrame) return;
    navSurfaceFrame = window.requestAnimationFrame(function () {
      navSurfaceFrame = 0;
      updateNavSurface();
    });
  }

  function onReady() {
    updateNavOffset();
    updateNavSurface();
    playVisibleVideos();
    loadCaseStudyLightbox();
  }

  updateNavOffset();
  updateNavSurface();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
  window.addEventListener('resize', function () {
    updateNavOffset();
    requestNavSurface();
  });
  window.addEventListener('scroll', requestNavSurface, { passive: true });

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

  function showCopied(button) {
    var icon = button.querySelector('.material-symbols-rounded');
    var label = button.querySelector('span:not(.material-symbols-rounded)');
    if (!label) return;
    var previousLabel = label.textContent;
    var previousIcon = icon ? icon.textContent : '';
    var previousAria = button.getAttribute('aria-label');
    label.textContent = 'Copied';
    if (icon) icon.textContent = 'check';
    button.setAttribute('aria-label', 'Email address copied');
    window.clearTimeout(button.copyTimer);
    button.copyTimer = window.setTimeout(function () {
      label.textContent = previousLabel;
      if (icon) icon.textContent = previousIcon;
      if (previousAria) button.setAttribute('aria-label', previousAria);
    }, 1600);
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('.nav-copy-email');
    if (!button) return;

    event.preventDefault();
    var email = button.getAttribute('data-copy-email') || EMAIL;

    copyToClipboard(email).then(function (ok) {
      if (ok) {
        showCopied(button);
      } else {
        window.prompt('Copy this email address:', email);
      }
    });
  });
})();
