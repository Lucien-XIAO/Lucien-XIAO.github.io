---
layout: page
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
title: Curriculum Vitae
---

<div class="cv-page cv-document">
  <header class="cv-document-header">
    <p class="cv-kicker">Curriculum Vitae</p>
    <h1>Yuguang XIAO <span lang="zh-CN">肖煜光</span></h1>
    <p class="cv-lede" data-i18n="cv.lede">Academic training, research experience and teaching.</p>
    <div class="action-links cv-download">
      <a href="/assets/docs/yuguang-xiao-cv-en.pdf" data-i18n-href="cv.pdf.href" download><i class="fa-solid fa-download" aria-hidden="true"></i> <span data-i18n="cv.download">Download CV (PDF)</span></a>
      <span data-i18n="cv.updated">Updated October 2026</span>
    </div>
    <p class="cv-print-contact">xiaoyuguang.com · yuguang [dot] xiao [dot] maths [at] gmail [dot] com</p>
    <div class="cv-profile-line" aria-label="Academic profile" data-i18n-aria-label="cv.academic_profile">
      <span>LAMA · CNRS · <a href="https://www.univ-gustave-eiffel.fr/" target="_blank" rel="noopener noreferrer">UGE</a> · UPEC</span>
      <span>Probability & Mathematical Statistical Mechanics</span>
    </div>
  </header>

  <section class="cv-document-section">
    <h2>Education</h2>
    <div class="cv-entry-list">
      <article class="cv-entry">
        <time datetime="2026-10-01" data-i18n="cv.doctoral.period">1 Oct. 2026 – 30 Sep. 2029</time>
        <div class="cv-entry-content">
          <h3><span data-i18n="cv.doctoral.degree">PhD in Mathematics · Doctoral researcher</span> <span class="cv-status" data-i18n="cv.doctoral.status">Current</span></h3>
          <p class="cv-institution" data-i18n-html="cv.doctoral.institution"><a href="https://www.univ-gustave-eiffel.fr/" target="_blank" rel="noopener noreferrer">UGE</a></p>
          <p data-i18n="cv.doctoral.unit">Research unit: LAMA (CNRS, UGE & UPEC).</p>
          <p data-i18n-html="cv.doctoral.registration">Doctoral contract funded by the <a href="https://www.univ-gustave-eiffel.fr/la-recherche/doctorats-et-hdr/ed-mstic" target="_blank" rel="noopener noreferrer">MSTIC Doctoral School (ED 532)</a>.</p>
          <p data-i18n-html="cv.doctoral.project">Doctoral project: <strong><em>Modèles d’Interfaces en Mécanique Statistique Mathématique</em></strong>.</p>
          <p data-i18n-html="cv.doctoral.supervisors">Supervisor: <a href="https://perso.math.u-pem.fr/leny.arnaud/" target="_blank" rel="noopener noreferrer">Arnaud LE NY</a> (UPEC). Co-supervisor: <a href="https://perso.math.u-pem.fr/pmonmarc/" target="_blank" rel="noopener noreferrer">Pierre MONMARCHÉ</a> (UGE).</p>
        </div>
      </article>

      <article class="cv-entry">
        <time>2025 – 2026</time>
        <div class="cv-entry-content">
          <h3>Master 2 in Probability and Random Models (PMA) <span class="cv-status cv-status-complete" data-i18n="cv.m2.status">Completed</span></h3>
          <p class="cv-institution">Sorbonne Université, Paris</p>
        </div>
      </article>

      <article class="cv-entry">
        <time>2024 – 2025</time>
        <div class="cv-entry-content">
          <h3>First-Year M.S. (M1) in Mathematics & Applications</h3>
          <p class="cv-institution">Sorbonne Université, Paris</p>
        </div>
      </article>

      <article class="cv-entry">
        <time>2023 – 2024</time>
        <div class="cv-entry-content">
          <h3>B.S. in Mathematics</h3>
          <p class="cv-institution">Sorbonne Université, Paris</p>
          <p>Completed an intensive one-year program to obtain a second Bachelor's degree in Mathematics.</p>
        </div>
      </article>

      <article class="cv-entry">
        <time>2020 – 2023</time>
        <div class="cv-entry-content">
          <h3>B.S. in Physics (Minor in Mathematics)</h3>
          <p class="cv-institution">Sorbonne Université, Paris</p>
          <p>Completed the MIPI (Math, CS, Physics, Engineering) track in the first year, followed by a Physics Major and Mathematics Minor.</p>
        </div>
      </article>
    </div>
  </section>
  <section class="cv-document-section cv-research" id="experience">
    <h2>Research Experience</h2>
    {% for project in site.data.research %}{% include research-project.html project=project %}{% endfor %}
  </section>
  <section class="cv-document-section">
    <h2>Teaching</h2>
    <article class="cv-entry">
      <time data-i18n="cv.tutoring.period">September 2023 - June 2026</time>
      <div class="cv-entry-content">
        <h3>Private Mathematics Tutor</h3>
        <p data-i18n="cv.tutoring">Continuous one-to-one mathematics tutoring for the same École Polytechnique Bachelor of Science student over three academic years, covering the full mathematics curriculum, questions and problem-solving practice.</p>
      </div>
    </article>
  </section>
  <section class="cv-document-section cv-materials">
    <h2 data-i18n="cv.projects">Mathematical projects</h2>
    <p><a href="/misc/translations/" data-i18n="nav.translations">Translations</a> · <span data-i18n="home.materials.translations">Four mathematical texts in Chinese, from integration to stochastic calculus.</span></p>
    <p><a href="/mathreader/">MathReader</a> · <span data-i18n="home.materials.mathreader">A macOS reader for mathematical papers, annotations and AI-assisted reading.</span></p>
  </section>
</div>
