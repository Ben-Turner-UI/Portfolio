(function () {
  var root = document.querySelector('[data-bb-builder]');
  if (!root) return;

  var panes = [
    '<div class="muted">from Query rows</div>to: "ops@acme.com"<br>subject: "New order #4182"<br>rows: 3',
    '<div class="muted">no output</div>Step did not complete',
    '<div class="bb-builder__errmsg">SMTP host not set. Add it in Settings, then test the step again.</div>'
  ];

  var pane = root.querySelector('[data-bb-builder-pane]');
  var tabs = root.querySelectorAll('[data-bb-builder-tab]');
  if (!pane || !tabs.length) return;

  function selectTab(tab) {
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].setAttribute('aria-selected', 'false');
    }
    tab.setAttribute('aria-selected', 'true');
    pane.innerHTML = panes[Number(tab.getAttribute('data-bb-builder-tab'))];
  }

  for (var j = 0; j < tabs.length; j++) {
    tabs[j].addEventListener('click', function () {
      selectTab(this);
    });
  }

  selectTab(root.querySelector('[data-bb-builder-tab="2"]'));
})();
