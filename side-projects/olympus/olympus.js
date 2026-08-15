(function () {
  var year = new Date().getFullYear();
  document.querySelectorAll('[data-copyright-year]').forEach(function (el) {
    el.textContent = year;
  });

  // In-page CTAs: smooth-scroll without leaving focus on the hero button
  // (focused anchors + nested backdrop-filter caused the CTA to vanish on scroll back).
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var id = anchor.getAttribute('href').slice(1);
      if (!id) {
        return;
      }
      var target = document.getElementById(id);
      if (!target) {
        return;
      }
      event.preventDefault();
      if (typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (history.replaceState) {
        history.replaceState(null, '', '#' + id);
      } else {
        location.hash = id;
      }
      if (typeof anchor.blur === 'function') {
        anchor.blur();
      }
    });
  });

  var navInner = document.querySelector('.home-nav_inner');
  var brand = document.querySelector('.home-nav_brand');
  var designer = document.querySelector('.home-nav_designer');

  if (navInner && brand && designer) {
    function syncNavDesigner() {
      designer.classList.remove('is-nav-collapsed');

      var brandRect = brand.getBoundingClientRect();
      var designerRect = designer.getBoundingClientRect();

      if (designerRect.top > brandRect.bottom - 2) {
        designer.classList.add('is-nav-collapsed');
      }
    }

    window.addEventListener('resize', syncNavDesigner);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncNavDesigner);
    } else {
      window.addEventListener('load', syncNavDesigner);
    }

    if (typeof ResizeObserver !== 'undefined') {
      var observer = new ResizeObserver(syncNavDesigner);
      observer.observe(navInner);
      observer.observe(brand);
      observer.observe(designer);
    }

    syncNavDesigner();
  }

  var FACES = [
    {
      id: 'trinity',
      name: 'Trinity',
      tone: 'trinity',
      img: 'olympus/img/watch-face-trinity.png',
      href: 'https://www.facer.io/watchface/PlCebnVFlx',
      blurb: 'Bold, space-age styling featuring a highly distinct tripolar layout. Battery, heartrate, and date sit among rotating particles that perfectly echo the sweep of a seconds hand.'
    },
    {
      id: 'olympus',
      name: 'Olympus',
      tone: 'olympus',
      img: 'olympus/img/watch-face-olympus.png',
      href: 'https://www.facer.io/watchface/LWT4Nn1AQB',
      blurb: 'Clean, minimal, and entirely true to the Olympus brand. This bright white dial keeps things simple, offering a timeless, highly readable design for easy daily wear.'
    },
    {
      id: 'classic',
      name: 'Classic',
      tone: 'classic',
      img: 'olympus/img/watch-face-classic.png',
      href: 'https://www.facer.io/watchface/n3EZQOr49p',
      blurb: 'A vintage dial featuring heartrate, battery, and date complications. It offers nautical, wartime-inspired styling with rich character and high readability tailored for the modern traditionalist.'
    },
    {
      id: 'trio',
      name: 'Trio',
      tone: 'trio',
      img: 'olympus/img/watch-face-trio.png',
      href: 'https://www.facer.io/watchface/o0rGGL7VDD',
      blurb: 'Designed specifically with sport in mind, utilizing three clear complications within a tripartite layout. It remains modern, highly purposeful, and perfectly readable while on the move.'
    },
    {
      id: 'foundations',
      name: 'Foundations',
      tone: 'foundations',
      img: 'olympus/img/watch-face-foundations.png',
      href: '',
      blurb: 'A core analog layout built for reliable everyday utility. Compass, calorie, and weather complications sit on a clean, high-contrast dial acting as the essential Olympus foundation.'
    }
  ];

  var root = document.querySelector('[data-faces-root]');
  if (!root) {
    return;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function installButton(face) {
    if (!face.href) {
      return '<button type="button" class="faces_grid_button faces_grid_button--secondary" disabled><span class="olympus-btn-label">Coming soon</span></button>';
    }
    var label = '<span class="olympus-btn-label">Install on Facer</span><span class="material-symbols-outlined olympus-icon olympus-icon--button" aria-hidden="true">download</span>';
    return '<a class="faces_grid_button faces_grid_button--primary" href="' + escapeHtml(face.href) + '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
  }

  function dialImage(face, className) {
    return '<img class="' + className + '" src="' + escapeHtml(face.img) + '" alt="' + escapeHtml(face.name + ' watch face') + '">';
  }

  var panel = root.querySelector('[data-faces-layout="featured"]');
  if (!panel) {
    return;
  }

  var first = FACES[0];
  panel.innerHTML =
    '<div class="faces_featured" data-faces-featured>' +
      '<div class="faces_featured_stage">' +
        '<div class="faces_featured_media faces_grid_media--' + first.tone + '" data-featured-media>' +
          dialImage(first, 'faces_featured_img') +
        '</div>' +
        '<div class="faces_featured_copy">' +
          '<h2 class="section_heading" data-featured-name>' + escapeHtml(first.name) + '</h2>' +
          '<p data-featured-blurb>' + escapeHtml(first.blurb) + '</p>' +
          '<div data-featured-cta>' + installButton(first) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="faces_featured_strip" role="list">' +
        FACES.map(function (face, index) {
          return (
            '<button type="button" class="faces_featured_thumb' + (index === 0 ? ' is-active' : '') + '" role="listitem" data-featured-thumb="' + index + '" aria-label="Show ' + escapeHtml(face.name) + '" aria-pressed="' + (index === 0 ? 'true' : 'false') + '">' +
              dialImage(face, 'faces_featured_thumb_img') +
              '<span>' + escapeHtml(face.name) + '</span>' +
            '</button>'
          );
        }).join('') +
      '</div>' +
    '</div>';

  var featured = panel.querySelector('[data-faces-featured]');
  var media = featured.querySelector('[data-featured-media]');
  var nameEl = featured.querySelector('[data-featured-name]');
  var blurbEl = featured.querySelector('[data-featured-blurb]');
  var ctaEl = featured.querySelector('[data-featured-cta]');
  var thumbs = featured.querySelectorAll('[data-featured-thumb]');

  function setFace(nextIndex) {
    var face = FACES[nextIndex];
    media.className = 'faces_featured_media faces_grid_media--' + face.tone;
    media.innerHTML = dialImage(face, 'faces_featured_img');
    nameEl.textContent = face.name;
    blurbEl.textContent = face.blurb;
    ctaEl.innerHTML = installButton(face);
    thumbs.forEach(function (thumb, i) {
      var active = i === nextIndex;
      thumb.classList.toggle('is-active', active);
      thumb.setAttribute('aria-pressed', active ? 'true' : 'false');
      if (active) {
        var strip = thumb.parentElement;
        if (strip) {
          var thumbLeft = thumb.offsetLeft;
          var thumbWidth = thumb.offsetWidth;
          var stripWidth = strip.clientWidth;
          var nextLeft = Math.max(0, thumbLeft - (stripWidth - thumbWidth) / 2);
          if (typeof strip.scrollTo === 'function') {
            strip.scrollTo({ left: nextLeft, behavior: 'smooth' });
          } else {
            strip.scrollLeft = nextLeft;
          }
        }
      }
    });
  }

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      setFace(Number(thumb.getAttribute('data-featured-thumb')));
    });
  });
})();
