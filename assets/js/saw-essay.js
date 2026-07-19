(function () {
  "use strict";

  var copy = {
    zh: {
      random: "普通随机游走",
      saw: "自回避随机游走",
      steps: "步数",
      regenerate: "重新生成",
      distance: "末端距离",
      coverage: "不同格点",
      acceptance: "Pivot 接受率",
      path: "路径",
      start: "起点",
      end: "终点",
      ruleStep: "第",
      ruleStepSuffix: "步",
      ruleAccepted: "接受：这是一个从未访问过的新格点",
      ruleRejected: "拒绝：这个格点已经在路径中出现过",
      ruleComplete: "合法路径：每一个格点最多只访问一次"
    },
    en: {
      random: "Ordinary random walk",
      saw: "Self-avoiding walk",
      steps: "Steps",
      regenerate: "New sample",
      distance: "End-to-end distance",
      coverage: "Distinct sites",
      acceptance: "Pivot acceptance",
      path: "Path",
      start: "Start",
      end: "End",
      ruleStep: "Step",
      ruleStepSuffix: "",
      ruleAccepted: "Accepted: this site has not been visited before",
      ruleRejected: "Rejected: this site is already part of the path",
      ruleComplete: "Valid path: every site is visited at most once"
    },
    fr: {
      random: "Marche aléatoire simple",
      saw: "Marche auto-évitante",
      steps: "Pas",
      regenerate: "Nouvel échantillon",
      distance: "Distance bout à bout",
      coverage: "Sites distincts",
      acceptance: "Acceptation des pivots",
      path: "Trajectoire",
      start: "Départ",
      end: "Arrivée",
      ruleStep: "Pas",
      ruleStepSuffix: "",
      ruleAccepted: "Accepté : ce sommet n’a jamais été visité",
      ruleRejected: "Refusé : ce sommet appartient déjà au chemin",
      ruleComplete: "Chemin valide : chaque sommet est visité au plus une fois"
    }
  };

  function key(point) {
    return point[0] + "," + point[1];
  }

  function ordinaryWalk(steps) {
    var path = [[0, 0]];
    var directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    var visited = new Set(["0,0"]);

    for (var i = 0; i < steps; i += 1) {
      var direction = directions[Math.floor(Math.random() * directions.length)];
      var previous = path[path.length - 1];
      var next = [previous[0] + direction[0], previous[1] + direction[1]];
      path.push(next);
      visited.add(key(next));
    }

    return { path: path, distinct: visited.size, accepted: null, attempts: null };
  }

  function transform(point, variant) {
    var x = point[0];
    var y = point[1];
    if (variant === 0) return [-y, x];
    if (variant === 1) return [-x, -y];
    if (variant === 2) return [y, -x];
    if (variant === 3) return [-x, y];
    if (variant === 4) return [x, -y];
    if (variant === 5) return [y, x];
    return [-y, -x];
  }

  function selfAvoidingWalk(steps) {
    var path = [];
    for (var i = 0; i <= steps; i += 1) path.push([i, 0]);

    var attempts = Math.max(900, steps * 16);
    var accepted = 0;

    for (var attempt = 0; attempt < attempts; attempt += 1) {
      var pivot = 1 + Math.floor(Math.random() * (steps - 1));
      var variant = Math.floor(Math.random() * 7);
      var origin = path[pivot];
      var occupied = new Set();
      var candidate = path.slice(0, pivot + 1);
      var valid = true;

      for (var prefix = 0; prefix <= pivot; prefix += 1) occupied.add(key(path[prefix]));

      for (var tail = pivot + 1; tail <= steps; tail += 1) {
        var relative = [path[tail][0] - origin[0], path[tail][1] - origin[1]];
        var rotated = transform(relative, variant);
        var next = [origin[0] + rotated[0], origin[1] + rotated[1]];
        var nextKey = key(next);
        if (occupied.has(nextKey)) {
          valid = false;
          break;
        }
        occupied.add(nextKey);
        candidate.push(next);
      }

      if (valid) {
        path = candidate;
        accepted += 1;
      }
    }

    return { path: path, distinct: path.length, accepted: accepted, attempts: attempts };
  }

  function endpointDistance(path) {
    var start = path[0];
    var end = path[path.length - 1];
    var dx = end[0] - start[0];
    var dy = end[1] - start[1];
    return Math.sqrt(dx * dx + dy * dy);
  }

  function setupRuleDemo(root) {
    var lang = root.getAttribute("data-lang") || "en";
    var words = copy[lang] || copy.en;
    var canvas = root.querySelector("canvas");
    var context = canvas.getContext("2d");
    var replay = root.querySelector("[data-saw-rule-replay]");
    var status = root.querySelector("[data-saw-rule-status]");
    var statusIndex = root.querySelector("[data-saw-rule-index]");
    var statusMessage = root.querySelector("[data-saw-rule-message]");
    var acceptedPath = [
      [0, 0], [1, 0], [2, 0], [2, 1], [1, 1], [1, 2],
      [2, 2], [3, 2], [3, 1], [4, 1], [4, 0], [3, 0],
      [3, -1], [2, -1], [1, -1], [0, -1], [0, -2], [1, -2], [2, -2]
    ];
    var rejectedTarget = [2, 0];
    var preRejectCount = 12;
    var stepDuration = 360;
    var rejectionDuration = 2200;
    var rejectionStart = (preRejectCount - 1) * stepDuration;
    var rejectionEnd = rejectionStart + rejectionDuration;
    var drawingEnd = rejectionEnd + (acceptedPath.length - preRejectCount) * stepDuration;
    var loopDuration = drawingEnd + 1500;
    var animationFrame = null;
    var animationStart = null;
    var lastElapsed = 0;
    var isVisible = true;
    var lastStatusKey = "";
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function setCanvasSize() {
      var rect = canvas.getBoundingClientRect();
      var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * pixelRatio));
      canvas.height = Math.max(1, Math.round(rect.height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function pointToCanvas(point, width, height) {
      var scale = Math.min(width / 7.4, height / 6.4);
      return [
        width / 2 + (point[0] - 2) * scale,
        height / 2 - point[1] * scale
      ];
    }

    function interpolate(from, to, progress) {
      var eased = progress * progress * (3 - 2 * progress);
      return [
        from[0] + (to[0] - from[0]) * eased,
        from[1] + (to[1] - from[1]) * eased
      ];
    }

    function timeline(elapsed) {
      if (reduceMotion || elapsed >= drawingEnd) {
        return {
          points: acceptedPath.slice(),
          head: null,
          rejectedProgress: 0,
          step: acceptedPath.length - 1,
          phase: "complete"
        };
      }

      if (elapsed < rejectionStart) {
        var beforeSegment = Math.min(preRejectCount - 2, Math.floor(elapsed / stepDuration));
        var beforeProgress = (elapsed % stepDuration) / stepDuration;
        return {
          points: acceptedPath.slice(0, beforeSegment + 1),
          head: interpolate(acceptedPath[beforeSegment], acceptedPath[beforeSegment + 1], beforeProgress),
          rejectedProgress: 0,
          step: beforeSegment + 1,
          phase: "accepted"
        };
      }

      if (elapsed < rejectionEnd) {
        return {
          points: acceptedPath.slice(0, preRejectCount),
          head: null,
          rejectedProgress: (elapsed - rejectionStart) / rejectionDuration,
          step: preRejectCount,
          phase: "rejected"
        };
      }

      var afterElapsed = elapsed - rejectionEnd;
      var afterSegment = Math.min(
        acceptedPath.length - 2,
        preRejectCount - 1 + Math.floor(afterElapsed / stepDuration)
      );
      var afterProgress = (afterElapsed % stepDuration) / stepDuration;
      return {
        points: acceptedPath.slice(0, afterSegment + 1),
        head: interpolate(acceptedPath[afterSegment], acceptedPath[afterSegment + 1], afterProgress),
        rejectedProgress: 0,
        step: afterSegment + 1,
        phase: "accepted"
      };
    }

    function updateStatus(state) {
      var statusKey = state.phase + ":" + state.step;
      if (statusKey === lastStatusKey) return;
      lastStatusKey = statusKey;

      status.classList.toggle("is-rejected", state.phase === "rejected");
      status.classList.toggle("is-complete", state.phase === "complete");
      statusIndex.textContent = state.phase === "complete"
        ? "SAW"
        : lang === "zh"
          ? "第" + state.step + "步"
          : words.ruleStep + " " + state.step + words.ruleStepSuffix;
      statusMessage.textContent = state.phase === "rejected"
        ? words.ruleRejected
        : state.phase === "complete"
          ? words.ruleComplete
          : words.ruleAccepted;
    }

    function drawGrid(width, height, scale) {
      var centerX = width / 2 - 2 * scale;
      var centerY = height / 2;
      context.strokeStyle = "rgba(31, 58, 55, 0.08)";
      context.lineWidth = 1;

      for (var x = centerX - scale; x <= centerX + scale * 6; x += scale) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (var y = centerY - scale * 3; y <= centerY + scale * 3; y += scale) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    }

    function draw(elapsed) {
      var rect = canvas.getBoundingClientRect();
      var width = rect.width;
      var height = rect.height;
      var scale = Math.min(width / 7.4, height / 6.4);
      var state = timeline(elapsed);
      var displayPoints = state.points.slice();
      if (state.head) displayPoints.push(state.head);

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#f7f8f5";
      context.fillRect(0, 0, width, height);
      drawGrid(width, height, scale);

      displayPoints.forEach(function (point, index) {
        var mapped = pointToCanvas(point, width, height);
        var isHead = index === displayPoints.length - 1;
        context.beginPath();
        context.arc(mapped[0], mapped[1], isHead ? 7 : 5, 0, Math.PI * 2);
        context.fillStyle = isHead ? "#c44f3f" : "rgba(31, 118, 111, 0.18)";
        context.fill();
      });

      if (displayPoints.length > 1) {
        context.beginPath();
        displayPoints.forEach(function (point, index) {
          var mapped = pointToCanvas(point, width, height);
          if (index === 0) context.moveTo(mapped[0], mapped[1]);
          else context.lineTo(mapped[0], mapped[1]);
        });
        context.strokeStyle = "#2a7a78";
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = 4;
        context.stroke();
      }

      state.points.forEach(function (point, index) {
        var mapped = pointToCanvas(point, width, height);
        context.beginPath();
        context.arc(mapped[0], mapped[1], index === 0 ? 6 : 4, 0, Math.PI * 2);
        context.fillStyle = index === 0 ? "#1f766f" : "#f7f8f5";
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = "#2a7a78";
        context.stroke();
      });

      if (state.phase === "rejected") {
        var from = pointToCanvas(acceptedPath[preRejectCount - 1], width, height);
        var target = pointToCanvas(rejectedTarget, width, height);
        var ghost = interpolate(from, target, Math.min(1, state.rejectedProgress * 1.7));
        var pulse = 10 + 6 * Math.sin(state.rejectedProgress * Math.PI * 3);

        context.save();
        context.setLineDash([7, 6]);
        context.beginPath();
        context.moveTo(from[0], from[1]);
        context.lineTo(ghost[0], ghost[1]);
        context.strokeStyle = "#c44f3f";
        context.lineWidth = 4;
        context.stroke();
        context.restore();

        context.beginPath();
        context.arc(target[0], target[1], pulse, 0, Math.PI * 2);
        context.strokeStyle = "rgba(196, 79, 63, 0.42)";
        context.lineWidth = 3;
        context.stroke();

        context.beginPath();
        context.moveTo(target[0] - 6, target[1] - 6);
        context.lineTo(target[0] + 6, target[1] + 6);
        context.moveTo(target[0] + 6, target[1] - 6);
        context.lineTo(target[0] - 6, target[1] + 6);
        context.strokeStyle = "#c44f3f";
        context.lineWidth = 3;
        context.stroke();
      }

      updateStatus(state);
    }

    function frame(now) {
      if (!isVisible) return;
      if (animationStart === null) animationStart = now;
      lastElapsed = (now - animationStart) % loopDuration;
      draw(lastElapsed);
      animationFrame = window.requestAnimationFrame(frame);
    }

    function restart() {
      animationStart = null;
      lastElapsed = 0;
      lastStatusKey = "";
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (reduceMotion) {
        draw(drawingEnd);
      } else if (isVisible) {
        animationFrame = window.requestAnimationFrame(frame);
      }
    }

    replay.addEventListener("click", restart);

    var resizeObserver = new ResizeObserver(function () {
      setCanvasSize();
      draw(reduceMotion ? drawingEnd : lastElapsed);
    });
    resizeObserver.observe(canvas);

    if ("IntersectionObserver" in window) {
      var visibilityObserver = new IntersectionObserver(function (entries) {
        isVisible = entries[0].isIntersecting;
        if (isVisible && !reduceMotion) restart();
        if (!isVisible && animationFrame) window.cancelAnimationFrame(animationFrame);
      }, { threshold: 0.15 });
      visibilityObserver.observe(root);
    }

    setCanvasSize();
    restart();
  }

  function setup(root) {
    var lang = root.getAttribute("data-lang") || "en";
    var words = copy[lang] || copy.en;
    var canvas = root.querySelector("canvas");
    var context = canvas.getContext("2d");
    var slider = root.querySelector("[data-saw-steps]");
    var output = root.querySelector("[data-saw-step-output]");
    var regenerate = root.querySelector("[data-saw-regenerate]");
    var modeButtons = Array.prototype.slice.call(root.querySelectorAll("[data-saw-mode]"));
    var distanceValue = root.querySelector("[data-saw-distance]");
    var thirdLabel = root.querySelector("[data-saw-third-label]");
    var thirdValue = root.querySelector("[data-saw-third-value]");
    var mode = "saw";
    var sample = null;
    var animationFrame = null;

    root.querySelector("[data-saw-random-label]").textContent = words.random;
    root.querySelector("[data-saw-saw-label]").textContent = words.saw;
    root.querySelector("[data-saw-steps-label]").textContent = words.steps;
    regenerate.textContent = words.regenerate;
    root.querySelector("[data-saw-distance-label]").textContent = words.distance;

    function setCanvasSize() {
      var rect = canvas.getBoundingClientRect();
      var scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * scale));
      canvas.height = Math.max(1, Math.round(rect.height * scale));
      context.setTransform(scale, 0, 0, scale, 0, 0);
    }

    function mappedPath(path, width, height) {
      var xs = path.map(function (point) { return point[0]; });
      var ys = path.map(function (point) { return point[1]; });
      var minX = Math.min.apply(null, xs);
      var maxX = Math.max.apply(null, xs);
      var minY = Math.min.apply(null, ys);
      var maxY = Math.max.apply(null, ys);
      var padding = Math.min(width, height) * 0.09;
      var spanX = Math.max(1, maxX - minX);
      var spanY = Math.max(1, maxY - minY);
      var scale = Math.min((width - 2 * padding) / spanX, (height - 2 * padding) / spanY);
      var offsetX = (width - spanX * scale) / 2 - minX * scale;
      var offsetY = (height - spanY * scale) / 2 + maxY * scale;

      return path.map(function (point) {
        return [offsetX + point[0] * scale, offsetY - point[1] * scale];
      });
    }

    function draw(progress) {
      if (!sample) return;
      var rect = canvas.getBoundingClientRect();
      var width = rect.width;
      var height = rect.height;
      var points = mappedPath(sample.path, width, height);
      var visible = Math.max(2, Math.ceil(points.length * progress));

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#f7f8f5";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(31, 58, 55, 0.07)";
      context.lineWidth = 1;
      for (var x = 28; x < width; x += 28) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (var y = 28; y < height; y += 28) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = Math.max(1.6, Math.min(3.1, 520 / sample.path.length));
      for (var i = 1; i < visible; i += 1) {
        var ratio = i / Math.max(1, points.length - 1);
        var red = Math.round(42 + 166 * ratio);
        var green = Math.round(122 - 46 * ratio);
        var blue = Math.round(120 - 50 * ratio);
        context.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
        context.beginPath();
        context.moveTo(points[i - 1][0], points[i - 1][1]);
        context.lineTo(points[i][0], points[i][1]);
        context.stroke();
      }

      function endpoint(point, fill, radius) {
        context.beginPath();
        context.arc(point[0], point[1], radius, 0, Math.PI * 2);
        context.fillStyle = fill;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = "#f7f8f5";
        context.stroke();
      }

      endpoint(points[0], "#1f766f", 5.5);
      if (visible === points.length) endpoint(points[points.length - 1], "#c44f3f", 6.5);
    }

    function animate() {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        draw(1);
        return;
      }
      var started = performance.now();
      function frame(now) {
        var progress = Math.min(1, (now - started) / 620);
        draw(1 - Math.pow(1 - progress, 3));
        if (progress < 1) animationFrame = window.requestAnimationFrame(frame);
      }
      animationFrame = window.requestAnimationFrame(frame);
    }

    function updateStats() {
      var distance = endpointDistance(sample.path);
      distanceValue.textContent = distance.toFixed(1);
      if (mode === "saw") {
        thirdLabel.textContent = words.acceptance;
        thirdValue.textContent = Math.round(100 * sample.accepted / sample.attempts) + "%";
      } else {
        thirdLabel.textContent = words.coverage;
        thirdValue.textContent = Math.round(100 * sample.distinct / sample.path.length) + "%";
      }
    }

    function generate() {
      var steps = Number(slider.value);
      output.textContent = steps;
      sample = mode === "saw" ? selfAvoidingWalk(steps) : ordinaryWalk(steps);
      updateStats();
      animate();
    }

    modeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        mode = button.getAttribute("data-saw-mode");
        modeButtons.forEach(function (candidate) {
          var selected = candidate === button;
          candidate.classList.toggle("is-active", selected);
          candidate.setAttribute("aria-pressed", selected ? "true" : "false");
        });
        generate();
      });
    });

    var sliderTimer = null;
    slider.addEventListener("input", function () {
      output.textContent = slider.value;
      window.clearTimeout(sliderTimer);
      sliderTimer = window.setTimeout(generate, 120);
    });
    regenerate.addEventListener("click", generate);

    var resizeObserver = new ResizeObserver(function () {
      setCanvasSize();
      draw(1);
    });
    resizeObserver.observe(canvas);
    setCanvasSize();
    generate();
  }

  window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-saw-rule-demo]").forEach(setupRuleDemo);
    document.querySelectorAll("[data-saw-explorer]").forEach(setup);
  });
})();
