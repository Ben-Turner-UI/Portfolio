(function () {
  if (!document.body.classList.contains('case-study')) return;

  var ZOOM_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<circle cx="10.5" cy="10.5" r="6.25" stroke="currentColor" stroke-width="1.75"/>' +
    '<path d="M15.5 15.5L20 20" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>' +
    '<path d="M10.5 8v5M8 10.5h5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>' +
    '</svg>';

  var CLOSE_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<circle cx="10.5" cy="10.5" r="6.25" stroke="currentColor" stroke-width="1.75"/>' +
    '<path d="M15.5 15.5L20 20" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>' +
    '<path d="M8.5 10.5h4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>' +
    '</svg>';

  var mediaNodes = Array.prototype.filter.call(
    document.querySelectorAll(
      '.main-content .content-image img.image-with-caption, ' +
      '.main-content .content-image video.image-with-caption, ' +
      '.ui-grid__media > img.ui-grid__asset, ' +
      '.ui-grid__media > video.ui-grid__asset'
    ),
    function (node) {
      return !node.closest('.compare-slider') &&
        !node.closest('.cs-lightbox-trigger') &&
        (node.tagName === 'IMG' || node.tagName === 'VIDEO');
    }
  );

  if (!mediaNodes.length) return;

  var slides = [];
  var currentIndex = -1;
  var lastFocused = null;

  var root = document.createElement('div');
  root.className = 'cs-lightbox';
  root.hidden = true;
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', 'Expanded media');
  root.innerHTML =
    '<button type="button" class="cs-lightbox__backdrop" data-lightbox-close aria-label="Close"></button>' +
    '<div class="cs-lightbox__shell">' +
      '<div class="cs-lightbox__stage">' +
        '<img class="cs-lightbox__img" alt="" hidden>' +
        '<video class="cs-lightbox__video" muted loop playsinline controls hidden></video>' +
      '</div>' +
      '<div class="cs-lightbox__rail">' +
        '<button type="button" class="cs-lightbox__nav cs-lightbox__nav--prev" aria-label="Previous">' +
          '<span class="material-symbols-rounded cs-lightbox__nav-icon" aria-hidden="true">chevron_left</span>' +
        '</button>' +
        '<button type="button" class="cs-lightbox__nav cs-lightbox__nav--next" aria-label="Next">' +
          '<span class="material-symbols-rounded cs-lightbox__nav-icon" aria-hidden="true">chevron_right</span>' +
        '</button>' +
      '</div>' +
      '<button type="button" class="cs-lightbox__close" data-lightbox-close aria-label="Close">' +
        CLOSE_SVG +
      '</button>' +
    '</div>';

  document.body.appendChild(root);

  var imgEl = root.querySelector('.cs-lightbox__img');
  var videoEl = root.querySelector('.cs-lightbox__video');
  var prevBtn = root.querySelector('.cs-lightbox__nav--prev');
  var nextBtn = root.querySelector('.cs-lightbox__nav--next');
  var closeBtn = root.querySelector('.cs-lightbox__close');
  var rail = root.querySelector('.cs-lightbox__rail');
  var closeTriggers = root.querySelectorAll('[data-lightbox-close]');

  function pauseLightboxVideo() {
    videoEl.pause();
    videoEl.removeAttribute('src');
    videoEl.load();
    videoEl.hidden = true;
  }

  function resumePageAutoplayVideos() {
    document.querySelectorAll('video[data-autoplay]').forEach(function (video) {
      if (video.closest('.cs-lightbox')) return;
      try {
        video.muted = true;
        video.playsInline = true;
        var play = video.play();
        if (play && play.catch) play.catch(function () {});
      } catch (err) {}
    });
  }

  function showSlide(index) {
    if (!slides.length) return;
    currentIndex = (index + slides.length) % slides.length;
    var slide = slides[currentIndex];

    // Prev/next arrows removed from popouts; keyboard still works when multi.
    rail.hidden = true;
    root.classList.toggle('cs-lightbox--single', true);

    if (slide.type === 'video') {
      imgEl.hidden = true;
      imgEl.removeAttribute('src');
      imgEl.alt = '';
      videoEl.hidden = false;
      videoEl.src = slide.src;
      videoEl.setAttribute('aria-label', slide.alt || 'Video');
      var play = videoEl.play();
      if (play && play.catch) play.catch(function () {});
    } else {
      pauseLightboxVideo();
      imgEl.hidden = false;
      imgEl.src = slide.src;
      imgEl.alt = slide.alt || '';
    }
  }

  function openLightbox(index) {
    lastFocused = document.activeElement;
    document.querySelectorAll('.ui-grid__media video, .content-image video').forEach(function (v) {
      try { v.pause(); } catch (err) {}
    });
    showSlide(index);
    root.hidden = false;
    document.body.classList.add('cs-lightbox-open');
    closeBtn.focus();
  }

  function closeLightbox() {
    root.hidden = true;
    currentIndex = -1;
    pauseLightboxVideo();
    imgEl.hidden = true;
    imgEl.removeAttribute('src');
    imgEl.alt = '';
    document.body.classList.remove('cs-lightbox-open');
    resumePageAutoplayVideos();
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  mediaNodes.forEach(function (node, index) {
    var isVideo = node.tagName === 'VIDEO';
    var src = isVideo
      ? (node.currentSrc || node.src || (node.querySelector('source') && node.querySelector('source').src) || '')
      : (node.currentSrc || node.src);

    slides.push({
      type: isVideo ? 'video' : 'image',
      src: src,
      alt: node.getAttribute('aria-label') || node.alt || ''
    });

    var wrap = document.createElement('button');
    wrap.type = 'button';
    wrap.className = 'cs-lightbox-trigger';
    wrap.setAttribute(
      'aria-label',
      'View larger ' + (isVideo ? 'video' : 'image') +
        (node.getAttribute('aria-label') || node.alt
          ? ': ' + (node.getAttribute('aria-label') || node.alt)
          : '')
    );

    node.parentNode.insertBefore(wrap, node);
    wrap.appendChild(node);

    var zoom = document.createElement('span');
    zoom.className = 'cs-lightbox-trigger__zoom';
    zoom.setAttribute('aria-hidden', 'true');
    zoom.innerHTML = ZOOM_SVG;
    wrap.appendChild(zoom);

    wrap.addEventListener('click', function () {
      openLightbox(index);
    });
  });

  // Wrapping reparents videos after nav.js autoplay; restart muted loops in-grid.
  resumePageAutoplayVideos();

  closeTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      closeLightbox();
    });
  });

  // Close on any black/backdrop click; keep only the media itself interactive.
  root.addEventListener('click', function (event) {
    if (
      event.target.closest('.cs-lightbox__img') ||
      event.target.closest('.cs-lightbox__video') ||
      event.target.closest('.cs-lightbox__close')
    ) {
      return;
    }
    closeLightbox();
  });

  prevBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    showSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    showSlide(currentIndex + 1);
  });

  document.addEventListener('keydown', function (event) {
    if (root.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
    } else if (event.key === 'ArrowLeft' && slides.length > 1) {
      event.preventDefault();
      showSlide(currentIndex - 1);
    } else if (event.key === 'ArrowRight' && slides.length > 1) {
      event.preventDefault();
      showSlide(currentIndex + 1);
    }
  });
})();
