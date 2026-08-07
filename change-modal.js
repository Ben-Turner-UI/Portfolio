(function () {
  var modal = document.getElementById('change-modal');
  if (!modal) return;

  var titleEl = document.getElementById('change-modal-title');
  var contentEl = document.getElementById('change-modal-content');
  var lastTrigger = null;

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
  }

  function closeChange() {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  }

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
    var rect = modal.getBoundingClientRect();
    var clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (event.target === modal || clickedOutside) closeChange();
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
