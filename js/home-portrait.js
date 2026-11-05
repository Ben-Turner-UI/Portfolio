/* Homepage dot portrait.
   Adjust these and reload. columns is the dot count across the crop. */
(function () {
  var settings = {
    columns: 72,
    contrast: 1.35,
    brightness: 0.14,
    maxRadius: 0.4,
    minAlpha: 40,
    minValue: 0.145,
    crop: { x: 0.02, y: 0, w: 0.94, h: 0.92 },
    color: "rgb(250, 249, 245)",
    src: "img/portrait-cutout.png"
  };

  var figure = document.querySelector(".home-portrait");
  if (!figure) return;
  var canvas = figure.querySelector(".home-portrait__canvas");
  var source = new Image();
  var queued = false;

  function render() {
    if (!source.naturalWidth) return;
    var cssW = figure.clientWidth;
    var cssH = figure.clientHeight;
    if (!cssW || !cssH) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 3);
    var w = Math.max(1, Math.round(cssW * dpr));
    var h = Math.max(1, Math.round(cssH * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, w, h);

    var cols = settings.columns;
    var crop = settings.crop;
    var sx = source.naturalWidth * crop.x;
    var sy = source.naturalHeight * crop.y;
    var sw = source.naturalWidth * crop.w;
    var sh = source.naturalHeight * crop.h;
    var rows = Math.max(1, Math.round(cols * (sh / sw)));

    var sample = document.createElement("canvas");
    sample.width = cols;
    sample.height = rows;
    var sctx = sample.getContext("2d", { willReadFrequently: true });
    sctx.imageSmoothingEnabled = true;
    sctx.drawImage(source, sx, sy, sw, sh, 0, 0, cols, rows);
    var data = sctx.getImageData(0, 0, cols, rows).data;

    var cell = w / cols;
    ctx.fillStyle = settings.color;
    for (var i = 0; i < cols * rows; i++) {
      var o = i * 4;
      if (data[o + 3] < settings.minAlpha) continue;
      var lum = (0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2]) / 255;
      var v = (lum - 0.5) * settings.contrast + 0.5 + settings.brightness;
      if (v < 0) v = 0;
      else if (v > 1) v = 1;
      if (v < settings.minValue) continue;
      var radius = v * cell * settings.maxRadius;
      var col = i % cols;
      var row = (i - col) / cols;
      ctx.beginPath();
      ctx.arc((col + 0.5) * cell, (row + 0.5) * cell, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    figure.classList.add("is-drawn");
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      render();
    });
  }

  source.onload = schedule;
  source.src = settings.src;

  if (typeof ResizeObserver === "function") {
    new ResizeObserver(schedule).observe(figure);
  } else {
    window.addEventListener("resize", schedule);
  }
})();
