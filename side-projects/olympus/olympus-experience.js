(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Soft section reveals; never leave content stuck invisible */
  function initSectionReveals() {
    var nodes = document.querySelectorAll('.about_card, .kit_card, .faces_intro');
    if (!nodes.length) {
      return;
    }

    function show(node) {
      node.classList.add('is-inview');
    }

    if (reducedMotion || !('IntersectionObserver' in window)) {
      nodes.forEach(show);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          show(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    nodes.forEach(function (node, index) {
      node.style.setProperty('--reveal-delay', (index % 3) * 70 + 'ms');
      observer.observe(node);
      // Safety: if already on screen (or observer quirks), show shortly after.
      window.setTimeout(function () {
        var rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          show(node);
        }
      }, 400 + index * 40);
    });
  }

  function boot() {
    initSectionReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
