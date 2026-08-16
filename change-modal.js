(function () {
  var modal = document.getElementById('change-modal');
  var titleEl = document.getElementById('change-modal-title');
  var contentEl = document.getElementById('change-modal-content');
  var lastTrigger = null;

  function setComparePosition(slider, percent) {
    var value = Math.max(0, Math.min(100, percent));
    var before = slider.querySelector('.compare-slider__before');
    var handle = slider.querySelector('.compare-slider__handle');
    var beforeImg = slider.querySelector('.compare-slider__img--before');

    if (before) before.style.width = value + '%';
    if (handle) {
      handle.style.left = value + '%';
      handle.setAttribute('aria-valuenow', String(Math.round(value)));
    }
    if (beforeImg) {
      var w = slider.clientWidth;
      if (w) beforeImg.style.width = w + 'px';
    }
  }

  function initCompareSlider(slider) {
    if (slider.dataset.compareReady === 'true') return;

    var handle = slider.querySelector('.compare-slider__handle');
    var afterImg = slider.querySelector('.compare-slider__img--after');
    var beforeImg = slider.querySelector('.compare-slider__img--before');
    if (!handle || !afterImg || !beforeImg) return;

    slider.dataset.compareReady = 'true';

    function syncWidth() {
      var w = afterImg.offsetWidth || slider.clientWidth;
      var h = afterImg.offsetHeight || slider.clientHeight;
      if (!w) return;
      beforeImg.style.width = w + 'px';
      if (h) beforeImg.style.height = h + 'px';
      beforeImg.style.maxWidth = 'none';
      beforeImg.style.objectFit = 'cover';
      beforeImg.style.objectPosition = 'left top';
    }

    function updateFromClientX(clientX) {
      var rect = slider.getBoundingClientRect();
      if (!rect.width) return;
      setComparePosition(slider, ((clientX - rect.left) / rect.width) * 100);
    }

    var dragging = false;
    var activePointerId = null;
    var startX = 0;
    var startY = 0;
    var axisLocked = null; /* 'x' | 'y' | null */

    function endDrag(event) {
      if (!dragging && axisLocked !== 'x') {
        axisLocked = null;
        return;
      }
      dragging = false;
      activePointerId = null;
      axisLocked = null;
      slider.classList.remove('is-dragging');
      if (slider.releasePointerCapture && event) {
        try { slider.releasePointerCapture(event.pointerId); } catch (err) {}
      }
    }

    function onPointerDown(event) {
      var onHandle = event.target === handle || handle.contains(event.target);
      activePointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      axisLocked = null;

      if (onHandle || event.pointerType === 'mouse') {
        dragging = true;
        axisLocked = 'x';
        slider.classList.add('is-dragging');
        if (slider.setPointerCapture) slider.setPointerCapture(event.pointerId);
        updateFromClientX(event.clientX);
        event.preventDefault();
        return;
      }

      // Touch on image: wait to see if the gesture is horizontal (compare) or vertical (scroll).
      dragging = false;
    }

    function onPointerMove(event) {
      if (activePointerId !== null && event.pointerId !== activePointerId) return;

      if (!dragging && activePointerId !== null && axisLocked === null) {
        var dx = event.clientX - startX;
        var dy = event.clientY - startY;
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          axisLocked = 'y';
          activePointerId = null;
          return;
        }
        axisLocked = 'x';
        dragging = true;
        slider.classList.add('is-dragging');
        if (slider.setPointerCapture) slider.setPointerCapture(event.pointerId);
        updateFromClientX(event.clientX);
        event.preventDefault();
        return;
      }

      if (!dragging || axisLocked === 'y') return;
      updateFromClientX(event.clientX);
      event.preventDefault();
    }

    function onPointerUp(event) {
      if (activePointerId !== null && event.pointerId !== activePointerId) return;
      endDrag(event);
    }

    slider.addEventListener('pointerdown', onPointerDown);
    slider.addEventListener('pointermove', onPointerMove);
    slider.addEventListener('pointerup', onPointerUp);
    slider.addEventListener('pointercancel', onPointerUp);

    handle.addEventListener('keydown', function (event) {
      var current = Number(handle.getAttribute('aria-valuenow') || 50);
      if (event.key === 'ArrowLeft') {
        setComparePosition(slider, current - 5);
        event.preventDefault();
      } else if (event.key === 'ArrowRight') {
        setComparePosition(slider, current + 5);
        event.preventDefault();
      } else if (event.key === 'Home') {
        setComparePosition(slider, 0);
        event.preventDefault();
      } else if (event.key === 'End') {
        setComparePosition(slider, 100);
        event.preventDefault();
      }
    });

    function ready() {
      syncWidth();
      setComparePosition(slider, 50);
    }

    if (afterImg.complete && afterImg.naturalWidth) {
      ready();
    } else {
      afterImg.addEventListener('load', ready);
    }

    window.addEventListener('resize', syncWidth);

    if (typeof ResizeObserver === 'function') {
      var ro = new ResizeObserver(function () {
        syncWidth();
      });
      ro.observe(slider);
    }
  }

  function initCompareSliders(root) {
    var sliders = root.querySelectorAll('[data-compare-slider]');
    for (var i = 0; i < sliders.length; i++) {
      initCompareSlider(sliders[i]);
    }
  }

  function openChange(templateId, trigger) {
    var template = document.getElementById(templateId);
    if (!template) return;

    var fragment = template.content.cloneNode(true);
    var heading = fragment.querySelector('.change-modal__heading');
    var title = heading ? heading.textContent.trim() : 'Change detail';

    if (heading) heading.remove();

    titleEl.textContent = title;
    contentEl.replaceChildren(fragment);
    lastTrigger = trigger || null;

    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }

    document.body.style.overflow = 'hidden';

    // Init after the dialog is open and laid out so image widths are non-zero.
    requestAnimationFrame(function () {
      initCompareSliders(contentEl);
      requestAnimationFrame(function () {
        initCompareSliders(contentEl);
      });
    });
  }

  function closeChange() {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  }

  // Init any sliders that live directly on the page (outside the modal).
  initCompareSliders(document);

  if (!modal) return;

  document.addEventListener('click', function (event) {
    var openBtn = event.target.closest('[data-change-open]');
    if (openBtn) {
      event.preventDefault();
      openChange(openBtn.getAttribute('data-change-open'), openBtn);
      return;
    }

    if (event.target.closest('[data-change-close]')) {
      event.preventDefault();
      closeChange();
    }
  });

  modal.addEventListener('click', function (event) {
    if (event.target.closest('[data-compare-slider]')) return;
    if (event.target === modal) closeChange();
  });

  modal.addEventListener('close', function () {
    contentEl.replaceChildren();
    titleEl.textContent = '';
    document.body.style.overflow = '';
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.open) {
      closeChange();
    }
  });
})();
