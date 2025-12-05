---
permalink: /misc/
title: "Miscellaneous"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

## Some interesting results
Some pictures or animations illustrating my research, created with Python. Enjoy visual mathematics and Physics!

<p align="center">
  <img src="../interships/StageL3/resultats_visualises/N%2050%2C%20M%201.gif" alt="Result 1" width="45%">
  <img src="../interships/StageL3/resultats_visualises/N%2050%2C%20M%203.gif" alt="Result 2" width="45%">
</p>

<p align="center" style="max-width:800px; margin:auto; font-size:0.95em; line-height:1.5;">
   <strong>1 : </strong>Visualization results from my L3 internship on <em>collective motion in the presence of predators</em>. 
  The left animation shows the dynamics of a flock of 50 green agents when a single red predator is introduced, 
  while the right one shows the same system with three predators. I mainly focused on the modeling and analysis of such predator–prey interactions with python Code in my report.
</p>

<p align="center">
  <img src="../interships/Stage_phys_L3/M_E_S_3body.PNG" alt="Result 3" width="70%">
</p>
<p align="center" style="max-width:800px; margin:auto; font-size:0.95em; line-height:1.5;">
  <strong>2 : </strong>Result from my L3 physics internship on celestial mechanics.  
  We studied the classical <em>N-body model</em> in astrophysics and plotted the trajectories of the Moon and an Earth-orbiting satellite relative to the Earth.  
  The black dot represents the Earth, the blue curve corresponds to the actual satellite trajectory, and the red curve represents the actual Moon trajectory (real data obtained from NASA).  
  Using the 3-body model, we simulated the green trajectory for the satellite and the yellow trajectory for the Moon.
</p>

<hr>

<div style="text-align: center; margin-top: 40px;">
<iframe width="100%" height="720" frameborder="0" style="border:none; overflow:hidden;" srcdoc='
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0; padding: 10px; background: #fff; }
  .controls { background: #f8f9fa; border: 1px solid #e9ecef; padding: 10px 20px; border-radius: 8px; display: flex; gap: 15px; align-items: center; margin-bottom: 10px; font-size: 14px; }
  .grp { display: flex; flex-direction: column; text-align: left; }
  label { font-size: 11px; color: #666; font-weight: 600; margin-bottom: 2px; }
  input { width: 60px; padding: 5px; border: 1px solid #ccc; border-radius: 4px; }
  button { background: #0d6efd; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; height: 36px; margin-top: 15px; font-weight: 600; }
  button:hover { background: #0b5ed7; }
  #cvs { background: white; border: 1px solid #eee; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-radius: 4px; max-width: 100%; height: auto; }
  #st { font-family: monospace; color: #555; font-size: 12px; margin-top: 5px; min-height: 18px; }
</style>
</head>
<body>
  <div class="controls">
    <div class="grp"><label>Size (N)</label><input type="number" id="n" value="20" min="5" max="100"></div>
    <div class="grp"><label>Prob (p)</label><input type="number" id="p" value="0.5" step="0.01" min="0" max="1"></div>
    <button id="btn">Run Simulation</button>
  </div>
  <div id="st">Ready</div>
  <canvas id="cvs" width="600" height="600"></canvas>
<script>
  // 简易并查集
  class UnionFind {
    constructor(n) { this.parent = [...Array(n).keys()]; }
    find(i) { if (this.parent[i] !== i) this.parent[i] = this.find(this.parent[i]); return this.parent[i]; }
    union(i, j) { 
      let rootI = this.find(i), rootJ = this.find(j);
      if (rootI !== rootJ) { this.parent[rootI] = rootJ; return true; }
      return false; 
    }
  }

  function getColor(id) { return "hsl(" + ((id * 137.5) % 360) + ", 70%, 50%)"; }

  function run() {
    var cvs = document.getElementById("cvs");
    var ctx = cvs.getContext("2d");
    var nInput = document.getElementById("n");
    var pInput = document.getElementById("p");
    var status = document.getElementById("st");

    var n = parseInt(nInput.value) || 20;
    var p = parseFloat(pInput.value);
    if (isNaN(p)) p = 0.5;

    status.innerText = "Simulating...";

    // 延时执行以免阻塞UI
    setTimeout(function() {
      var num = n * n;
      var uf = new UnionFind(num);
      var active = new Array(num).fill(false);
      var hBonds = [], vBonds = [];

      // 1. 生成数据
      for (var r = 0; r < n; r++) {
        hBonds[r] = [];
        for (var c = 0; c < n - 1; c++) {
          if (Math.random() < p) {
            hBonds[r][c] = true;
            var i1 = r * n + c, i2 = r * n + c + 1;
            uf.union(i1, i2);
            active[i1] = active[i2] = true;
          }
        }
      }
      for (var r = 0; r < n - 1; r++) {
        vBonds[r] = [];
        for (var c = 0; c < n; c++) {
          if (Math.random() < p) {
            vBonds[r][c] = true;
            var i1 = r * n + c, i2 = (r + 1) * n + c;
            uf.union(i1, i2);
            active[i1] = active[i2] = true;
          }
        }
      }

      // 2. 绘图
      var pad = 20;
      var size = cvs.width - 2 * pad;
      var cell = size / (n - 1);
      
      ctx.clearRect(0, 0, cvs.width, cvs.height);

      // 背景网格
      ctx.strokeStyle = "#eee";
      ctx.lineWidth = Math.max(1, cell * 0.1);
      ctx.beginPath();
      for (var i = 0; i < n; i++) {
        var pos = pad + i * cell;
        ctx.moveTo(pad, pos); ctx.lineTo(cvs.width - pad, pos);
        ctx.moveTo(pos, pad); ctx.lineTo(pos, cvs.height - pad);
      }
      ctx.stroke();

      // 前景
      ctx.lineWidth = Math.max(2, cell * 0.25);
      var rad = Math.max(2, cell * 0.35);

      function line(r1, c1, r2, c2, color) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(pad + c1 * cell, pad + r1 * cell);
        ctx.lineTo(pad + c2 * cell, pad + r2 * cell);
        ctx.stroke();
      }

      // 画线
      for (var r = 0; r < n; r++) for (var c = 0; c < n - 1; c++) 
        if (hBonds[r][c]) line(r, c, r, c + 1, getColor(uf.find(r * n + c)));
      
      for (var r = 0; r < n - 1; r++) for (var c = 0; c < n; c++) 
        if (vBonds[r][c]) line(r, c, r + 1, c, getColor(uf.find(r * n + c)));

      // 画点
      for (var i = 0; i < num; i++) {
        if (active[i]) {
          var r = Math.floor(i / n), c = i % n;
          ctx.fillStyle = getColor(uf.find(i));
          ctx.beginPath();
          ctx.arc(pad + c * cell, pad + r * cell, rad, 0, 6.28);
          ctx.fill();
        }
      }

      // 统计
      var roots = new Set();
      for(var i=0; i<num; i++) if(active[i]) roots.add(uf.find(i));
      status.innerText = "Done. Connected Clusters: " + roots.size;

    }, 10);
  }

  document.getElementById("btn").onclick = run;
  run(); // 初始运行
</script>
</body>
</html>
'></iframe>
</div>

<p align="center" style="max-width:800px; margin:auto; font-size:0.95em; line-height:1.5; margin-top: 20px;">
  <strong>3 : </strong>Interactive visualization of <em>Bond Percolation</em>. (p = bond probability). Isolated nodes are hidden.
</p>
