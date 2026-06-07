(function () {
  var navInner = document.querySelector('.home-nav_inner');
  var brand = document.querySelector('.home-nav_brand');
  var designer = document.querySelector('.home-nav_designer');

  if (!navInner || !brand || !designer) {
    return;
  }

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
})();
