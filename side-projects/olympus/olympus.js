(function () {
  var year = new Date().getFullYear();
  document.querySelectorAll('[data-copyright-year]').forEach(function (el) {
    el.textContent = year;
  });

  var FACES = [
    {
      id: 'trinity',
      name: 'Trinity',
      tone: 'trinity',
      img: 'olympus/img/watch-face-trinity.png',
      href: 'https://www.facer.io/watchface/PlCebnVFlx',
      features: [
        'A tripolar layout separates zones for time, status, and motion.',
        'A rotating particle ring acts as a seconds hand.',
        'Battery, heart rate, and date remain in fixed positions to maintain visibility outdoors or during runs.',
        'High-contrast typography works well on circular AMOLED screens, while black-heavy art reduces battery use and stays readable in sunlight.'
      ]
    },
    {
      id: 'olympus',
      name: 'Olympus',
      tone: 'olympus',
      img: 'olympus/img/watch-face-olympus.png',
      href: 'https://www.facer.io/watchface/LWT4Nn1AQB',
      features: [
        'A minimal white dial with sharp hour markers prioritises the time.',
        'Open space in the centre, even stroke weights, and minimal complications keep the face clear in motion.',
        'Strong sunlight contrast and low AMOLED power draw suit everyday wear.'
      ]
    },
    {
      id: 'classic',
      name: 'Classic',
      tone: 'classic',
      img: 'olympus/img/watch-face-classic.png',
      href: 'https://www.facer.io/watchface/n3EZQOr49p',
      features: [
        'A vintage dial features texture and warm tones.',
        'Heart rate, battery, and date integrate directly into the dial to match the visual style.',
        'Time is legible in about a second at arm\'s length in busy environments or low light.'
      ]
    },
    {
      id: 'trio',
      name: 'Trio',
      tone: 'trio',
      img: 'olympus/img/watch-face-trio.png',
      href: 'https://www.facer.io/watchface/o0rGGL7VDD',
      features: [
        'A sport-focused face built for training.',
        'Complications sit beside the clock to keep heart rate, battery, and support data accessible.',
        'High contrast suits outdoor light and gyms, keeping time dominant while secondary data remains available for mid-set checks.'
      ]
    },
    {
      id: 'foundations',
      name: 'Foundations',
      tone: 'foundations',
      img: 'olympus/img/watch-face-foundations.png',
      href: '',
      features: [
        'An analogue daily layout features a compass, calorie burn, and weather around the rim.',
        'Pill-shaped hands and crisp outer ticks ensure fast reads in direct sunlight.',
        'Available soon on Facer for circular AMOLED watches.'
      ]
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
    var label = '<span class="olympus-btn-label">Install on Facer</span><span class="material-symbols-rounded olympus-icon olympus-icon--button" aria-hidden="true">download</span>';
    return '<a class="faces_grid_button faces_grid_button--primary" href="' + escapeHtml(face.href) + '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
  }

  var panel = root.querySelector('[data-faces-layout="carousel"]');
  if (!panel) {
    return;
  }

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  panel.innerHTML =
    '<div class="faces_stage">' +
      '<div class="faces_ticker" data-faces-ticker role="tablist" aria-label="Watch face position">' +
        '<div class="faces_ticker_thumb" data-faces-ticker-thumb aria-hidden="true"></div>' +
        FACES.map(function (face, index) {
          return (
            '<button type="button" class="faces_tick' + (index === 0 ? ' is-active' : '') + '" data-faces-tick="' + index + '" role="tab" aria-selected="' + (index === 0 ? 'true' : 'false') + '" aria-label="' + escapeHtml(face.name) + '"></button>'
          );
        }).join('') +
      '</div>' +
      '<div class="faces_main">' +
        '<div class="faces_rail" data-faces-rail tabindex="0" aria-label="Watch faces">' +
          FACES.map(function (face, index) {
            return (
              '<article class="faces_slide' + (index === 0 ? ' is-active' : '') + '" data-faces-slide="' + index + '">' +
                '<div class="faces_watch_card" data-faces-watch>' +
                  '<img class="faces_watch_img" src="' + escapeHtml(face.img) + '" alt="' + escapeHtml(face.name + ' watch face') + '" draggable="false">' +
                '</div>' +
                '<div class="faces_slide_body">' +
                  '<h2 class="faces_slide_title">' + escapeHtml(face.name) + '</h2>' +
                  '<ul class="faces_slide_features">' +
                    face.features.map(function (feature) {
                      return '<li>' + escapeHtml(feature) + '</li>';
                    }).join('') +
                  '</ul>' +
                  '<div class="faces_slide_cta">' + installButton(face) + '</div>' +
                '</div>' +
              '</article>'
            );
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>';

  var rail = panel.querySelector('[data-faces-rail]');
  var ticker = panel.querySelector('[data-faces-ticker]');
  var tickerThumb = panel.querySelector('[data-faces-ticker-thumb]');
  var ticks = Array.prototype.slice.call(panel.querySelectorAll('[data-faces-tick]'));
  var slides = Array.prototype.slice.call(panel.querySelectorAll('[data-faces-slide]'));
  var activeIndex = 0;

  function syncRailHeight() {
    var stacked = isStackedFaces();
    var maxHeight = 0;
    slides.forEach(function (slide) {
      var card = slide.querySelector('.faces_watch_card');
      var body = slide.querySelector('.faces_slide_body');
      var cardH = card ? card.offsetHeight : 0;
      var bodyH = body ? body.offsetHeight : 0;
      var styles = window.getComputedStyle(slide);
      var gap = parseFloat(styles.rowGap || styles.gap) || 0;
      var height = stacked ? cardH + gap + bodyH : Math.max(cardH, bodyH);
      maxHeight = Math.max(maxHeight, height);
    });
    if (maxHeight < 1) {
      return;
    }
    var next = Math.ceil(maxHeight);
    rail.style.setProperty('--faces-rail-height', next + 'px');
    rail.scrollTop = activeIndex * next;
  }
  var audioCtx = null;
  var audioUnlocked = false;
  var thumbPos = 0;
  var thumbTarget = 0;

  function isStackedFaces() {
    return window.matchMedia('(max-width: 800px)').matches;
  }
  var dragState = null;
  var programScroll = false;
  var programScrollTimer = 0;

  function ensureAudio() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      return null;
    }
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    audioUnlocked = true;
    return audioCtx;
  }

  function playTick() {
    var ctx = ensureAudio();
    if (!ctx) {
      return;
    }
    var now = ctx.currentTime;

    // Short noise burst: mechanical click, not a pitched pop.
    var duration = 0.014;
    var bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
    var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
    }

    var noise = ctx.createBufferSource();
    noise.buffer = buffer;

    var highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 2200;

    var band = ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 3600;
    band.Q.value = 0.8;

    var noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.05, now + 0.001);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

    noise.connect(highpass);
    highpass.connect(band);
    band.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + duration);

    // Tiny high transient for a crisp tick edge.
    var osc = ctx.createOscillator();
    var oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(4800, now);
    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.exponentialRampToValueAtTime(0.028, now + 0.0007);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.012);
  }

  function unlockAudioOnce() {
    if (!audioUnlocked) {
      ensureAudio();
    }
  }

  ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (eventName) {
    window.addEventListener(eventName, unlockAudioOnce, { once: true, passive: true });
  });

  function tickTargetPos(index) {
    if (!ticker || !tickerThumb || !ticks[index]) {
      return 0;
    }
    var tickerRect = ticker.getBoundingClientRect();
    var tickRect = ticks[index].getBoundingClientRect();
    if (isStackedFaces()) {
      return tickRect.left - tickerRect.left + (tickRect.width - tickerThumb.offsetWidth) / 2;
    }
    return tickRect.top - tickerRect.top + (tickRect.height - tickerThumb.offsetHeight) / 2;
  }

  function applyThumbTransform(pos) {
    if (!tickerThumb) {
      return;
    }
    if (isStackedFaces()) {
      tickerThumb.style.transform = 'translate(' + pos + 'px, -50%)';
    } else {
      tickerThumb.style.transform = 'translate(-50%, ' + pos + 'px)';
    }
  }

  function setThumbTarget(index) {
    thumbTarget = tickTargetPos(index);
    thumbPos = thumbTarget;
    if (!tickerThumb) {
      return;
    }
    if (reducedMotion) {
      tickerThumb.style.transition = 'none';
    }
    applyThumbTransform(thumbPos);
  }

  function setActive(index, options) {
    var next = Math.max(0, Math.min(FACES.length - 1, index));
    var changed = next !== activeIndex;
    activeIndex = next;

    ticks.forEach(function (tick, i) {
      var on = i === activeIndex;
      tick.classList.toggle('is-active', on);
      tick.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === activeIndex);
    });

    if (changed) {
      setThumbTarget(activeIndex);
      if (!options || options.sound !== false) {
        playTick();
      }
    }
  }

  function updateSlideMotion() {
    var height = rail.clientHeight || 1;
    var progress = rail.scrollTop / height;
    slides.forEach(function (slide, i) {
      var abs = Math.abs(progress - i);
      // Gentle crossfade only; no drift / 3D motion.
      var opacity = reducedMotion ? 1 : Math.max(0.72, 1 - abs * 0.28);
      slide.style.opacity = String(opacity);
      slide.style.transform = '';
    });
  }

  function indexFromScroll() {
    var height = rail.clientHeight || 1;
    return Math.round(rail.scrollTop / height);
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function setRailSnap(enabled) {
    rail.style.scrollSnapType = enabled ? '' : 'none';
  }

  function animateRailTo(top, duration) {
    var start = rail.scrollTop;
    var delta = top - start;
    if (Math.abs(delta) < 1 || reducedMotion || duration <= 0) {
      setRailSnap(false);
      rail.scrollTop = top;
      updateSlideMotion();
      setActive(indexFromScroll(), { sound: false });
      setRailSnap(true);
      programScroll = false;
      return;
    }

    programScroll = true;
    setRailSnap(false);
    window.clearTimeout(programScrollTimer);
    var t0 = performance.now();

    function frame(now) {
      var t = Math.min(1, (now - t0) / duration);
      rail.scrollTop = start + delta * easeInOutCubic(t);
      updateSlideMotion();
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        rail.scrollTop = top;
        updateSlideMotion();
        setRailSnap(true);
        programScroll = false;
        setActive(indexFromScroll(), { sound: false });
      }
    }

    requestAnimationFrame(frame);
  }

  function goToFace(index, behavior) {
    var next = Math.max(0, Math.min(FACES.length - 1, index));
    var top = next * rail.clientHeight;
    // Ticker jumps land on the chosen face directly, not every face in between
    // (scroll-snap makes that feel like a cycle).
    var instant = behavior === 'auto' || behavior === 'direct' || reducedMotion;

    setActive(next);
    if (instant) {
      programScroll = true;
      setRailSnap(false);
      rail.scrollTop = top;
      updateSlideMotion();
      programScrollTimer = window.setTimeout(function () {
        setRailSnap(true);
        programScroll = false;
      }, 40);
    } else {
      animateRailTo(top, 640);
    }
  }

  rail.addEventListener('scroll', function () {
    updateSlideMotion();
    if (!programScroll) {
      setActive(indexFromScroll());
    }
  }, { passive: true });

  ticks.forEach(function (tick) {
    tick.addEventListener('click', function () {
      var index = Number(tick.getAttribute('data-faces-tick'));
      if (Number.isNaN(index)) {
        return;
      }
      unlockAudioOnce();
      goToFace(index, 'direct');
    });
  });

  // Drag on the active watch card / rail to change faces (desktop only)
  rail.addEventListener('pointerdown', function (event) {
    if (isStackedFaces()) {
      return;
    }
    if (event.button != null && event.button !== 0) {
      return;
    }
    if (event.target.closest('a, button')) {
      return;
    }
    unlockAudioOnce();
    dragState = { id: event.pointerId, y: event.clientY, acc: 0 };
    rail.classList.add('is-dragging');
    try {
      rail.setPointerCapture(event.pointerId);
    } catch (err) {
      // ignore
    }
  });

  rail.addEventListener('pointermove', function (event) {
    if (!dragState || dragState.id !== event.pointerId || isStackedFaces()) {
      return;
    }
    var dy = event.clientY - dragState.y;
    dragState.y = event.clientY;
    dragState.acc += dy;
    var step = 48;
    if (Math.abs(dragState.acc) >= step) {
      var dir = dragState.acc > 0 ? 1 : -1;
      dragState.acc -= dir * step;
      goToFace(activeIndex + dir, 'auto');
    }
  });

  function endDrag(event) {
    if (!dragState || dragState.id !== event.pointerId) {
      return;
    }
    dragState = null;
    rail.classList.remove('is-dragging');
  }

  rail.addEventListener('pointerup', endDrag);
  rail.addEventListener('pointercancel', endDrag);

  window.addEventListener('resize', function () {
    syncRailHeight();
    rail.scrollTop = activeIndex * rail.clientHeight;
    if (tickerThumb) {
      tickerThumb.style.transition = 'none';
    }
    setThumbTarget(activeIndex);
    if (tickerThumb) {
      void tickerThumb.offsetHeight;
      tickerThumb.style.transition = '';
    }
    updateSlideMotion();
  });

  updateSlideMotion();
  setActive(0, { sound: false });
  requestAnimationFrame(function () {
    syncRailHeight();
    if (tickerThumb) {
      tickerThumb.style.transition = 'none';
    }
    setThumbTarget(0);
    if (tickerThumb) {
      void tickerThumb.offsetHeight;
      tickerThumb.style.transition = '';
    }
    updateSlideMotion();
  });
})();
