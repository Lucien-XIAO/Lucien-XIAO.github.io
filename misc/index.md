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
        .perc-controls {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            padding: 15px;
            border-radius: 8px;
            display: inline-flex;
            gap: 15px;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 10px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .perc-input-group {
            display: flex;
            flex-direction: column;
            text-align: left;
        }
        .perc-input-group label {
            font-size: 12px;
            color: #6c757d;
            margin-bottom: 4px;
            font-weight: 600;
        }
        .perc-input-group input {
            padding: 6px 10px;
            border: 1px solid #ced4da;
            border-radius: 4px;
            width: 70px;
            font-size: 14px;
        }
        .perc-btn {
            padding: 0 20px;
            background-color: #0d6efd;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            height: 38px;
            margin-top: 18px; /* Visual alignment */
            transition: background 0.2s;
        }
        .perc-btn:hover {
            background-color: #0b5ed7;
        }
        #percolationCanvas {
            background: white;
            border: 1px solid #dee2e6;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            border-radius: 4px;
            max-width: 100%;
            height: auto;
            margin-top: 10px;
        }
        #perc-stats {
            margin-top: 8px;
            color: #495057;
            font-size: 0.9em;
            font-family: monospace;
        }
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
        <button class="perc-btn" onclick="runPercolationSim()">Run Simulation</button>
    </div>
    
    <div id="perc-stats">Status: Waiting for script...</div>
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
    // 1. 定义并查集类 (Class Definition)
    class UnionFind {
        constructor(size) {
            this.parent = new Array(size);
            for (let i = 0; i < size; i++) {
                this.parent[i] = i;
            }
        }
        find(i) {
            if (this.parent[i] !== i) {
                this.parent[i] = this.find(this.parent[i]);
            }
            return this.parent[i];
        }
        union(i, j) {
            let rootI = this.find(i);
            let rootJ = this.find(j);
            if (rootI !== rootJ) {
                this.parent[rootI] = rootJ;
                return true;
            }
            return false;
        }
    }

    // 2. 颜色辅助函数
    function getPercColor(id) {
        const hue = (id * 137.508) % 360; 
        return "hsl(" + hue + ", 70%, 50%)";
    }

    // 3. 主运行函数 (Main Function)
    function runPercolationSim() {
        // 获取 DOM 元素
        const canvas = document.getElementById('percolationCanvas');
        const stats = document.getElementById('perc-stats');
        const nInput = document.getElementById('n-input');
        const pInput = document.getElementById('p-input');

        // 错误检查
        if (!canvas || !stats) {
            console.error("Canvas element not found. Retrying...");
            return;
        }

        const ctx = canvas.getContext('2d');
        const n = parseInt(nInput.value);
        const p = parseFloat(pInput.value);

        if (isNaN(n) || n < 2) { alert("Size N must be > 1"); return; }
        if (isNaN(p) || p < 0 || p > 1) { alert("Probability p must be between 0 and 1"); return; }

        stats.innerText = "Status: Calculating...";

        // --- 算法部分 Start ---
        const numNodes = n * n;
        const uf = new UnionFind(numNodes);
        let hBonds = []; 
        let vBonds = [];
        let activeNodes = new Array(numNodes).fill(false);

        // 横向键
        for (let r = 0; r < n; r++) {
            hBonds[r] = [];
            for (let c = 0; c < n - 1; c++) {
                const isOpen = Math.random() < p;
                hBonds[r][c] = isOpen;
                if (isOpen) {
                    const idx1 = r * n + c;
                    const idx2 = r * n + (c + 1);
                    uf.union(idx1, idx2);
                    activeNodes[idx1] = true; activeNodes[idx2] = true;
                }
            }
        }

        // 纵向键
        for (let r = 0; r < n - 1; r++) {
            vBonds[r] = [];
            for (let c = 0; c < n; c++) {
                const isOpen = Math.random() < p;
                vBonds[r][c] = isOpen;
                if (isOpen) {
                    const idx1 = r * n + c;
                    const idx2 = (r + 1) * n + c;
                    uf.union(idx1, idx2);
                    activeNodes[idx1] = true; activeNodes[idx2] = true;
                }
            }
        }
        // --- 算法部分 End ---

        // --- 绘图部分 Start ---
        const padding = 40;
        const drawWidth = canvas.width - 2 * padding;
        const cellSize = drawWidth / (n - 1);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 画背景 (Ghost Lattice)
        ctx.strokeStyle = '#EEEEEE';
        ctx.fillStyle = '#EEEEEE';
        ctx.lineWidth = Math.max(1, cellSize * 0.1);
        
        ctx.beginPath();
        for(let i=0; i<n; i++) {
            let pos = padding + i * cellSize;
            ctx.moveTo(padding, pos); ctx.lineTo(canvas.width - padding, pos);
            ctx.moveTo(pos, padding); ctx.lineTo(pos, canvas.height - padding);
        }
        ctx.stroke();

        const ghostRadius = Math.max(2, cellSize * 0.15);
        for(let r=0; r<n; r++) {
            for(let c=0; c<n; c++) {
                ctx.beginPath();
                ctx.arc(padding + c*cellSize, padding + r*cellSize, ghostRadius, 0, 2*Math.PI);
                ctx.fill();
            }
        }

        // 画前景
        const lineWidth = Math.max(2, cellSize * 0.25);
        const nodeRadius = Math.max(3, cellSize * 0.35);

        function getNodeColor(r, c) {
            return getPercColor(uf.find(r * n + c));
        }

        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';

        // 画键
        for(let r=0; r<n; r++) {
            for(let c=0; c<n-1; c++) {
                if(hBonds[r][c]) {
                    ctx.strokeStyle = getNodeColor(r, c);
                    ctx.beginPath();
                    ctx.moveTo(padding + c*cellSize, padding + r*cellSize);
                    ctx.lineTo(padding + (c+1)*cellSize, padding + r*cellSize);
                    ctx.stroke();
                }
            }
        }
        for(let r=0; r<n-1; r++) {
            for(let c=0; c<n; c++) {
                if(vBonds[r][c]) {
                    ctx.strokeStyle = getNodeColor(r, c);
                    ctx.beginPath();
                    ctx.moveTo(padding + c*cellSize, padding + r*cellSize);
                    ctx.lineTo(padding + c*cellSize, padding + (r+1)*cellSize);
                    ctx.stroke();
                }
            }
        }

        // 画节点
        for(let r=0; r<n; r++) {
            for(let c=0; c<n; c++) {
                if(activeNodes[r * n + c]) {
                    ctx.fillStyle = getNodeColor(r, c);
                    ctx.beginPath();
                    ctx.arc(padding + c*cellSize, padding + r*cellSize, nodeRadius, 0, 2*Math.PI);
                    ctx.fill();
                }
            }
        }
        
        // 更新结果文字
        const uniqueRoots = new Set();
        for(let i=0; i<numNodes; i++) {
            if (activeNodes[i]) uniqueRoots.add(uf.find(i));
        }
        stats.innerText = "Status: Done! Found " + uniqueRoots.size + " connected clusters.";
    }

    // 4. 立即执行一次
    // 放在最后，确保 HTML 元素已经存在
    runPercolationSim();

</script>
{% endraw %}
