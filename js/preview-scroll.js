document.addEventListener('DOMContentLoaded', function () {
  var preview = document.querySelector('.case-hero-preview');
  if (!preview) return;
  var track = preview.querySelector('.case-hero-preview__track');
  if (!track) return;

  var origCount = track.children.length;
  var items = Array.prototype.slice.call(track.children);
  items.forEach(function (item) { track.appendChild(item.cloneNode(true)); });

  var speed = 0.27;
  var interacting = false;
  var resumeTimer = null;
  var lastTouchX = 0;
  var x = 0;
  var half = 0;
  var startOffset = 0;

  function wrap(val) {
    while (val >= startOffset + half) val -= half;
    while (val < startOffset) val += half;
    return val;
  }

  function init() {
    var orig  = track.children[0];
    var clone = track.children[origCount];
    if (!orig || !clone || !clone.offsetLeft) {
      requestAnimationFrame(init);
      return;
    }
    startOffset = orig.offsetLeft;          // отступ до первого элемента (padding)
    half = clone.offsetLeft - orig.offsetLeft; // точная длина одного цикла
    x = startOffset;                        // стартуем ровно с первого элемента
    requestAnimationFrame(tick);
  }

  function tick() {
    if (!interacting) x = wrap(x + speed);
    track.style.transform = 'translateX(-' + x + 'px)';
    requestAnimationFrame(tick);
  }

  // Колесо мыши
  preview.addEventListener('wheel', function (e) {
    interacting = true;
    clearTimeout(resumeTimer);
    var delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    x = wrap(x + delta * 0.5);
    resumeTimer = setTimeout(function () { interacting = false; }, 600);
  }, { passive: true });

  // Тач
  preview.addEventListener('touchstart', function (e) {
    interacting = true;
    clearTimeout(resumeTimer);
    lastTouchX = e.touches[0].clientX;
  }, { passive: true });

  preview.addEventListener('touchmove', function (e) {
    x = wrap(x + (lastTouchX - e.touches[0].clientX));
    lastTouchX = e.touches[0].clientX;
  }, { passive: true });

  preview.addEventListener('touchend', function () {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(function () { interacting = false; }, 600);
  });

  // Мышь
  preview.addEventListener('mousedown', function () {
    interacting = true;
    clearTimeout(resumeTimer);
  });
  preview.addEventListener('mouseup', function () { interacting = false; });

  requestAnimationFrame(init);
});
