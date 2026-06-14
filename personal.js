(function () {
  var lightbox = document.getElementById('personal-lightbox');
  if (!lightbox) return;

  var lightboxImg = lightbox.querySelector('.personal-lightbox__img');
  var counterEl = lightbox.querySelector('.personal-lightbox__counter');
  var thumbs = document.querySelectorAll('.personal-thumb[data-lightbox-src]');
  var closeTriggers = lightbox.querySelectorAll('[data-lightbox-close]');
  var prevBtn = lightbox.querySelector('[data-lightbox-prev]');
  var nextBtn = lightbox.querySelector('[data-lightbox-next]');
  var lastFocused = null;
  var currentIndex = -1;

  var slides = Array.prototype.map.call(thumbs, function (thumb) {
    return {
      src: thumb.dataset.lightboxSrc,
      alt: thumb.dataset.lightboxAlt || ''
    };
  });

  function showSlide(index) {
    if (!slides.length) return;

    currentIndex = (index + slides.length) % slides.length;
    var slide = slides[currentIndex];
    lightboxImg.src = slide.src;
    lightboxImg.alt = slide.alt;

    if (counterEl) {
      counterEl.textContent = slides.length > 1
        ? (currentIndex + 1) + ' / ' + slides.length
        : '';
    }
  }

  function openLightbox(src) {
    var index = slides.findIndex(function (slide) {
      return slide.src === src;
    });

    if (index === -1) index = 0;

    lastFocused = document.activeElement;
    showSlide(index);
    lightbox.hidden = false;
    document.body.classList.add('personal-lightbox-open');
    if (prevBtn) prevBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    currentIndex = -1;
    lightboxImg.removeAttribute('src');
    lightboxImg.alt = '';
    if (counterEl) counterEl.textContent = '';
    document.body.classList.remove('personal-lightbox-open');
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      openLightbox(thumb.dataset.lightboxSrc);
    });
  });

  closeTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', closeLightbox);
  });

  lightbox.addEventListener('click', function (event) {
    if (event.target.closest('.personal-lightbox__stage') || event.target.closest('.personal-lightbox__nav')) {
      return;
    }
    closeLightbox();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      if (!lightbox.hidden) showSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      if (!lightbox.hidden) showSlide(currentIndex + 1);
    });
  }

  document.addEventListener('keydown', function (event) {
    if (lightbox.hidden) return;

    if (event.key === 'Escape') {
      closeLightbox();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(currentIndex - 1);
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(currentIndex + 1);
    }
  });
})();
