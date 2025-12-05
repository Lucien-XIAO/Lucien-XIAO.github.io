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

<div id="percolation-tool-container" style="text-align: center; margin-top: 40px;">
<style>
.perc-controls{background:#f8f9fa;border:1px solid #e9ecef;padding:15px;border-radius:8px;display:inline-flex;gap:15px;align-items:center;justify-content:center;flex-wrap:wrap;margin-bottom:10px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}.perc-input-group{display:flex;flex-direction:column;text-align:left}.perc-input-group label{font-size:12px;color:#6c757d;margin-bottom:4px;font-weight:600}.perc-input-group input{padding:6px 10px;border:1px solid #ced4da;border-radius:4px;width:70px;font-size:14px}.perc-btn{padding:0 20px;background-color:#0d6efd;color:white;border:none;border-radius:4px;cursor:pointer;font-weight:600;height:38px;margin-top:18px;transition:background 0.2s}.perc-btn:hover{background-color:#0b5ed7}#percolationCanvas{background:white;border:1px solid #dee2e6;box-shadow:0 4px 6px rgba(0,0,0,0.05);border-radius:4px;max-width:100%;height:auto;margin-top:10px}#perc-stats{margin-top:8px;color:#495057;font-size:0.9em;font-family:monospace}
</style>

<div class="perc-controls">
  <div class="perc-input-group">
    <label for="n-input">Size (N)</label>
    <input type="number" id="n-input" value="20" min="5" max="100">
  </div>
  <div class="perc-input-group">
    <label for="p-input">Prob (p)</label>
    <input type="number" id="p-input" value="0.5" min="0" max="1" step="0.01">
  </div>
  <button id="run-btn" class="perc-btn">Run Simulation</button>
</div>

<div id="perc-stats">Status: Loading script...</div>
<br>
<canvas id="percolationCanvas" width="600" height="600"></canvas>
</div>

<p align="center" style="max-width:800px; margin:auto; font-size:0.95em; line-height:1.5; margin-top: 20px;">
  <strong>3 : </strong>Interactive visualization of <em>Bond Percolation</em> on a 2D square lattice.  
  In this model, <strong>p</strong> represents the probability of a bond (edge) being open. Unlike site percolation, nodes are only colored if they are connected to at least one open bond, preventing isolated colored nodes.  
  Try varying <strong>p</strong> around the critical threshold (0.5) to observe the phase transition in connectivity.
</p>

{% raw %}
<script>
(function() {
    // 确保DOM加载后再执行
    function init() {
        var btn = document.getElementById('run-btn');
        var stats = document.getElementById('perc-stats');
        
        if (!btn) {
            // 如果还没加载完，稍后再试
            setTimeout(init, 100);
            return;
        }

        // 绑定点击事件
        btn.addEventListener('click', runSimulation);

        // 初始运行一次
        runSimulation();
    }

    // 类定义：并查集
    function UnionFind(size) {
        this.parent = new Array(size);
        for (var i = 0; i < size; i++) {
            this.parent[i] = i;
        }
    }
    UnionFind.prototype.find = function(i) {
        if (this.parent[i] !== i) {
            this.parent[i] = this.find(this.parent[i]);
        }
        return this.parent[i];
    };
    UnionFind.prototype.union = function(i, j) {
        var rootI = this.find(i);
        var rootJ = this.find(j);
        if (rootI !== rootJ) {
            this.parent[rootI] = rootJ;
            return true;
        }
        return false;
    };

    function getColor(id) {
        var hue = (id * 137.508) % 360; 
        return "hsl(" + hue + ", 70%, 50%)";
    }

    function runSimulation() {
        var canvas = document.getElementById('percolationCanvas');
        var stats = document.getElementById('perc-stats');
        var nInput = document.getElementById('n-input');
        var pInput = document.getElementById('p-input');

        if (!canvas) return;

        stats.innerText = "Status: Computing...";

        // 使用 setTimeout 让 UI 有机会刷新出 Computing 字样
        setTimeout(function() {
            var n = parseInt(nInput.value);
            var p = parseFloat(pInput.value);
            
            if (isNaN(n) || n < 2) n = 20;
            if (isNaN(p) || p < 0 || p > 1) p = 0.5;

            var ctx = canvas.getContext('2d');
            var numNodes = n * n;
            var uf = new UnionFind(numNodes);
            var hBonds = [];
            var vBonds = [];
            var activeNodes = new Array(numNodes).fill(false);

            // 生成横向
            for (var r = 0; r < n; r++) {
                hBonds[r] = [];
                for (var c = 0; c < n - 1; c++) {
                    var isOpen = Math.random() < p;
                    hBonds[r][c] = isOpen;
                    if (isOpen) {
                        var idx1 = r * n + c;
                        var idx2 = r * n + (c + 1);
                        uf.union(idx1, idx2);
                        activeNodes[idx1] = true;
                        activeNodes[idx2] = true;
                    }
                }
            }

            // 生成纵向
            for (var r = 0; r < n - 1; r++) {
                vBonds[r] = [];
                for (var c = 0; c < n; c++) {
                    var isOpen = Math.random() < p;
                    vBonds[r][c] = isOpen;
                    if (isOpen) {
                        var idx1 = r * n + c;
                        var idx2 = (r + 1) * n + c;
                        uf.union(idx1, idx2);
                        activeNodes[idx1] = true;
                        activeNodes[idx2] = true;
                    }
                }
            }

            // 绘图
            var padding = 40;
            var drawWidth = canvas.width - 2 * padding;
            var cellSize = drawWidth / (n - 1);
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 背景
            ctx.strokeStyle = '#EEEEEE';
            ctx.fillStyle = '#EEEEEE';
            ctx.lineWidth = Math.max(1, cellSize * 0.1);
            ctx.beginPath();
            for(var i=0; i<n; i++) {
                var pos = padding + i * cellSize;
                ctx.moveTo(padding, pos); ctx.lineTo(canvas.width - padding, pos);
                ctx.moveTo(pos, padding); ctx.lineTo(pos, canvas.height - padding);
            }
            ctx.stroke();

            var ghostRadius = Math.max(2, cellSize * 0.15);
            for(var r=0; r<n; r++) {
                for(var c=0; c<n; c++) {
                    ctx.beginPath();
                    ctx.arc(padding + c*cellSize, padding + r*cellSize, ghostRadius, 0, 2*Math.PI);
                    ctx.fill();
                }
            }

            // 前景
            var lineWidth = Math.max(2, cellSize * 0.25);
            var nodeRadius = Math.max(3, cellSize * 0.35);
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';

            for(var r=0; r<n; r++) {
                for(var c=0; c<n-1; c++) {
                    if(hBonds[r][c]) {
                        ctx.strokeStyle = getColor(uf.find(r * n + c));
                        ctx.beginPath();
                        ctx.moveTo(padding + c*cellSize, padding + r*cellSize);
                        ctx.lineTo(padding + (c+1)*cellSize, padding + r*cellSize);
                        ctx.stroke();
                    }
                }
            }
            for(var r=0; r<n-1; r++) {
                for(var c=0; c<n; c++) {
                    if(vBonds[r][c]) {
                        ctx.strokeStyle = getColor(uf.find(r * n + c));
                        ctx.beginPath();
                        ctx.moveTo(padding + c*cellSize, padding + r*cellSize);
                        ctx.lineTo(padding + c*cellSize, padding + (r+1)*cellSize);
                        ctx.stroke();
                    }
                }
            }

            for(var r=0; r<n; r++) {
                for(var c=0; c<n; c++) {
                    var idx = r * n + c;
                    if(activeNodes[idx]) {
                        ctx.fillStyle = getColor(uf.find(idx));
                        ctx.beginPath();
                        ctx.arc(padding + c*cellSize, padding + r*cellSize, nodeRadius, 0, 2*Math.PI);
                        ctx.fill();
                    }
                }
            }

            // 统计
            var uniqueRoots = new Set();
            for(var i=0; i<numNodes; i++) {
                if (activeNodes[i]) uniqueRoots.add(uf.find(i));
            }
            stats.innerText = "Status: Done. Clusters found: " + uniqueRoots.size;
        }, 10);
    }

    // 启动
    init();
})();
</script>
{% endraw %}
