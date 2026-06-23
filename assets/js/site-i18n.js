(function () {
  const STORAGE_KEY = "yuguang-site-language-v3";
  const SUPPORTED_LANGUAGES = ["en", "fr", "zh"];
  const HTML_LANG = {
    en: "en",
    fr: "fr",
    zh: "zh-CN",
  };

  const KEYED_TRANSLATIONS = {
    "language.selector": {
      en: "Language selector",
      fr: "Sélecteur de langue",
      zh: "语言切换",
    },
    "language.switch.en": {
      en: "Switch to English",
      fr: "Passer en anglais",
      zh: "切换到英文",
    },
    "language.switch.fr": {
      en: "Switch to French",
      fr: "Passer en français",
      zh: "切换到法语",
    },
    "language.switch.zh": {
      en: "Switch to Chinese",
      fr: "Passer en chinois",
      zh: "切换到中文",
    },
    "nav.home": {
      en: "Home",
      fr: "Accueil",
      zh: "首页",
    },
    "nav.publications": {
      en: "Publications",
      fr: "Publications",
      zh: "论文",
    },
    "nav.talks": {
      en: "Talks",
      fr: "Exposés",
      zh: "报告",
    },
    "nav.teaching": {
      en: "Teaching",
      fr: "Enseignement",
      zh: "教学",
    },
    "nav.cv": {
      en: "CV",
      fr: "CV",
      zh: "简历",
    },
    "nav.pma": {
      en: "M2-PMA (25-26)",
      fr: "M2-PMA (25-26)",
      zh: "M2-PMA (25-26)",
    },
    "nav.mathreader": {
      en: "MathReader",
      fr: "MathReader",
      zh: "MathReader",
    },
    "nav.misc": {
      en: "Misc",
      fr: "Divers",
      zh: "杂项",
    },
    "theme.toggle": {
      en: "Toggle dark mode",
      fr: "Changer le mode sombre",
      zh: "切换深色模式",
    },
    "contact.reveal": {
      en: "Copy email address",
      fr: "Copier l'adresse e-mail",
      zh: "复制邮箱地址",
    },
    "footer.copyright": {
      en: "© 2026 Yuguang XIAO. All rights reserved.",
      fr: "© 2026 Yuguang XIAO. Tous droits réservés.",
      zh: "© 2026 肖煜光。保留所有权利。",
    },
    "pma.breadcrumb.home": {
      en: "Home",
      fr: "Accueil",
      zh: "首页",
    },
  };

  const TEXT_TRANSLATIONS = {
    "Yuguang XIAO - Homepage": {
      en: "Yuguang XIAO - Homepage",
      fr: "Yuguang XIAO - Accueil",
      zh: "肖煜光 - 主页",
    },
    "Publications": {
      en: "Publications",
      fr: "Publications",
      zh: "论文",
    },
    "Talks": {
      en: "Talks",
      fr: "Exposés",
      zh: "报告",
    },
    "Teaching": {
      en: "Teaching",
      fr: "Enseignement",
      zh: "教学",
    },
    "Curriculum Vitae": {
      en: "Curriculum Vitae",
      fr: "Curriculum vitae",
      zh: "个人简历",
    },
    "Miscellaneous": {
      en: "Miscellaneous",
      fr: "Divers",
      zh: "杂项",
    },
    "404 — Page Not Found | Yuguang XIAO": {
      en: "404 — Page Not Found | Yuguang XIAO",
      fr: "404 — Page introuvable | Yuguang XIAO",
      zh: "404 — 页面未找到 | 肖煜光",
    },
    "About Me": {
      en: "About Me",
      fr: "À propos",
      zh: "关于我",
    },
    "Interests": {
      en: "Interests",
      fr: "Centres d'intérêt",
      zh: "研究兴趣",
    },
    "Research Directions": {
      en: "Research Directions",
      fr: "Axes de recherche",
      zh: "研究方向",
    },
    "News": {
      en: "News",
      fr: "Actualités",
      zh: "动态",
    },
    "Education": {
      en: "Education",
      fr: "Formation",
      zh: "教育背景",
    },
    "Research Experience": {
      en: "Research Experience",
      fr: "Expériences de recherche",
      zh: "研究经历",
    },
    "Various Notes": {
      en: "Various Notes",
      fr: "Notes diverses",
      zh: "学习笔记",
    },
    "Selected Materials": {
      en: "Selected Materials",
      fr: "Documents choisis",
      zh: "精选材料",
    },
    "Probability": {
      en: "Probability",
      fr: "Probabilités",
      zh: "概率论",
    },
    "Random walks": {
      en: "Random walks",
      fr: "Marches aléatoires",
      zh: "随机游走",
    },
    "Statistical physics": {
      en: "Statistical physics",
      fr: "Physique statistique",
      zh: "统计物理",
    },
    "Probability theory and stochastic processes": {
      en: "Probability theory and stochastic processes",
      fr: "Théorie des probabilités et processus stochastiques",
      zh: "概率论与随机过程",
    },
    "Non-Markovian random walks and memory effects": {
      en: "Non-Markovian random walks and memory effects",
      fr: "Marches aléatoires non markoviennes et effets de mémoire",
      zh: "非马尔可夫随机游走与记忆效应",
    },
    "Interacting particle systems and stochastic dynamics": {
      en: "Interacting particle systems and stochastic dynamics",
      fr: "Systèmes de particules en interaction et dynamiques stochastiques",
      zh: "相互作用粒子系统与随机动力学",
    },
    "Statistical mechanics: Ising-type models, XY models, height functions, and phase transitions": {
      en: "Statistical mechanics: Ising-type models, XY models, height functions, and phase transitions",
      fr: "Mécanique statistique : modèles de type Ising, modèles XY, fonctions de hauteur et transitions de phase",
      zh: "统计力学：Ising 型模型、XY 模型、高度函数与相变",
    },
    "Mathematical neuroscience: Hawkes processes and stochastic models of neural activity": {
      en: "Mathematical neuroscience: Hawkes processes and stochastic models of neural activity",
      fr: "Neurosciences mathématiques : processus de Hawkes et modèles stochastiques de l'activité neuronale",
      zh: "数学神经科学：Hawkes 过程与神经活动的随机模型",
    },
    "Stochastic Processes": {
      en: "Stochastic Processes",
      fr: "Processus stochastiques",
      zh: "随机过程",
    },
    "I am interested in random walks, Markov and non-Markovian dynamics, and the probabilistic structures behind memory effects.": {
      en: "I am interested in random walks, Markov and non-Markovian dynamics, and the probabilistic structures behind memory effects.",
      fr: "Je m'intéresse aux marches aléatoires, aux dynamiques markoviennes et non markoviennes, ainsi qu'aux structures probabilistes derrière les effets de mémoire.",
      zh: "我关注随机游走、马尔可夫与非马尔可夫动力学，以及记忆效应背后的概率结构。",
    },
    "Statistical Mechanics": {
      en: "Statistical Mechanics",
      fr: "Mécanique statistique",
      zh: "统计力学",
    },
    "My current work concerns long-range Ising-type models and related questions on phase transitions, interfaces, and interacting particle systems.": {
      en: "My current work concerns long-range Ising-type models and related questions on phase transitions, interfaces, and interacting particle systems.",
      fr: "Mes travaux actuels portent sur des modèles de type Ising à longue portée et sur des questions liées aux transitions de phase, aux interfaces et aux systèmes de particules en interaction.",
      zh: "我目前的工作围绕长程 Ising 型模型，以及相变、界面和相互作用粒子系统中的相关问题展开。",
    },
    "Mathematical Modeling": {
      en: "Mathematical Modeling",
      fr: "Modélisation mathématique",
      zh: "数学建模",
    },
    "I also enjoy probabilistic models arising from collective motion and neuroscience, especially Hawkes processes and stochastic models of neural activity.": {
      en: "I also enjoy probabilistic models arising from collective motion and neuroscience, especially Hawkes processes and stochastic models of neural activity.",
      fr: "Je m'intéresse aussi aux modèles probabilistes issus du mouvement collectif et des neurosciences, en particulier aux processus de Hawkes et aux modèles stochastiques de l'activité neuronale.",
      zh: "我也对来自集体运动和神经科学的概率模型感兴趣，尤其是 Hawkes 过程和神经活动的随机模型。",
    },
    "M2-PMA · Stochastic Processes": {
      en: "M2-PMA · Stochastic Processes",
      fr: "M2-PMA · Processus stochastiques",
      zh: "M2-PMA · 随机过程",
    },
    "LAMA / UPEC · M2 internship": {
      en: "LAMA / UPEC · M2 internship",
      fr: "LAMA / UPEC · Stage de M2",
      zh: "LAMA / UPEC · M2 实习",
    },
    "Long-range Ising model": {
      en: "Long-range Ising model",
      fr: "Modèle d'Ising à longue portée",
      zh: "长程 Ising 模型",
    },
    "Academic background and research experience.": {
      en: "Academic background and research experience.",
      fr: "Formation académique et expériences de recherche.",
      zh: "教育背景与研究经历。",
    },
    "PMA Path": {
      en: "PMA Path",
      fr: "Parcours PMA",
      zh: "PMA 课程路径",
    },
    "Notes on the M2 Probability and Random Models program.": {
      en: "Notes on the M2 Probability and Random Models program.",
      fr: "Notes sur le M2 Probabilités et Modèles Aléatoires.",
      zh: "关于 M2 概率与随机模型项目的整理。",
    },
    "A macOS tool for reading and organizing mathematical papers.": {
      en: "A macOS tool for reading and organizing mathematical papers.",
      fr: "Un outil macOS pour lire et organiser des articles mathématiques.",
      zh: "用于阅读和整理数学论文的 macOS 工具。",
    },
    "Measure Theory Notes": {
      en: "Measure Theory Notes",
      fr: "Notes de théorie de la mesure",
      zh: "测度论笔记",
    },
    "Self-compiled notes, currently in progress.": {
      en: "Self-compiled notes, currently in progress.",
      fr: "Notes personnelles en cours de rédaction.",
      zh: "个人整理的笔记，目前仍在完善中。",
    },
    "[Apr 2026]": {
      en: "[Apr 2026]",
      fr: "[avr. 2026]",
      zh: "[2026 年 4 月]",
    },
    "Master 2 in Probability and Random Models (PMA)": {
      en: "Master 2 in Probability and Random Models (PMA)",
      fr: "Master 2 Probabilités et Modèles Aléatoires (PMA)",
      zh: "概率与随机模型硕士二年级（PMA）",
    },
    "Master 1 Mathematics and Applications": {
      en: "Master 1 Mathematics and Applications",
      fr: "Master 1 Mathématiques et Applications",
      zh: "数学与应用硕士一年级",
    },
    "Double Bachelor's degree in Mathematics and Physics": {
      en: "Double Bachelor's degree in Mathematics and Physics",
      fr: "Double licence en mathématiques et physique",
      zh: "数学与物理双学士学位",
    },
    "M2 Research Intern": {
      en: "M2 Research Intern",
      fr: "Stagiaire de recherche M2",
      zh: "M2 研究实习生",
    },
    "M1 Research Intern": {
      en: "M1 Research Intern",
      fr: "Stagiaire de recherche M1",
      zh: "M1 研究实习生",
    },
    "L3 Research Intern": {
      en: "L3 Research Intern",
      fr: "Stagiaire de recherche L3",
      zh: "本科三年级研究实习生",
    },
    "Topic:": {
      en: "Topic:",
      fr: "Sujet :",
      zh: "课题：",
    },
    "Advisor:": {
      en: "Advisor:",
      fr: "Encadrant :",
      zh: "导师：",
    },
    "Long-range Ising model": {
      en: "Long-range Ising model",
      fr: "Modèle d'Ising à longue portée",
      zh: "长程 Ising 模型",
    },
    "Bi-Lipschitz equivalence of separated nets in Banach spaces": {
      en: "Bi-Lipschitz equivalence of separated nets in Banach spaces",
      fr: "Équivalence bi-lipschitzienne de réseaux séparés dans les espaces de Banach",
      zh: "Banach 空间中分离网的双 Lipschitz 等价",
    },
    "Collective motion modeling": {
      en: "Collective motion modeling",
      fr: "Modélisation du mouvement collectif",
      zh: "集体运动建模",
    },
    "April 2026 - July 2026": {
      en: "April 2026 - July 2026",
      fr: "avril 2026 - juillet 2026",
      zh: "2026 年 4 月 - 2026 年 7 月",
    },
    "Report": {
      en: "Report",
      fr: "Rapport",
      zh: "报告",
    },
    "Slides": {
      en: "Slides",
      fr: "Diaporama",
      zh: "幻灯片",
    },
    "Measure Theory": {
      en: "Measure Theory",
      fr: "Théorie de la mesure",
      zh: "测度论",
    },
    "(Work in progress)": {
      en: "(Work in progress)",
      fr: "(en cours)",
      zh: "（仍在整理）",
    },
    "Self-compiled notes": {
      en: "Self-compiled notes",
      fr: "Notes personnelles compilées",
      zh: "个人整理笔记",
    },
    "Updated recently": {
      en: "Updated recently",
      fr: "Mis à jour récemment",
      zh: "最近更新",
    },
    "PDF": {
      en: "PDF",
      fr: "PDF",
      zh: "PDF",
    },
    "Publications & Preprints": {
      en: "Publications & Preprints",
      fr: "Publications et prépublications",
      zh: "论文与预印本",
    },
    "My academic research and working papers.": {
      en: "My academic research and working papers.",
      fr: "Mes travaux de recherche et textes en préparation.",
      zh: "我的学术研究与工作论文。",
    },
    "No Publications Yet": {
      en: "No Publications Yet",
      fr: "Aucune publication pour le moment",
      zh: "暂无论文",
    },
    "I have no publications to date, but I will certainly have some in the future. Check back later for updates.": {
      en: "I have no publications to date, but I will certainly have some in the future. Check back later for updates.",
      fr: "Je n'ai pas encore de publications, mais elles viendront certainement. Revenez plus tard pour les mises à jour.",
      zh: "目前我还没有正式发表的论文，但以后一定会有。欢迎之后再来看看更新。",
    },
    "Invited Talks & Presentations": {
      en: "Invited Talks & Presentations",
      fr: "Exposés invités et présentations",
      zh: "受邀报告与展示",
    },
    "Seminars, workshops, and conference presentations.": {
      en: "Seminars, workshops, and conference presentations.",
      fr: "Séminaires, ateliers et présentations en conférence.",
      zh: "研讨班、工作坊与会议报告。",
    },
    "No Talks Yet": {
      en: "No Talks Yet",
      fr: "Aucun exposé pour le moment",
      zh: "暂无报告",
    },
    "I don't have any scheduled talks at the moment.": {
      en: "I don't have any scheduled talks at the moment.",
      fr: "Je n'ai pas d'exposé prévu pour le moment.",
      zh: "目前还没有已安排的报告。",
    },
    "Teaching Experience": {
      en: "Teaching Experience",
      fr: "Expérience d'enseignement",
      zh: "教学经历",
    },
    "My academic teaching and tutoring records.": {
      en: "My academic teaching and tutoring records.",
      fr: "Mes expériences d'enseignement et de tutorat.",
      zh: "我的教学与辅导经历。",
    },
    "Private Mathematics Tutor": {
      en: "Private Mathematics Tutor",
      fr: "Tuteur privé en mathématiques",
      zh: "私人数学辅导",
    },
    "Bachelor of Science Student at École Polytechnique": {
      en: "Bachelor of Science Student at École Polytechnique",
      fr: "Étudiant en Bachelor of Science à l'École polytechnique",
      zh: "巴黎综合理工学院 Bachelor of Science 学生",
    },
    "Sept. 2023 – present": {
      en: "Sept. 2023 – present",
      fr: "sept. 2023 – présent",
      zh: "2023 年 9 月至今",
    },
    "Tutoring in analysis and linear algebra for undergraduate (first-year) students.": {
      en: "Tutoring in analysis and linear algebra for undergraduate (first-year) students.",
      fr: "Tutorat en analyse et algèbre linéaire pour des étudiants de première année.",
      zh: "为本科一年级学生辅导分析与线性代数。",
    },
    "Personalized mentoring to help students grasp advanced mathematical abstractions.": {
      en: "Personalized mentoring to help students grasp advanced mathematical abstractions.",
      fr: "Accompagnement personnalisé pour aider les étudiants à saisir les abstractions mathématiques avancées.",
      zh: "提供个性化辅导，帮助学生理解较抽象的高等数学概念。",
    },
    "Education & Academic Background": {
      en: "Education & Academic Background",
      fr: "Formation et parcours académique",
      zh: "教育与学术背景",
    },
    "My academic journey and curriculum vitae.": {
      en: "My academic journey and curriculum vitae.",
      fr: "Mon parcours académique et mon curriculum vitae.",
      zh: "我的学术经历与个人简历。",
    },
    "M.S. in Probability": {
      en: "M.S. in Probability",
      fr: "Master en probabilités",
      zh: "概率论硕士",
    },
    "2026 (expected)": {
      en: "2026 (expected)",
      fr: "2026 (prévu)",
      zh: "2026（预计）",
    },
    "First-Year M.S. (M1) in Mathematics & Applications": {
      en: "First-Year M.S. (M1) in Mathematics & Applications",
      fr: "M1 Mathématiques et Applications",
      zh: "数学与应用硕士一年级（M1）",
    },
    "B.S. in Mathematics": {
      en: "B.S. in Mathematics",
      fr: "Licence de mathématiques",
      zh: "数学学士",
    },
    "Completed an intensive one-year program to obtain a second Bachelor's degree in Mathematics.": {
      en: "Completed an intensive one-year program to obtain a second Bachelor's degree in Mathematics.",
      fr: "Programme intensif d'un an pour obtenir une seconde licence en mathématiques.",
      zh: "完成一年制强化项目，取得第二个数学学士学位。",
    },
    "B.S. in Physics (Minor in Mathematics)": {
      en: "B.S. in Physics (Minor in Mathematics)",
      fr: "Licence de physique (mineure en mathématiques)",
      zh: "物理学士（数学辅修）",
    },
    "Completed the MIPI (Math, CS, Physics, Engineering) track in the first year, followed by a Physics Major and Mathematics Minor.": {
      en: "Completed the MIPI (Math, CS, Physics, Engineering) track in the first year, followed by a Physics Major and Mathematics Minor.",
      fr: "Première année en parcours MIPI (mathématiques, informatique, physique, ingénierie), puis majeure physique et mineure mathématiques.",
      zh: "第一年完成 MIPI（数学、计算机、物理、工程）方向，之后主修物理并辅修数学。",
    },
    "Skills": {
      en: "Skills",
      fr: "Compétences",
      zh: "技能",
    },
    "Languages": {
      en: "Languages",
      fr: "Langues",
      zh: "语言",
    },
    "Mandarin": {
      en: "Mandarin",
      fr: "Chinois mandarin",
      zh: "中文普通话",
    },
    "(Native)": {
      en: "(Native)",
      fr: "(langue maternelle)",
      zh: "（母语）",
    },
    "French": {
      en: "French",
      fr: "Français",
      zh: "法语",
    },
    "English": {
      en: "English",
      fr: "Anglais",
      zh: "英语",
    },
    "(Fluent)": {
      en: "(Fluent)",
      fr: "(courant)",
      zh: "（流利）",
    },
    "Technical Skills": {
      en: "Technical Skills",
      fr: "Compétences techniques",
      zh: "技术技能",
    },
    "(Proficient)": {
      en: "(Proficient)",
      fr: "(maîtrisé)",
      zh: "（熟练）",
    },
    "Miscellaneous & Interesting Results": {
      en: "Miscellaneous & Interesting Results",
      fr: "Divers et résultats visuels",
      zh: "杂项与有趣结果",
    },
    "Some pictures or animations illustrating my research, created with Python. Enjoy visual mathematics and Physics!": {
      en: "Some pictures or animations illustrating my research, created with Python. Enjoy visual mathematics and Physics!",
      fr: "Quelques images ou animations créées avec Python pour illustrer mes travaux. Bonne exploration des mathématiques et de la physique visuelles !",
      zh: "这里放一些用 Python 制作、用来展示我研究内容的图片或动画。欢迎享受可视化的数学与物理！",
    },
    "Bond Percolation": {
      en: "Bond Percolation",
      fr: "Percolation par arêtes",
      zh: "边渗流",
    },
    "Ising Random Interface": {
      en: "Ising Random Interface",
      fr: "Interface aléatoire d'Ising",
      zh: "Ising 随机界面",
    },
    "3D Ising Random Interface": {
      en: "3D Ising Random Interface",
      fr: "Interface aléatoire d'Ising en 3D",
      zh: "三维 Ising 随机界面",
    },
    "Collective Motion with Predators": {
      en: "Collective Motion with Predators",
      fr: "Mouvement collectif avec prédateurs",
      zh: "带捕食者的集体运动",
    },
    "N-body Model in Astrophysics": {
      en: "N-body Model in Astrophysics",
      fr: "Modèle à N corps en astrophysique",
      zh: "天体物理中的 N 体模型",
    },
    "Interactive visualization of Bond Percolation on a 2D square lattice. In this model, p represents the probability of a bond (edge) being open. Unlike site percolation, nodes are only colored if they are connected to at least one open bond, preventing isolated colored nodes. Try varying p around the critical threshold (0.5) to observe the phase transition in connectivity.": {
      en: "Interactive visualization of Bond Percolation on a 2D square lattice. In this model, p represents the probability of a bond (edge) being open. Unlike site percolation, nodes are only colored if they are connected to at least one open bond, preventing isolated colored nodes. Try varying p around the critical threshold (0.5) to observe the phase transition in connectivity.",
      fr: "Visualisation interactive de la percolation par arêtes sur un réseau carré en dimension 2. Ici, p désigne la probabilité qu'une arête soit ouverte. Contrairement à la percolation par sites, les sommets ne sont colorés que s'ils sont reliés à au moins une arête ouverte. Faites varier p autour du seuil critique 0,5 pour observer la transition de connectivité.",
      zh: "二维方格上的边渗流交互可视化。在这个模型中，p 表示一条边处于开放状态的概率。不同于点渗流，只有连接到至少一条开放边的节点才会被着色，从而避免孤立彩色点。试着在临界阈值 0.5 附近改变 p，观察连通性的相变。",
    },
    "Interactive simulation of the two-dimensional Ising model with Dobrushin boundary conditions: the upper part of the boundary is fixed to +1 and the lower part to -1. Change the temperature T = 1 / beta to see how the random interface becomes sharper below the critical temperature and more disordered above it.": {
      en: "Interactive simulation of the two-dimensional Ising model with Dobrushin boundary conditions: the upper part of the boundary is fixed to +1 and the lower part to -1. Change the temperature T = 1 / beta to see how the random interface becomes sharper below the critical temperature and more disordered above it.",
      fr: "Simulation interactive du modèle d'Ising bidimensionnel avec conditions au bord de Dobrushin : la partie supérieure du bord est fixée à +1 et la partie inférieure à -1. Modifiez la température T = 1 / beta pour voir l'interface devenir plus nette sous la température critique et plus désordonnée au-dessus.",
      zh: "二维 Ising 模型在 Dobrushin 边界条件下的交互模拟：边界上半部分固定为 +1，下半部分固定为 -1。改变温度 T = 1 / beta，可以看到随机界面在临界温度以下更清晰，在临界温度以上更无序。",
    },
    "A true three-dimensional L × L × L Ising box with Dobrushin boundary conditions. The translucent red and blue shell shows the fixed boundary phases on the cubic box, while the yellow surface tracks the estimated two-dimensional random interface inside the volume. Change T = 1 / beta and rotate the box to inspect how the interface roughens.": {
      en: "A true three-dimensional L × L × L Ising box with Dobrushin boundary conditions. The translucent red and blue shell shows the fixed boundary phases on the cubic box, while the yellow surface tracks the estimated two-dimensional random interface inside the volume. Change T = 1 / beta and rotate the box to inspect how the interface roughens.",
      fr: "Une véritable boîte d'Ising tridimensionnelle L × L × L avec conditions au bord de Dobrushin. L'enveloppe rouge et bleue translucide indique les phases fixées sur le cube, tandis que la surface jaune suit l'interface aléatoire bidimensionnelle estimée à l'intérieur du volume. Modifiez T = 1 / beta et faites tourner la boîte pour observer le rugosité de l'interface.",
      zh: "一个真正的三维 L × L × L Ising 盒子，带 Dobrushin 边界条件。半透明的红蓝外壳表示立方体边界上的固定相，黄色曲面追踪体内部估计出的二维随机界面。改变 T = 1 / beta 并旋转盒子，可以观察界面如何变粗糙。",
    },
    "Visualization results from my L3 internship on collective motion in the presence of predators. The left animation shows the dynamics of a flock of 50 green agents when a single red predator is introduced, while the right one shows the same system with three predators. I mainly focused on the modeling and analysis of such predator–prey interactions with Python code in my report.": {
      en: "Visualization results from my L3 internship on collective motion in the presence of predators. The left animation shows the dynamics of a flock of 50 green agents when a single red predator is introduced, while the right one shows the same system with three predators. I mainly focused on the modeling and analysis of such predator–prey interactions with Python code in my report.",
      fr: "Résultats de visualisation issus de mon stage de L3 sur le mouvement collectif en présence de prédateurs. L'animation de gauche montre la dynamique d'un groupe de 50 agents verts avec un prédateur rouge, tandis que celle de droite montre le même système avec trois prédateurs. Mon rapport portait surtout sur la modélisation et l'analyse de ces interactions proie-prédateur en Python.",
      zh: "这是我本科三年级关于带捕食者集体运动实习中的可视化结果。左图展示了 50 个绿色个体在加入一个红色捕食者后的动力学，右图展示了同一系统中有三个捕食者时的情况。我的报告主要用 Python 对这类捕食者-猎物相互作用进行建模与分析。",
    },
    "Result from my L3 physics internship on celestial mechanics. We studied the classical N-body model in astrophysics and plotted the trajectories of the Moon and an Earth-orbiting satellite relative to the Earth. The black dot represents the Earth, the blue curve corresponds to the actual satellite trajectory, and the red curve represents the actual Moon trajectory (real data obtained from NASA). Using the 3-body model, we simulated the green trajectory for the satellite and the yellow trajectory for the Moon.": {
      en: "Result from my L3 physics internship on celestial mechanics. We studied the classical N-body model in astrophysics and plotted the trajectories of the Moon and an Earth-orbiting satellite relative to the Earth. The black dot represents the Earth, the blue curve corresponds to the actual satellite trajectory, and the red curve represents the actual Moon trajectory (real data obtained from NASA). Using the 3-body model, we simulated the green trajectory for the satellite and the yellow trajectory for the Moon.",
      fr: "Résultat de mon stage de L3 en physique sur la mécanique céleste. Nous avons étudié le modèle classique à N corps en astrophysique et tracé les trajectoires de la Lune et d'un satellite en orbite terrestre par rapport à la Terre. Le point noir représente la Terre, la courbe bleue la trajectoire réelle du satellite, et la courbe rouge la trajectoire réelle de la Lune (données NASA). Avec le modèle à trois corps, nous avons simulé la trajectoire verte du satellite et la trajectoire jaune de la Lune.",
      zh: "这是我本科三年级物理实习中关于天体力学的结果。我们研究了天体物理中的经典 N 体模型，并绘制了月球和绕地卫星相对于地球的轨迹。黑点表示地球，蓝色曲线是真实卫星轨迹，红色曲线是真实月球轨迹（数据来自 NASA）。利用三体模型，我们模拟了卫星的绿色轨迹和月球的黄色轨迹。",
    },
    "macOS research tool · SwiftUI + PDFKit": {
      en: "macOS research tool · SwiftUI + PDFKit",
      fr: "Outil de recherche macOS · SwiftUI + PDFKit",
      zh: "macOS 研究工具 · SwiftUI + PDFKit",
    },
    "MathReader is a personal macOS app for reading mathematical papers and lecture notes with an AI assistant beside the PDF. It is built around the actual workflow of doing mathematics: selecting a passage, recognizing formulas, asking for a derivation, annotating the PDF, and keeping references organized.": {
      en: "MathReader is a personal macOS app for reading mathematical papers and lecture notes with an AI assistant beside the PDF. It is built around the actual workflow of doing mathematics: selecting a passage, recognizing formulas, asking for a derivation, annotating the PDF, and keeping references organized.",
      fr: "MathReader est une application macOS personnelle pour lire des articles mathématiques et des notes de cours avec un assistant IA à côté du PDF. Elle suit le vrai flux de travail mathématique : sélectionner un passage, reconnaître des formules, demander une dérivation, annoter le PDF et organiser les références.",
      zh: "MathReader 是一个个人 macOS 应用，用来阅读数学论文和课程讲义，并在 PDF 旁边放置一个 AI 助手。它围绕真实的数学阅读流程设计：选择段落、识别公式、请求推导、标注 PDF，并整理参考文献。",
    },
    "Release V2.2": {
      en: "Release V2.2",
      fr: "Version V2.2",
      zh: "V2.2 版本",
    },
    "Workflow": {
      en: "Workflow",
      fr: "Flux de travail",
      zh: "工作流",
    },
    "MathReader interface preview": {
      en: "MathReader interface preview",
      fr: "Aperçu de l'interface de MathReader",
      zh: "MathReader 界面预览",
    },
    "Probability": {
      en: "Probability",
      fr: "Probabilités",
      zh: "概率论",
    },
    "Markov chains": {
      en: "Markov chains",
      fr: "Chaînes de Markov",
      zh: "马尔可夫链",
    },
    "Lecture notes": {
      en: "Lecture notes",
      fr: "Notes de cours",
      zh: "课程讲义",
    },
    "Recognize the selected formula and derive it step by step.": {
      en: "Recognize the selected formula and derive it step by step.",
      fr: "Reconnaître la formule sélectionnée et la dériver étape par étape.",
      zh: "识别选中的公式，并逐步推导。",
    },
    "LaTeX ready": {
      en: "LaTeX ready",
      fr: "Prêt pour LaTeX",
      zh: "可直接用于 LaTeX",
    },
    "What It Is For": {
      en: "What It Is For",
      fr: "À quoi sert MathReader",
      zh: "它用来做什么",
    },
    "The project is a reader for mathematically dense PDFs. Instead of switching between a PDF viewer, a browser, a note-taking app, and a bibliography manager, MathReader puts those actions into one reading surface.": {
      en: "The project is a reader for mathematically dense PDFs. Instead of switching between a PDF viewer, a browser, a note-taking app, and a bibliography manager, MathReader puts those actions into one reading surface.",
      fr: "Ce projet est un lecteur pour des PDF mathématiquement denses. Au lieu de passer d'un lecteur PDF à un navigateur, une application de notes et un gestionnaire bibliographique, MathReader rassemble ces actions dans une même surface de lecture.",
      zh: "这个项目是一个面向高密度数学 PDF 的阅读器。它把 PDF 阅读器、浏览器、笔记软件和文献管理器里的动作合并到同一个阅读界面里。",
    },
    "Read and Annotate": {
      en: "Read and Annotate",
      fr: "Lire et annoter",
      zh: "阅读与标注",
    },
    "Highlight, underline, strike out, add notes, erase annotations, and save changes back to the PDF.": {
      en: "Highlight, underline, strike out, add notes, erase annotations, and save changes back to the PDF.",
      fr: "Surligner, souligner, barrer, ajouter des notes, effacer des annotations et enregistrer les modifications dans le PDF.",
      zh: "高亮、下划线、删除线、添加笔记、擦除标注，并把修改保存回 PDF。",
    },
    "Formula OCR": {
      en: "Formula OCR",
      fr: "OCR de formules",
      zh: "公式 OCR",
    },
    "Drag a rectangle over formulas, figures, or text and send the captured region to a vision model.": {
      en: "Drag a rectangle over formulas, figures, or text and send the captured region to a vision model.",
      fr: "Tracer un rectangle sur une formule, une figure ou du texte, puis envoyer la zone capturée à un modèle de vision.",
      zh: "在公式、图像或文本上框选一个矩形区域，并把截图发送给视觉模型。",
    },
    "Mathematical AI": {
      en: "Mathematical AI",
      fr: "IA mathématique",
      zh: "数学 AI",
    },
    "Ask for translations, explanations, citation parsing, or rigorous step-by-step derivations.": {
      en: "Ask for translations, explanations, citation parsing, or rigorous step-by-step derivations.",
      fr: "Demander des traductions, des explications, l'analyse de citations ou des dérivations rigoureuses étape par étape.",
      zh: "请求翻译、解释、解析引用，或进行严谨的逐步推导。",
    },
    "Reference Tools": {
      en: "Reference Tools",
      fr: "Outils bibliographiques",
      zh: "文献工具",
    },
    "Store paper metadata, copy LaTeX citations, generate BibTeX, and export Markdown notes.": {
      en: "Store paper metadata, copy LaTeX citations, generate BibTeX, and export Markdown notes.",
      fr: "Stocker les métadonnées d'articles, copier des citations LaTeX, générer du BibTeX et exporter des notes Markdown.",
      zh: "保存论文元数据、复制 LaTeX 引用、生成 BibTeX，并导出 Markdown 笔记。",
    },
    "Reading Workflow": {
      en: "Reading Workflow",
      fr: "Flux de lecture",
      zh: "阅读流程",
    },
    "Import papers into topics": {
      en: "Import papers into topics",
      fr: "Importer les articles par thème",
      zh: "按主题导入论文",
    },
    "Build a small research library by topic, or paste an arXiv link to fetch metadata and download the PDF.": {
      en: "Build a small research library by topic, or paste an arXiv link to fetch metadata and download the PDF.",
      fr: "Construire une petite bibliothèque de recherche par thème, ou coller un lien arXiv pour récupérer les métadonnées et télécharger le PDF.",
      zh: "按主题建立一个小型研究文库，或粘贴 arXiv 链接以获取元数据并下载 PDF。",
    },
    "Read with context": {
      en: "Read with context",
      fr: "Lire avec le contexte",
      zh: "带上下文阅读",
    },
    "The reader remembers your last position and uses the current PDF page as background context for AI answers.": {
      en: "The reader remembers your last position and uses the current PDF page as background context for AI answers.",
      fr: "Le lecteur mémorise la dernière position et utilise la page PDF courante comme contexte pour les réponses de l'IA.",
      zh: "阅读器会记住上次位置，并把当前 PDF 页面作为 AI 回答的背景上下文。",
    },
    "Select, capture, or ask": {
      en: "Select, capture, or ask",
      fr: "Sélectionner, capturer ou demander",
      zh: "选择、截图或提问",
    },
    "Select text for translation, capture a formula as an image, or ask a follow-up in the side panel.": {
      en: "Select text for translation, capture a formula as an image, or ask a follow-up in the side panel.",
      fr: "Sélectionner du texte à traduire, capturer une formule comme image ou poser une question complémentaire dans le panneau latéral.",
      zh: "选择文本进行翻译，把公式截图成图像，或在侧边栏继续提问。",
    },
    "Export usable notes": {
      en: "Export usable notes",
      fr: "Exporter des notes utilisables",
      zh: "导出可用笔记",
    },
    "Save paper notes together with BibTeX and AI conversations as a Markdown file.": {
      en: "Save paper notes together with BibTeX and AI conversations as a Markdown file.",
      fr: "Enregistrer les notes de lecture avec le BibTeX et les conversations IA dans un fichier Markdown.",
      zh: "把论文笔记、BibTeX 和 AI 对话一起保存为 Markdown 文件。",
    },
    "Implementation Notes": {
      en: "Implementation Notes",
      fr: "Notes d'implémentation",
      zh: "实现说明",
    },
    "Native macOS foundation": {
      en: "Native macOS foundation",
      fr: "Base native macOS",
      zh: "原生 macOS 基础",
    },
    "The app is written in SwiftUI with PDFKit, WebKit, Vision, and AppKit. The interface combines a topic-based library, a continuous PDF reader, and a resizable assistant panel.": {
      en: "The app is written in SwiftUI with PDFKit, WebKit, Vision, and AppKit. The interface combines a topic-based library, a continuous PDF reader, and a resizable assistant panel.",
      fr: "L'application est écrite en SwiftUI avec PDFKit, WebKit, Vision et AppKit. L'interface combine une bibliothèque par thèmes, un lecteur PDF continu et un panneau assistant redimensionnable.",
      zh: "这个应用使用 SwiftUI 编写，并结合 PDFKit、WebKit、Vision 和 AppKit。界面包含按主题组织的文库、连续 PDF 阅读器和可调整大小的助手面板。",
    },
    "Multiple assistant modes": {
      en: "Multiple assistant modes",
      fr: "Plusieurs modes d'assistant",
      zh: "多种助手模式",
    },
    "MathReader supports API-based analysis and web assistant modes, including DeepSeek Web, Gemini Web, ChatGPT Web, and Claude Web. Text models and vision models can be configured separately.": {
      en: "MathReader supports API-based analysis and web assistant modes, including DeepSeek Web, Gemini Web, ChatGPT Web, and Claude Web. Text models and vision models can be configured separately.",
      fr: "MathReader prend en charge l'analyse via API et des modes assistants web, dont DeepSeek Web, Gemini Web, ChatGPT Web et Claude Web. Les modèles texte et vision peuvent être configurés séparément.",
      zh: "MathReader 支持基于 API 的分析和网页助手模式，包括 DeepSeek Web、Gemini Web、ChatGPT Web 和 Claude Web。文本模型与视觉模型可以分别配置。",
    },
    "Academic metadata": {
      en: "Academic metadata",
      fr: "Métadonnées académiques",
      zh: "学术元数据",
    },
    "Imported papers can store authors, year, abstract, DOI, arXiv ID, URL, tags, citation key, and personal notes.": {
      en: "Imported papers can store authors, year, abstract, DOI, arXiv ID, URL, tags, citation key, and personal notes.",
      fr: "Les articles importés peuvent conserver auteurs, année, résumé, DOI, identifiant arXiv, URL, tags, clé de citation et notes personnelles.",
      zh: "导入的论文可以保存作者、年份、摘要、DOI、arXiv ID、URL、标签、引用键和个人笔记。",
    },
    "Multilingual reading": {
      en: "Multilingual reading",
      fr: "Lecture multilingue",
      zh: "多语言阅读",
    },
    "The app interface and assistant prompts support English, Chinese, and French, useful for reading across lecture notes, papers, and seminar materials.": {
      en: "The app interface and assistant prompts support English, Chinese, and French, useful for reading across lecture notes, papers, and seminar materials.",
      fr: "L'interface et les prompts de l'assistant prennent en charge l'anglais, le chinois et le français, ce qui est utile pour lire des notes de cours, articles et supports de séminaire.",
      zh: "应用界面和助手提示词支持英语、中文和法语，适合跨语言阅读讲义、论文和研讨班材料。",
    },
    "Project Status": {
      en: "Project Status",
      fr: "État du projet",
      zh: "项目状态",
    },
    "MathReader is an evolving personal tool. The current public release is V2.2, and the project is especially aimed at students or researchers who read technical PDFs with many formulas.": {
      en: "MathReader is an evolving personal tool. The current public release is V2.2, and the project is especially aimed at students or researchers who read technical PDFs with many formulas.",
      fr: "MathReader est un outil personnel en évolution. La version publique actuelle est V2.2, et le projet vise surtout les étudiants ou chercheurs qui lisent des PDF techniques riches en formules.",
      zh: "MathReader 是一个持续演化的个人工具。当前公开版本是 V2.2，项目尤其面向需要阅读大量公式型技术 PDF 的学生和研究者。",
    },
    "View on GitHub": {
      en: "View on GitHub",
      fr: "Voir sur GitHub",
      zh: "在 GitHub 查看",
    },
    "Page Not Found": {
      en: "Page Not Found",
      fr: "Page introuvable",
      zh: "页面未找到",
    },
    "Looks like this path diverged unexpectedly — the page you're looking for doesn't exist or may have been moved.": {
      en: "Looks like this path diverged unexpectedly — the page you're looking for doesn't exist or may have been moved.",
      fr: "Il semble que ce chemin ait bifurqué de façon inattendue : la page recherchée n'existe pas ou a été déplacée.",
      zh: "看起来这条路径意外地偏离了：你要找的页面不存在，或已经被移动。",
    },
    "Back to Home": {
      en: "Back to Home",
      fr: "Retour à l'accueil",
      zh: "返回首页",
    },
    "M2 – Probabilités et Modèles Aléatoires": {
      en: "M2 - Probability and Random Models",
      fr: "M2 – Probabilités et Modèles Aléatoires",
      zh: "M2 - 概率与随机模型",
    },
    "M2 – Probabilités et Modèles Aléatoires (PMA)": {
      en: "M2 - Probability and Random Models (PMA)",
      fr: "M2 – Probabilités et Modèles Aléatoires (PMA)",
      zh: "M2 - 概率与随机模型（PMA）",
    },
    "Sorbonne Université · 2025–2026": {
      en: "Sorbonne Université · 2025–2026",
      fr: "Sorbonne Université · 2025–2026",
      zh: "索邦大学 · 2025–2026",
    },
    "Guide non officiel rédigé par un étudiant de la promotion 2025–2026 (Majeure Processus stochastiques)": {
      en: "Unofficial guide written by a student in the 2025–2026 cohort (Stochastic Processes track)",
      fr: "Guide non officiel rédigé par un étudiant de la promotion 2025–2026 (Majeure Processus stochastiques)",
      zh: "由 2025–2026 级学生撰写的非官方指南（随机过程方向）",
    },
    "Brochure 2025–2026": {
      en: "Brochure 2025–2026",
      fr: "Brochure 2025–2026",
      zh: "2025–2026 手册",
    },
    "Site officiel M2-PMA": {
      en: "Official M2-PMA website",
      fr: "Site officiel M2-PMA",
      zh: "M2-PMA 官方网站",
    },
    "Présentation du programme": {
      en: "Program overview",
      fr: "Présentation du programme",
      zh: "项目介绍",
    },
    "Candidature & Admission": {
      en: "Application & Admission",
      fr: "Candidature & Admission",
      zh: "申请与录取",
    },
    "Premier semestre": {
      en: "First semester",
      fr: "Premier semestre",
      zh: "第一学期",
    },
    "Deuxième semestre": {
      en: "Second semester",
      fr: "Deuxième semestre",
      zh: "第二学期",
    },
    "Ressources recommandées": {
      en: "Recommended resources",
      fr: "Ressources recommandées",
      zh: "推荐资源",
    },
    "Cours M1 recommandés (pour intégrer le M2-PMA)": {
      en: "Recommended M1 courses for entering M2-PMA",
      fr: "Cours M1 recommandés (pour intégrer le M2-PMA)",
      zh: "进入 M2-PMA 的推荐 M1 课程",
    },
    "★ Fortement recommandé": {
      en: "★ Strongly recommended",
      fr: "★ Fortement recommandé",
      zh: "★ 强烈推荐",
    },
    "✓ Recommandé": {
      en: "✓ Recommended",
      fr: "✓ Recommandé",
      zh: "✓ 推荐",
    },
    "− Optionnel": {
      en: "− Optional",
      fr: "− Optionnel",
      zh: "− 可选",
    },
    "★ Recommandé (parcours)": {
      en: "★ Recommended (track)",
      fr: "★ Recommandé (parcours)",
      zh: "★ 推荐（方向）",
    },
    "Semestre 1": {
      en: "Semester 1",
      fr: "Semestre 1",
      zh: "第一学期",
    },
    "Semestre 2": {
      en: "Semester 2",
      fr: "Semestre 2",
      zh: "第二学期",
    },
    "Mon parcours PMA (Majeure PS)": {
      en: "My PMA path (Stochastic Processes track)",
      fr: "Mon parcours PMA (Majeure PS)",
      zh: "我的 PMA 课程路径（随机过程方向）",
    },
    "Ressources & Informations": {
      en: "Resources & Information",
      fr: "Ressources & Informations",
      zh: "资源与信息",
    },
    "Doctorat (Thèse)": {
      en: "Doctorate (PhD)",
      fr: "Doctorat (Thèse)",
      zh: "博士（论文）",
    },
    "Validation S1 & Redoublement": {
      en: "Semester 1 validation & retake year",
      fr: "Validation S1 & Redoublement",
      zh: "第一学期通过与留级",
    },
    "Règles du Semestre 2": {
      en: "Semester 2 rules",
      fr: "Règles du Semestre 2",
      zh: "第二学期规则",
    },
    "Cours S2 2025–2026": {
      en: "S2 courses 2025–2026",
      fr: "Cours S2 2025–2026",
      zh: "2025–2026 第二学期课程",
    },
    "Validation du Master 2 et Modalités de Fin d'Année": {
      en: "Master 2 validation and end-of-year procedures",
      fr: "Validation du Master 2 et Modalités de Fin d'Année",
      zh: "M2 通过与学年末流程",
    },
    "Détails du cours": {
      en: "Course details",
      fr: "Détails du cours",
      zh: "课程详情",
    },
    "Professeur": {
      en: "Instructor",
      fr: "Professeur",
      zh: "授课教师",
    },
    "Crédits ECTS": {
      en: "ECTS credits",
      fr: "Crédits ECTS",
      zh: "ECTS 学分",
    },
    "Format": {
      en: "Format",
      fr: "Format",
      zh: "形式",
    },
    "Site web": {
      en: "Website",
      fr: "Site web",
      zh: "网站",
    },
    "Contenu du cours": {
      en: "Course content",
      fr: "Contenu du cours",
      zh: "课程内容",
    },
    "Ressources": {
      en: "Resources",
      fr: "Ressources",
      zh: "资源",
    },
    "Ressources du cours": {
      en: "Course resources",
      fr: "Ressources du cours",
      zh: "课程资源",
    },
    "Polycopié": {
      en: "Lecture notes",
      fr: "Polycopié",
      zh: "讲义",
    },
    "Polycopié & TDs": {
      en: "Lecture notes & exercises",
      fr: "Polycopié & TDs",
      zh: "讲义与习题课",
    },
    "Polycopié du cours": {
      en: "Course lecture notes",
      fr: "Polycopié du cours",
      zh: "课程讲义",
    },
    "TDs (énoncés)": {
      en: "Problem sheets",
      fr: "TDs (énoncés)",
      zh: "习题题目",
    },
    "Solutions des TDs": {
      en: "Problem sheet solutions",
      fr: "Solutions des TDs",
      zh: "习题解答",
    },
    "Site officiel du cours": {
      en: "Official course website",
      fr: "Site officiel du cours",
      zh: "课程官方网站",
    },
    "Accéder au site du cours": {
      en: "Open the course website",
      fr: "Accéder au site du cours",
      zh: "打开课程网站",
    },
    "Cours magistral + TD": {
      en: "Lecture + problem session",
      fr: "Cours magistral + TD",
      zh: "大课 + 习题课",
    },
    "Cours magistral + TDs": {
      en: "Lecture + problem sessions",
      fr: "Cours magistral + TDs",
      zh: "大课 + 习题课",
    },
    "Cours magistral (sans TD)": {
      en: "Lecture course (no problem sessions)",
      fr: "Cours magistral (sans TD)",
      zh: "大课（无习题课）",
    },
    "Tableau des cours et modalités d'évaluation": {
      en: "Course table and assessment methods",
      fr: "Tableau des cours et modalités d'évaluation",
      zh: "课程与考核方式表",
    },
    "Enseignant": {
      en: "Instructor",
      fr: "Enseignant",
      zh: "教师",
    },
    "Sujet du cours": {
      en: "Course topic",
      fr: "Sujet du cours",
      zh: "课程主题",
    },
    "Modalités d'évaluation": {
      en: "Assessment",
      fr: "Modalités d'évaluation",
      zh: "考核方式",
    },
    "Examen": {
      en: "Exam",
      fr: "Examen",
      zh: "考试",
    },
    "Examen écrit": {
      en: "Written exam",
      fr: "Examen écrit",
      zh: "笔试",
    },
    "Projet": {
      en: "Project",
      fr: "Projet",
      zh: "项目",
    },
    "Non précisé": {
      en: "Not specified",
      fr: "Non précisé",
      zh: "未说明",
    },
    "Projets personnels": {
      en: "Personal projects",
      fr: "Projets personnels",
      zh: "个人项目",
    },
    "Validation du 1er semestre": {
      en: "Semester 1 validation",
      fr: "Validation du 1er semestre",
      zh: "第一学期通过规则",
    },
    "Cas possibles": {
      en: "Possible cases",
      fr: "Cas possibles",
      zh: "可能情况",
    },
    "Points importants pour la validation du M2": {
      en: "Important points for validating the M2",
      fr: "Points importants pour la validation du M2",
      zh: "M2 通过的重要事项",
    },
    "Redoublement": {
      en: "Retaking the year",
      fr: "Redoublement",
      zh: "留级",
    },
    "Organisation des cours optionnels": {
      en: "Organization of optional courses",
      fr: "Organisation des cours optionnels",
      zh: "选修课安排",
    },
    "Validation du Semestre 2": {
      en: "Semester 2 validation",
      fr: "Validation du Semestre 2",
      zh: "第二学期通过规则",
    },
    "Prise en compte des notes": {
      en: "How grades are counted",
      fr: "Prise en compte des notes",
      zh: "成绩计算方式",
    },
    "Système de bonus": {
      en: "Bonus system",
      fr: "Système de bonus",
      zh: "加分机制",
    },
    "Mention du diplôme": {
      en: "Degree honors",
      fr: "Mention du diplôme",
      zh: "学位等级",
    },
    "Mémoire de M2": {
      en: "M2 thesis",
      fr: "Mémoire de M2",
      zh: "M2 论文",
    },
    "Stage de M2": {
      en: "M2 internship",
      fr: "Stage de M2",
      zh: "M2 实习",
    },
    "Conditions préalables": {
      en: "Prerequisites",
      fr: "Conditions préalables",
      zh: "前置条件",
    },
    "Un encadrant": {
      en: "An advisor",
      fr: "Un encadrant",
      zh: "一位导师",
    },
    "Un sujet de thèse": {
      en: "A thesis topic",
      fr: "Un sujet de thèse",
      zh: "一个博士课题",
    },
    "Un financement": {
      en: "Funding",
      fr: "Un financement",
      zh: "一份经费",
    },
    "Calendrier": {
      en: "Timeline",
      fr: "Calendrier",
      zh: "时间表",
    },
    "Nombre de bourses": {
      en: "Number of fellowships",
      fr: "Nombre de bourses",
      zh: "奖学金名额",
    },
    "Dossier de candidature": {
      en: "Application file",
      fr: "Dossier de candidature",
      zh: "申请材料",
    },
    "Guide de Validation et Fin d'Année": {
      en: "Validation and end-of-year guide",
      fr: "Guide de Validation et Fin d'Année",
      zh: "通过规则与学年末指南",
    },
    "Temperature T": {
      en: "Temperature T",
      fr: "Température T",
      zh: "温度 T",
    },
    "Box size L": {
      en: "Box size L",
      fr: "Taille de la boîte L",
      zh: "盒子大小 L",
    },
    "Sweeps / frame": {
      en: "Sweeps / frame",
      fr: "Balayages / image",
      zh: "每帧扫描次数",
    },
    "Sweeps / tick": {
      en: "Sweeps / tick",
      fr: "Balayages / pas",
      zh: "每步扫描次数",
    },
    "Pause": {
      en: "Pause",
      fr: "Pause",
      zh: "暂停",
    },
    "Run": {
      en: "Run",
      fr: "Lancer",
      zh: "运行",
    },
    "Reset": {
      en: "Reset",
      fr: "Réinitialiser",
      zh: "重置",
    },
    "Thermalize": {
      en: "Thermalize",
      fr: "Thermaliser",
      zh: "热化",
    },
    "Run Simulation": {
      en: "Run Simulation",
      fr: "Lancer la simulation",
      zh: "运行模拟",
    },
    "Size (N)": {
      en: "Size (N)",
      fr: "Taille (N)",
      zh: "大小 (N)",
    },
    "Prob (p)": {
      en: "Prob (p)",
      fr: "Proba (p)",
      zh: "概率 (p)",
    },
    "Ready": {
      en: "Ready",
      fr: "Prêt",
      zh: "就绪",
    },
    "Computing...": {
      en: "Computing...",
      fr: "Calcul...",
      zh: "计算中...",
    },
    "Done. Active clusters:": {
      en: "Done. Active clusters:",
      fr: "Terminé. Composantes actives :",
      zh: "完成。活跃簇数量：",
    },
    "+ phase": {
      en: "+ phase",
      fr: "phase +",
      zh: "+ 相",
    },
    "- phase": {
      en: "- phase",
      fr: "phase -",
      zh: "- 相",
    },
    "estimated interface": {
      en: "estimated interface",
      fr: "interface estimée",
      zh: "估计界面",
    },
    "low T, phase separated": {
      en: "low T, phase separated",
      fr: "basse T, phases séparées",
      zh: "低温，相分离",
    },
    "high T, disordered": {
      en: "high T, disordered",
      fr: "haute T, désordonné",
      zh: "高温，无序",
    },
    "+ boundary": {
      en: "+ boundary",
      fr: "bord +",
      zh: "+ 边界",
    },
    "- boundary": {
      en: "- boundary",
      fr: "bord -",
      zh: "- 边界",
    },
    "+ fixed": {
      en: "+ fixed",
      fr: "+ fixé",
      zh: "+ 固定",
    },
    "- fixed": {
      en: "- fixed",
      fr: "- fixé",
      zh: "- 固定",
    },
    "+ top": {
      en: "+ top",
      fr: "+ haut",
      zh: "+ 顶部",
    },
    "- bottom": {
      en: "- bottom",
      fr: "- bas",
      zh: "- 底部",
    },
    "+ top boundary": {
      en: "+ top boundary",
      fr: "bord supérieur +",
      zh: "+ 顶部边界",
    },
    "- bottom boundary": {
      en: "- bottom boundary",
      fr: "bord inférieur -",
      zh: "- 底部边界",
    },
    "+ fixed side": {
      en: "+ fixed side",
      fr: "côté fixé +",
      zh: "+ 固定侧面",
    },
    "- fixed side": {
      en: "- fixed side",
      fr: "côté fixé -",
      zh: "- 固定侧面",
    },
  };

  const HTML_TRANSLATIONS = {
    "home.about.p1": {
      en: 'I am currently completing my M2 internship at the <a href="https://lama-umr8050.fr/">LAMA</a> (<a href="https://www.u-pec.fr/">Université Paris-Est Créteil</a>), under the supervision of <a href="https://perso.math.u-pem.fr/leny.arnaud/" target="_blank">Arnaud LE NY</a>. My internship focuses on the long-range Ising model and related questions in probability and statistical mechanics. I am also a second year Master\'s (M2) student in Probability and Random Models (<a href="https://www.lpsm.paris/masters/modale/index">M2-PMA</a>), in the Stochastic Processes track, at <a href="https://www.sorbonne-universite.fr/">Sorbonne Université</a>.',
      fr: 'Je suis actuellement en stage de M2 au <a href="https://lama-umr8050.fr/">LAMA</a> (<a href="https://www.u-pec.fr/">Université Paris-Est Créteil</a>), sous la direction d\'<a href="https://perso.math.u-pem.fr/leny.arnaud/" target="_blank">Arnaud LE NY</a>. Ce stage porte sur le modèle d\'Ising à longue portée et des questions connexes en probabilité et en mécanique statistique. Je suis également étudiant en deuxième année de master (M2) Probabilités et Modèles Aléatoires (<a href="https://www.lpsm.paris/masters/modale/index">M2-PMA</a>), parcours processus stochastiques, à <a href="https://www.sorbonne-universite.fr/">Sorbonne Université</a>.',
      zh: '我目前在 <a href="https://lama-umr8050.fr/">LAMA</a>（<a href="https://www.u-pec.fr/">Université Paris-Est Créteil</a>）进行 M2 实习，由 <a href="https://perso.math.u-pem.fr/leny.arnaud/" target="_blank">Arnaud LE NY</a> 指导。实习主题围绕长程 Ising 模型，以及概率论与统计力学中的相关问题展开。同时，我也是 <a href="https://www.sorbonne-universite.fr/">Sorbonne Université</a> 概率与随机模型硕士二年级（<a href="https://www.lpsm.paris/masters/modale/index">M2-PMA</a>）学生，方向为随机过程。',
    },
    "home.about.p2": {
      en: 'I have been fortunate to work on several research projects, including the study of bi-Lipschitz equivalence of separated nets in Banach spaces with <a href="https://www.alexandroseskenazis.com/">Alexandros ESKENAZIS</a>, and collective motion modeling with <a href="https://sites.google.com/site/dianepeurichard/home">Diane PEURICHARD</a>.',
      fr: 'J\'ai eu la chance de travailler sur plusieurs projets de recherche, notamment l\'équivalence bi-lipschitzienne de réseaux séparés dans les espaces de Banach avec <a href="https://www.alexandroseskenazis.com/">Alexandros ESKENAZIS</a>, ainsi que la modélisation du mouvement collectif avec <a href="https://sites.google.com/site/dianepeurichard/home">Diane PEURICHARD</a>.',
      zh: '我很幸运参与过几个研究项目，包括与 <a href="https://www.alexandroseskenazis.com/">Alexandros ESKENAZIS</a> 研究 Banach 空间中分离网的双 Lipschitz 等价，以及与 <a href="https://sites.google.com/site/dianepeurichard/home">Diane PEURICHARD</a> 研究集体运动建模。',
    },
    "home.news.ising": {
      en: 'I’ll be working on the long-range Ising model with <a href="https://perso.math.u-pem.fr/leny.arnaud/" target="_blank">Arnaud LE NY</a> at Université Paris-Est Créteil (UPEC) as my M2 internship from April 20 to July 20, 2026.',
      fr: 'Je travaillerai sur le modèle d\'Ising à longue portée avec <a href="https://perso.math.u-pem.fr/leny.arnaud/" target="_blank">Arnaud LE NY</a> à l\'Université Paris-Est Créteil (UPEC) dans le cadre de mon stage de M2, du 20 avril au 20 juillet 2026.',
      zh: '我将在 2026 年 4 月 20 日至 7 月 20 日，于 Université Paris-Est Créteil (UPEC) 跟随 <a href="https://perso.math.u-pem.fr/leny.arnaud/" target="_blank">Arnaud LE NY</a> 做 M2 实习，研究长程 Ising 模型。',
    },
    "misc.percolation": {
      en: 'Interactive visualization of <em>Bond Percolation</em> on a 2D square lattice. In this model, <strong>p</strong> represents the probability of a bond (edge) being open. Unlike site percolation, nodes are only colored if they are connected to at least one open bond, preventing isolated colored nodes. Try varying <strong>p</strong> around the critical threshold (0.5) to observe the phase transition in connectivity.',
      fr: 'Visualisation interactive de la <em>percolation par arêtes</em> sur un réseau carré en dimension 2. Ici, <strong>p</strong> désigne la probabilité qu\'une arête soit ouverte. Contrairement à la percolation par sites, les sommets ne sont colorés que s\'ils sont reliés à au moins une arête ouverte. Faites varier <strong>p</strong> autour du seuil critique 0,5 pour observer la transition de connectivité.',
      zh: '二维方格上的<em>边渗流</em>交互可视化。在这个模型中，<strong>p</strong> 表示一条边处于开放状态的概率。不同于点渗流，只有连接到至少一条开放边的节点才会被着色，从而避免孤立彩色点。试着在临界阈值 0.5 附近改变 <strong>p</strong>，观察连通性的相变。',
    },
    "misc.ising2d": {
      en: 'Interactive simulation of the two-dimensional <em>Ising model</em> with <em>Dobrushin boundary conditions</em>: the upper part of the boundary is fixed to <strong>+1</strong> and the lower part to <strong>-1</strong>. Change the temperature <strong>T = 1 / beta</strong> to see how the random interface becomes sharper below the critical temperature and more disordered above it.',
      fr: 'Simulation interactive du <em>modèle d\'Ising</em> bidimensionnel avec <em>conditions au bord de Dobrushin</em> : la partie supérieure du bord est fixée à <strong>+1</strong> et la partie inférieure à <strong>-1</strong>. Modifiez la température <strong>T = 1 / beta</strong> pour voir l\'interface devenir plus nette sous la température critique et plus désordonnée au-dessus.',
      zh: '二维 <em>Ising 模型</em>在 <em>Dobrushin 边界条件</em>下的交互模拟：边界上半部分固定为 <strong>+1</strong>，下半部分固定为 <strong>-1</strong>。改变温度 <strong>T = 1 / beta</strong>，可以看到随机界面在临界温度以下更清晰，在临界温度以上更无序。',
    },
    "misc.ising3d": {
      en: 'A true three-dimensional <em>L &times; L &times; L</em> Ising box with <em>Dobrushin boundary conditions</em>. The translucent red and blue shell shows the fixed boundary phases on the cubic box, while the yellow surface tracks the estimated two-dimensional random interface inside the volume. Change <strong>T = 1 / beta</strong> and rotate the box to inspect how the interface roughens.',
      fr: 'Une véritable boîte d\'Ising tridimensionnelle <em>L &times; L &times; L</em> avec <em>conditions au bord de Dobrushin</em>. L\'enveloppe rouge et bleue translucide indique les phases fixées sur le cube, tandis que la surface jaune suit l\'interface aléatoire bidimensionnelle estimée à l\'intérieur du volume. Modifiez <strong>T = 1 / beta</strong> et faites tourner la boîte pour observer la rugosité de l\'interface.',
      zh: '一个真正的三维 <em>L &times; L &times; L</em> Ising 盒子，带 <em>Dobrushin 边界条件</em>。半透明的红蓝外壳表示立方体边界上的固定相，黄色曲面追踪体内部估计出的二维随机界面。改变 <strong>T = 1 / beta</strong> 并旋转盒子，可以观察界面如何变粗糙。',
    },
    "misc.collective": {
      en: 'Visualization results from my L3 internship on <em>collective motion in the presence of predators</em>. The left animation shows the dynamics of a flock of 50 green agents when a single red predator is introduced, while the right one shows the same system with three predators. I mainly focused on the modeling and analysis of such predator–prey interactions with Python code in my report.',
      fr: 'Résultats de visualisation issus de mon stage de L3 sur le <em>mouvement collectif en présence de prédateurs</em>. L\'animation de gauche montre la dynamique d\'un groupe de 50 agents verts avec un prédateur rouge, tandis que celle de droite montre le même système avec trois prédateurs. Mon rapport portait surtout sur la modélisation et l\'analyse de ces interactions proie-prédateur en Python.',
      zh: '这是我本科三年级关于<em>带捕食者集体运动</em>实习中的可视化结果。左图展示了 50 个绿色个体在加入一个红色捕食者后的动力学，右图展示了同一系统中有三个捕食者时的情况。我的报告主要用 Python 对这类捕食者-猎物相互作用进行建模与分析。',
    },
    "misc.nbody": {
      en: 'Result from my L3 physics internship on celestial mechanics. We studied the classical <em>N-body model</em> in astrophysics and plotted the trajectories of the Moon and an Earth-orbiting satellite relative to the Earth. The black dot represents the Earth, the blue curve corresponds to the actual satellite trajectory, and the red curve represents the actual Moon trajectory (real data obtained from NASA). Using the 3-body model, we simulated the green trajectory for the satellite and the yellow trajectory for the Moon.',
      fr: 'Résultat de mon stage de L3 en physique sur la mécanique céleste. Nous avons étudié le <em>modèle classique à N corps</em> en astrophysique et tracé les trajectoires de la Lune et d\'un satellite en orbite terrestre par rapport à la Terre. Le point noir représente la Terre, la courbe bleue la trajectoire réelle du satellite, et la courbe rouge la trajectoire réelle de la Lune (données NASA). Avec le modèle à trois corps, nous avons simulé la trajectoire verte du satellite et la trajectoire jaune de la Lune.',
      zh: '这是我本科三年级物理实习中关于天体力学的结果。我们研究了天体物理中的经典 <em>N 体模型</em>，并绘制了月球和绕地卫星相对于地球的轨迹。黑点表示地球，蓝色曲线是真实卫星轨迹，红色曲线是真实月球轨迹（数据来自 NASA）。利用三体模型，我们模拟了卫星的绿色轨迹和月球的黄色轨迹。',
    },
  };

  let currentLanguage = "en";
  let textNodes = [];
  let initialized = false;

  function normalizeLanguage(language) {
    const value = String(language || "").toLowerCase();
    if (value.startsWith("zh")) return "zh";
    if (value.startsWith("fr")) return "fr";
    if (value.startsWith("en")) return "en";

    const defaultLanguage = String(document.documentElement.dataset.defaultLang || document.documentElement.lang || "en").toLowerCase();
    if (defaultLanguage.startsWith("zh")) return "zh";
    if (defaultLanguage.startsWith("fr")) return "fr";
    return "en";
  }

  function normalizeText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function storageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      // Ignore storage errors in restricted browsing contexts.
    }
  }

  function translateKey(key, language, fallback) {
    const entry = KEYED_TRANSLATIONS[key] || HTML_TRANSLATIONS[key];
    if (!entry) return fallback || "";
    return entry[language] || entry.en || entry.fr || entry.zh || fallback || "";
  }

  function translateSource(source, language) {
    const normalized = normalizeText(source);
    const entry = TEXT_TRANSLATIONS[normalized];
    if (!entry) return source;
    return entry[language] || entry.en || entry.fr || entry.zh || source;
  }

  function getInitialLanguage() {
    const params = new URLSearchParams(window.location.search);
    const queryLanguage = params.get("lang");
    if (queryLanguage && SUPPORTED_LANGUAGES.includes(normalizeLanguage(queryLanguage))) {
      const normalized = normalizeLanguage(queryLanguage);
      storageSet(STORAGE_KEY, normalized);
      return normalized;
    }

    const stored = storageGet(STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.includes(normalizeLanguage(stored))) {
      return normalizeLanguage(stored);
    }

    return normalizeLanguage(document.documentElement.dataset.defaultLang || document.documentElement.lang || "en");
  }

  function isSkippableTextNode(node) {
    const parent = node.parentElement;
    if (!parent) return true;
    return Boolean(parent.closest(
      "script, style, noscript, iframe, canvas, svg, code, pre, textarea, input, select, option, [data-i18n], [data-i18n-html]"
    ));
  }

  function collectTextNodes() {
    textNodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!normalizeText(node.textContent)) return NodeFilter.FILTER_REJECT;
        if (isSkippableTextNode(node)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let node = walker.nextNode();
    while (node) {
      node.__siteI18nOriginalText = node.textContent;
      node.__siteI18nOriginalKey = normalizeText(node.textContent);
      textNodes.push(node);
      node = walker.nextNode();
    }
  }

  function renderKeyedElements(language) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      if (!element.__siteI18nOriginalText) {
        element.__siteI18nOriginalText = element.textContent;
      }
      const translated = translateKey(element.dataset.i18n, language, element.__siteI18nOriginalText);
      element.textContent = translated;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      if (!element.__siteI18nOriginalHTML) {
        element.__siteI18nOriginalHTML = element.innerHTML;
      }
      const translated = translateKey(element.dataset.i18nHtml, language, element.__siteI18nOriginalHTML);
      element.innerHTML = translated;
    });

    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const translated = translateKey(element.dataset.i18nTitle, language, element.getAttribute("title") || "");
      element.setAttribute("title", translated);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const translated = translateKey(element.dataset.i18nAriaLabel, language, element.getAttribute("aria-label") || "");
      element.setAttribute("aria-label", translated);
    });
  }

  function renderTextNodes(language) {
    textNodes.forEach((node) => {
      if (!node.isConnected) return;
      if (isSkippableTextNode(node)) return;

      const source = node.__siteI18nOriginalText || node.textContent;
      const translated = translateSource(source, language);
      const leading = String(source).match(/^\s*/)[0];
      const trailing = String(source).match(/\s*$/)[0];
      node.textContent = leading + normalizeText(translated) + trailing;
    });
  }

  function renderDocumentTitle(language) {
    if (!document.__siteI18nOriginalTitle) {
      document.__siteI18nOriginalTitle = document.title;
    }
    document.title = normalizeText(translateSource(document.__siteI18nOriginalTitle, language));
  }

  function renderSwitcher(language) {
    document.querySelectorAll("[data-language-switcher]").forEach((switcher) => {
      switcher.setAttribute("aria-label", translateKey("language.selector", language, "Language selector"));
    });

    document.querySelectorAll("[data-lang-option]").forEach((button) => {
      const targetLanguage = normalizeLanguage(button.dataset.langOption);
      button.hidden = targetLanguage === language;
      button.setAttribute("aria-hidden", targetLanguage === language ? "true" : "false");
      button.setAttribute("aria-label", translateKey(`language.switch.${targetLanguage}`, language, ""));
      button.setAttribute("title", translateKey(`language.switch.${targetLanguage}`, language, ""));
    });
  }

  function broadcastLanguage(language) {
    document.querySelectorAll("iframe").forEach((iframe) => {
      try {
        iframe.contentWindow.postMessage({ type: "site-language-change", language }, window.location.origin);
      } catch (error) {
        // Cross-origin frames cannot be notified; same-origin frames will still read localStorage on load.
      }
    });
  }

  function dispatchLanguageEvent(name, detail) {
    let event;
    if (typeof window.CustomEvent === "function") {
      event = new window.CustomEvent(name, { detail });
    } else {
      event = document.createEvent("CustomEvent");
      event.initCustomEvent(name, false, false, detail);
    }
    window.dispatchEvent(event);
  }

  function applyLanguage(language, options = {}) {
    const normalized = normalizeLanguage(language);
    currentLanguage = normalized;
    document.documentElement.lang = HTML_LANG[normalized];
    document.documentElement.dataset.language = normalized;

    renderKeyedElements(normalized);
    renderTextNodes(normalized);
    renderDocumentTitle(normalized);
    renderSwitcher(normalized);

    if (options.persist !== false) {
      storageSet(STORAGE_KEY, normalized);
    }
    if (options.broadcast !== false) {
      broadcastLanguage(normalized);
    }

    dispatchLanguageEvent("site-language-change", { language: normalized });
  }

  function setupSwitcher() {
    document.querySelectorAll("[data-lang-option]").forEach((button) => {
      button.addEventListener("click", () => {
        applyLanguage(button.dataset.langOption);
      });
    });

    document.addEventListener("click", (event) => {
      const button = event.target.closest && event.target.closest("[data-lang-option]");
      if (!button) return;
      event.preventDefault();
      applyLanguage(button.dataset.langOption);
    });
  }

  function init() {
    if (initialized || !document.body) return;
    initialized = true;
    setupSwitcher();
    collectTextNodes();
    applyLanguage(getInitialLanguage(), { persist: false });
  }

  window.SiteI18n = {
    applyLanguage,
    getLanguage() {
      return currentLanguage;
    },
    text(source, language) {
      return translateSource(source, normalizeLanguage(language || currentLanguage));
    },
    key(key, language, fallback) {
      return translateKey(key, normalizeLanguage(language || currentLanguage), fallback);
    },
  };

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      applyLanguage(event.newValue, { persist: false, broadcast: false });
    }
  });

  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin) return;
    if (!event.data || event.data.type !== "site-language-change") return;
    applyLanguage(event.data.language, { persist: false, broadcast: false });
  });

  window.addEventListener("site-language-request", (event) => {
    if (!event.detail || !event.detail.language) return;
    applyLanguage(event.detail.language);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
