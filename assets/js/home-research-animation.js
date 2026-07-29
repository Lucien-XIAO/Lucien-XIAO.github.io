(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', function () {
    var hero = document.querySelector('.home-hero');
    var canvas = document.getElementById('homeResearchCanvas');
    var nextSection = document.getElementById('about-me');
    if (!hero || !canvas || !nextSection) return;

    var context = canvas.getContext('2d');
    if (!context) return;

    var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    var width = 0;
    var height = 0;
    var pixelRatio = 1;
    var spacing = 52;
    var columns = 0;
    var rows = 0;
    var nodes = [];
    var trail = [];
    var walker = { column: 0, row: 0 };
    var accent = '#2f7380';
    var animationFrame = 0;
    var lastWalk = 0;
    var lastPercolationChange = 0;
    var heroVisible = true;
    var resizeTimer = 0;
    var scrollLocked = false;

    var nodeIndex = function (column, row) {
      return row * columns + column;
    };

    var pointFor = function (column, row) {
      return {
        x: column * spacing + spacing * 0.5,
        y: row * spacing + spacing * 0.5
      };
    };

    var refreshAccent = function () {
      var value = window.getComputedStyle(hero).getPropertyValue('--site-accent').trim();
      if (value) accent = value;
    };

    var createField = function () {
      columns = Math.ceil(width / spacing);
      rows = Math.ceil(height / spacing);
      nodes = [];

      for (var row = 0; row < rows; row += 1) {
        for (var column = 0; column < columns; column += 1) {
          nodes.push(Math.random() < 0.57);
        }
      }

      walker = {
        column: Math.max(0, Math.min(columns - 1, Math.floor(columns * 0.18))),
        row: Math.max(0, Math.min(rows - 1, Math.floor(rows * 0.7)))
      };
      trail = [pointFor(walker.column, walker.row)];
    };

    var resizeCanvas = function () {
      var bounds = hero.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      spacing = width < 640 ? 38 : 52;

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      refreshAccent();
      createField();
      drawField(0);
    };

    var drawConnection = function (from, to) {
      context.moveTo(from.x, from.y);
      context.lineTo(to.x, to.y);
    };

    var drawField = function (time) {
      context.clearRect(0, 0, width, height);
      context.strokeStyle = accent;
      context.fillStyle = accent;
      context.lineWidth = 0.8;
      context.globalAlpha = 0.09;
      context.beginPath();

      for (var row = 0; row < rows; row += 1) {
        for (var column = 0; column < columns; column += 1) {
          if (!nodes[nodeIndex(column, row)]) continue;
          var point = pointFor(column, row);

          if (column + 1 < columns && nodes[nodeIndex(column + 1, row)]) {
            drawConnection(point, pointFor(column + 1, row));
          }
          if (row + 1 < rows && nodes[nodeIndex(column, row + 1)]) {
            drawConnection(point, pointFor(column, row + 1));
          }
        }
      }
      context.stroke();

      for (var nodeRow = 0; nodeRow < rows; nodeRow += 1) {
        for (var nodeColumn = 0; nodeColumn < columns; nodeColumn += 1) {
          var active = nodes[nodeIndex(nodeColumn, nodeRow)];
          var node = pointFor(nodeColumn, nodeRow);
          var pulse = active ? 0.025 * Math.sin(time * 0.0015 + nodeColumn * 0.7 + nodeRow * 0.4) : 0;
          context.globalAlpha = active ? 0.16 + pulse : 0.035;
          context.beginPath();
          context.arc(node.x, node.y, active ? 1.5 : 0.8, 0, Math.PI * 2);
          context.fill();
        }
      }

      if (trail.length > 1) {
        context.globalAlpha = 0.3;
        context.lineWidth = 1.45;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.beginPath();
        context.moveTo(trail[0].x, trail[0].y);
        for (var step = 1; step < trail.length; step += 1) {
          context.lineTo(trail[step].x, trail[step].y);
        }
        context.stroke();
      }

      var current = trail[trail.length - 1];
      if (current) {
        context.globalAlpha = 0.58;
        context.beginPath();
        context.arc(current.x, current.y, 2.8, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
    };

    var advanceWalker = function () {
      var directions = [
        { column: 1, row: 0 },
        { column: -1, row: 0 },
        { column: 0, row: 1 },
        { column: 0, row: -1 }
      ];
      var options = directions.filter(function (direction) {
        var column = walker.column + direction.column;
        var row = walker.row + direction.row;
        return column >= 0 && column < columns && row >= 0 && row < rows;
      });
      var direction = options[Math.floor(Math.random() * options.length)];
      if (!direction) return;

      walker.column += direction.column;
      walker.row += direction.row;
      trail.push(pointFor(walker.column, walker.row));
      if (trail.length > 30) trail.shift();
    };

    var changePercolation = function () {
      var changes = Math.max(1, Math.round(nodes.length * 0.006));
      for (var count = 0; count < changes; count += 1) {
        var index = Math.floor(Math.random() * nodes.length);
        nodes[index] = !nodes[index];
      }
    };

    var animate = function (time) {
      if (!heroVisible || motionQuery.matches) {
        animationFrame = 0;
        return;
      }

      if (time - lastWalk > 360) {
        advanceWalker();
        lastWalk = time;
      }
      if (time - lastPercolationChange > 900) {
        changePercolation();
        lastPercolationChange = time;
      }

      drawField(time);
      animationFrame = window.requestAnimationFrame(animate);
    };

    var startAnimation = function () {
      if (animationFrame || motionQuery.matches || !heroVisible) {
        drawField(0);
        return;
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    var stopAnimation = function () {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    var isHeroCurrent = function () {
      var bounds = hero.getBoundingClientRect();
      return bounds.bottom >= window.innerHeight * 0.72 && bounds.top <= 80;
    };

    var scrollToNext = function () {
      if (scrollLocked) return;
      scrollLocked = true;
      nextSection.scrollIntoView({
        behavior: motionQuery.matches ? 'auto' : 'smooth',
        block: 'start'
      });
      window.setTimeout(function () {
        scrollLocked = false;
      }, motionQuery.matches ? 100 : 780);
    };

    var cue = hero.querySelector('[data-home-scroll-next]');
    if (cue) {
      cue.addEventListener('click', function (event) {
        event.preventDefault();
        scrollToNext();
      });
    }

    window.addEventListener('wheel', function (event) {
      if (event.defaultPrevented || event.deltaY < 8 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (!isHeroCurrent()) return;
      event.preventDefault();
      scrollToNext();
    }, { passive: false });

    var touchStartX = 0;
    var touchStartY = 0;
    hero.addEventListener('touchstart', function (event) {
      if (!event.touches.length) return;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    }, { passive: true });

    hero.addEventListener('touchend', function (event) {
      if (!event.changedTouches.length || !isHeroCurrent()) return;
      var deltaX = event.changedTouches[0].clientX - touchStartX;
      var deltaY = event.changedTouches[0].clientY - touchStartY;
      if (deltaY < -52 && Math.abs(deltaY) > Math.abs(deltaX)) scrollToNext();
    }, { passive: true });

    window.addEventListener('keydown', function (event) {
      var target = event.target;
      var interactive = target && target.closest && target.closest('a, button, input, textarea, select, summary');
      if (interactive || !isHeroCurrent()) return;
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        scrollToNext();
      }
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        heroVisible = entries[0].isIntersecting;
        if (heroVisible) startAnimation();
        else stopAnimation();
      }, { threshold: 0.02 });
      observer.observe(hero);
    }

    var handleMotionChange = function () {
      if (motionQuery.matches) {
        stopAnimation();
        drawField(0);
      } else {
        startAnimation();
      }
    };
    if (motionQuery.addEventListener) motionQuery.addEventListener('change', handleMotionChange);
    else if (motionQuery.addListener) motionQuery.addListener(handleMotionChange);

    window.addEventListener('resize', function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resizeCanvas, 120);
    });

    var themeObserver = new MutationObserver(function () {
      refreshAccent();
      drawField(0);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    resizeCanvas();
    startAnimation();
  });
})();
