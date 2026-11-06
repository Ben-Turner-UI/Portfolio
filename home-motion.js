(function () {
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

  var cards = Array.prototype.slice.call(document.querySelectorAll('.project-cards .project-card'));
  if (!cards.length) return;

  function show(card, delay) {
    card.style.animationDelay = delay + 'ms';
    card.classList.add('is-in');
  }

  if (!('IntersectionObserver' in window)) {
    cards.forEach(function (card, index) { show(card, (index % 2) * 60); });
    return;
  }

  var seen = new WeakSet();
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting || seen.has(entry.target)) return;
      seen.add(entry.target);
      var index = cards.indexOf(entry.target);
      show(entry.target, (index % 2) * 60);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

  cards.forEach(function (card) { observer.observe(card); });

  window.setTimeout(function () {
    cards.forEach(function (card, index) {
      if (!card.classList.contains('is-in')) show(card, (index % 2) * 60);
    });
  }, 2000);
})();
