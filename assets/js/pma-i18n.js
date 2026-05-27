(function () {
  const TRANSLATIONS = {
    "Doctorat (Thèse) – Synthèse du processus de candidature": {
      en: "Doctorate (PhD) - Application Process Summary",
      zh: "博士申请流程概要",
    },
    "Validation du 1er semestre et Redoublement – M2": {
      en: "Semester 1 Validation and Retaking the M2 Year",
      zh: "第一学期通过规则与 M2 留级",
    },
    "Règles du Semestre 2 : Mémoire et Stage (M2)": {
      en: "Semester 2 Rules: Thesis and Internship (M2)",
      zh: "第二学期规则：论文与实习（M2）",
    },
    "Cours et Modalités d'Évaluation du S2 2025–2026": {
      en: "S2 Courses and Assessment Methods 2025-2026",
      zh: "2025-2026 第二学期课程与考核方式",
    },
    "Validation du Master 2 et Modalités de Fin d'Année": {
      en: "Master 2 Validation and End-of-Year Procedures",
      zh: "M2 通过规则与学年末流程",
    },
    "M2-PMA · Informations pratiques": {
      en: "M2-PMA · Practical information",
      zh: "M2-PMA · 实用信息",
    },
    "M2-PMA · Règles administratives": {
      en: "M2-PMA · Administrative rules",
      zh: "M2-PMA · 行政规则",
    },
    "M2-PMA · Semestre 2 · 2025–2026": {
      en: "M2-PMA · Semester 2 · 2025-2026",
      zh: "M2-PMA · 第二学期 · 2025-2026",
    },
    "M2-PMA · Fin d'année · 2025–2026": {
      en: "M2-PMA · End of year · 2025-2026",
      zh: "M2-PMA · 学年末 · 2025-2026",
    },
    "M2-PMA · Semestre 1 · 6 ECTS": {
      en: "M2-PMA · Semester 1 · 6 ECTS",
      zh: "M2-PMA · 第一学期 · 6 ECTS",
    },
    "M2-PMA · Semestre 1 · 9 ECTS": {
      en: "M2-PMA · Semester 1 · 9 ECTS",
      zh: "M2-PMA · 第一学期 · 9 ECTS",
    },
    "Sorbonne Université · 2025–2026": {
      en: "Sorbonne Université · 2025-2026",
      zh: "索邦大学 · 2025-2026",
    },
    "M2 – Probabilités et Modèles Aléatoires": {
      en: "M2 - Probability and Random Models",
      zh: "M2 - 概率与随机模型",
    },
    "Guide non officiel rédigé par un étudiant de la promotion 2025–2026 (Majeure Processus stochastiques)": {
      en: "Unofficial guide written by a student in the 2025-2026 cohort (Stochastic Processes track)",
      zh: "由 2025-2026 级学生撰写的非官方指南（随机过程方向）",
    },
    "Brochure 2025–2026": {
      en: "Brochure 2025-2026",
      zh: "2025-2026 手册",
    },
    "Site officiel M2-PMA": {
      en: "Official M2-PMA website",
      zh: "M2-PMA 官方网站",
    },
    "Présentation du programme": {
      en: "Program overview",
      zh: "项目介绍",
    },
    "Le M2-PMA est fondamentalement l'un des programmes de Master 2 les plus solides en Île-de-France pour les probabilités pures ou les processus stochastiques (l'autre étant le M2 Mathématiques de l'aléatoire de l'Université Paris-Saclay ; et la nouvelle force montante du M2 MATH de Paris Dauphine-PSL). Ce M2 contient trois majeures : Processus stochastiques, Probabilités appliquées et EDProba.": {
      en: "M2-PMA is fundamentally one of the strongest Master 2 programs in Île-de-France for pure probability and stochastic processes, alongside the M2 Mathematics of Randomness at Université Paris-Saclay and the rising M2 MATH at Paris Dauphine-PSL. The program has three tracks: Stochastic Processes, Applied Probability, and EDProba.",
      zh: "M2-PMA 基本上是法兰西岛地区纯概率与随机过程方向最强的 Master 2 项目之一；另一个是巴黎萨克雷大学的 M2 Mathématiques de l'aléatoire，而巴黎九大 Dauphine-PSL 的 M2 MATH 也正在迅速崛起。这个 M2 包含三个方向：随机过程、应用概率和 EDProba。",
    },
    "Le M2-PMA admet environ 20 à 30 étudiants chaque année, y compris des normaliens de l'ENS-PSL, des ingénieurs de l'École polytechnique, et de très bons étudiants internationaux. La plupart choisissent la Majeure Processus Stochastiques — environ 20 personnes.": {
      en: "M2-PMA admits about 20 to 30 students each year, including ENS-PSL students, École polytechnique engineers, and very strong international students. Most choose the Stochastic Processes track, about 20 people.",
      zh: "M2-PMA 每年大约录取 20 到 30 名学生，其中包括 ENS-PSL 的学生、巴黎综合理工学院工程师，以及非常优秀的国际学生。大多数人选择随机过程方向，大约 20 人。",
    },
    "À partir de 2025–2026, une nouvelle majeure EDProba (EDP + Probabilités) est proposée conjointement avec le M2 Modélisation du LJLL. Si vous êtes inscrit en Modélisation, vous recevrez le diplôme Modélisation plutôt que le diplôme PMA.": {
      en: "Starting in 2025-2026, a new EDProba track (PDE + Probability) is offered jointly with the LJLL M2 Modeling program. If you are enrolled in Modeling, you receive the Modeling diploma rather than the PMA diploma.",
      zh: "从 2025-2026 年起，新的 EDProba 方向（偏微分方程 + 概率）与 LJLL 的 M2 Modélisation 联合开设。如果你注册在 Modélisation 项目中，最终获得的是 Modélisation 文凭，而不是 PMA 文凭。",
    },
    "Candidature & Admission": {
      en: "Application & Admission",
      zh: "申请与录取",
    },
    "J'ai été admis au M2-PMA après un M1 Mathématiques et Applications à Sorbonne Université via eCandidat. Mes cours de M1 étaient :": {
      en: "I was admitted to M2-PMA after completing M1 Mathematics and Applications at Sorbonne Université through eCandidat. My M1 courses were:",
      zh: "我是在索邦大学完成 M1 Mathématiques et Applications 后，通过 eCandidat 被 M2-PMA 录取的。我的 M1 课程包括：",
    },
    "Premier semestre": {
      en: "First semester",
      zh: "第一学期",
    },
    "Deuxième semestre": {
      en: "Second semester",
      zh: "第二学期",
    },
    "Probabilités Approfondies": {
      en: "Advanced Probability",
      zh: "高等概率",
    },
    "Statistiques": {
      en: "Statistics",
      zh: "统计",
    },
    "Analyse Fonctionnelle Approfondie & CV": {
      en: "Advanced Functional Analysis & CV",
      zh: "高等泛函分析与 CV",
    },
    "Introduction au Calcul Stochastique": {
      en: "Introduction to Stochastic Calculus",
      zh: "随机积分导论",
    },
    "Mémoire de M1": {
      en: "M1 thesis",
      zh: "M1 论文",
    },
    "L'admission accorde la plus grande importance aux notes de Probabilités Approfondies (avec Thierry LÉVY). Toute note supérieure à 14/20 est très compétitive. Ce cours est le prérequis essentiel : espérance conditionnelle, martingales, convergence des martingales, chaînes de Markov.": {
      en: "Admission gives the greatest importance to grades in Advanced Probability with Thierry LÉVY. Any grade above 14/20 is very competitive. This course is the essential prerequisite: conditional expectation, martingales, martingale convergence, and Markov chains.",
      zh: "录取时最看重的是 Thierry LÉVY 的高等概率课程成绩。任何高于 14/20 的成绩都非常有竞争力。这门课是核心先修课：条件期望、鞅、鞅收敛、马尔可夫链。",
    },
    "À partir de 2025–2026, le programme M1 a été réformé. L'ancienne UE \"Probabilités approfondies\" a été scindée en Probabilités approfondies (UM4MA311) et une partie de Martingales et contrôle stochastique (UM4MA280).": {
      en: "Starting in 2025-2026, the M1 program was reformed. The former Advanced Probability course unit was split into Advanced Probability (UM4MA311) and part of Martingales and Stochastic Control (UM4MA280).",
      zh: "从 2025-2026 年起，M1 项目进行了改革。原来的“高等概率”课程被拆分为“高等概率”（UM4MA311）以及“鞅与随机控制”（UM4MA280）的一部分。",
    },
    "Ressources recommandées": {
      en: "Recommended resources",
      zh: "推荐资源",
    },
    "Cours M1 recommandés (pour intégrer le M2-PMA)": {
      en: "Recommended M1 courses for entering M2-PMA",
      zh: "进入 M2-PMA 的推荐 M1 课程",
    },
    "★ Fortement recommandé": {
      en: "★ Strongly recommended",
      zh: "★ 强烈推荐",
    },
    "✓ Recommandé": {
      en: "✓ Recommended",
      zh: "✓ 推荐",
    },
    "− Optionnel": {
      en: "- Optional",
      zh: "- 可选",
    },
    "★ Recommandé (parcours)": {
      en: "★ Recommended (track)",
      zh: "★ 推荐（方向）",
    },
    "★ Recommandé (proba app)": {
      en: "★ Recommended (applied probability)",
      zh: "★ 推荐（应用概率）",
    },
    "★ Recommandé (EDProba)": {
      en: "★ Recommended (EDProba)",
      zh: "★ 推荐（EDProba）",
    },
    "Semestre 1": {
      en: "Semester 1",
      zh: "第一学期",
    },
    "Semestre 2": {
      en: "Semester 2",
      zh: "第二学期",
    },
    "Probabilités approfondies": {
      en: "Advanced probability",
      zh: "高等概率",
    },
    "Bases d'analyse fonctionnelle": {
      en: "Foundations of functional analysis",
      zh: "泛函分析基础",
    },
    "Statistique": {
      en: "Statistics",
      zh: "统计",
    },
    "Analyse complexe avancée": {
      en: "Advanced complex analysis",
      zh: "高等复分析",
    },
    "Martingales et contrôle stochastique": {
      en: "Martingales and stochastic control",
      zh: "鞅与随机控制",
    },
    "Processus de sauts": {
      en: "Jump processes",
      zh: "跳过程",
    },
    "Modèles stochastiques pour la finance": {
      en: "Stochastic models for finance",
      zh: "金融随机模型",
    },
    "Probabilités numériques": {
      en: "Numerical probability",
      zh: "数值概率",
    },
    "Méthodes classiques pour les EDP, modélisation": {
      en: "Classical methods for PDEs and modeling",
      zh: "偏微分方程与建模的经典方法",
    },
    "Analyse fonctionnelle approfondie, CV": {
      en: "Advanced functional analysis, CV",
      zh: "高等泛函分析，CV",
    },
    "Modèles mathématiques en neurosciences": {
      en: "Mathematical models in neuroscience",
      zh: "神经科学中的数学模型",
    },
    "Il faut remplir les conditions requises (Règle ABCD) pour pouvoir choisir les cours.": {
      en: "You must satisfy the required conditions (ABCD rule) in order to choose the courses.",
      zh: "必须满足相应条件（ABCD 规则）才能选择这些课程。",
    },
    "Mon parcours PMA (Majeure PS)": {
      en: "My PMA path (Stochastic Processes track)",
      zh: "我的 PMA 课程路径（随机过程方向）",
    },
    "4 UEs · 30 ECTS": {
      en: "4 course units · 30 ECTS",
      zh: "4 门课 · 30 ECTS",
    },
    "6 cours optionnels": {
      en: "6 optional courses",
      zh: "6 门选修课",
    },
    "9 ECTS · Majeure PS": {
      en: "9 ECTS · Stochastic Processes track",
      zh: "9 ECTS · 随机过程方向",
    },
    "9 ECTS · Nuages Poissonniens": {
      en: "9 ECTS · Poisson point clouds",
      zh: "9 ECTS · 泊松点云",
    },
    "Chaînes et Processus de Markov (Markov I)": {
      en: "Markov chains and processes (Markov I)",
      zh: "马尔可夫链与过程（Markov I）",
    },
    "Markov I": {
      en: "Markov I",
      zh: "Markov I",
    },
    "Markov I : Chaînes de Markov, Processus de Markov et Nuages Poissonniens": {
      en: "Markov I: Markov chains, Markov processes, and Poisson point clouds",
      zh: "Markov I：马尔可夫链、马尔可夫过程与泊松点云",
    },
    "Convergence des Mesures, Grandes Déviations, Percolation": {
      en: "Convergence of measures, large deviations, and percolation",
      zh: "测度收敛、大偏差与渗流",
    },
    "Convergence des Mesures, Grandes Déviations, Percolation (CGP)": {
      en: "Convergence of measures, large deviations, and percolation (CGP)",
      zh: "测度收敛、大偏差与渗流（CGP）",
    },
    "Markov II — Nuages, Lévy, Excursions": {
      en: "Markov II - Poisson point clouds, Lévy processes, and excursions",
      zh: "Markov II：泊松点云、Lévy 过程与游程",
    },
    "Markov II": {
      en: "Markov II",
      zh: "Markov II",
    },
    "Markov II : Nuages Poissonniens, Processus de Lévy et Excursions": {
      en: "Markov II: Poisson point clouds, Lévy processes, and excursions",
      zh: "Markov II：泊松点云、Lévy 过程与游程",
    },
    "Determinantal processes, random matrices and hyperuniformity": {
      en: "Determinantal processes, random matrices, and hyperuniformity",
      zh: "行列式点过程、随机矩阵与超均匀性",
    },
    "Invariance conforme en mécanique statistique": {
      en: "Conformal invariance in statistical mechanics",
      zh: "统计力学中的共形不变性",
    },
    "Modèles probabilistes pour les neurosciences": {
      en: "Probabilistic models for neuroscience",
      zh: "神经科学中的概率模型",
    },
    "Integrable probability and the KPZ universality class": {
      en: "Integrable probability and the KPZ universality class",
      zh: "可积概率与 KPZ 普适类",
    },
    "Ising model": {
      en: "Ising model",
      zh: "Ising 模型",
    },
    "rapport": {
      en: "report",
      zh: "报告",
    },
    "diapo": {
      en: "slides",
      zh: "幻灯片",
    },
    "Ressources & Informations": {
      en: "Resources & Information",
      zh: "资源与信息",
    },
    "Validation S1 & Redoublement": {
      en: "S1 validation & retaking the year",
      zh: "第一学期通过与留级",
    },
    "Synthèse du processus de candidature à l'ED 386": {
      en: "Summary of the ED 386 application process",
      zh: "ED 386 申请流程概要",
    },
    "Règles de compensation et ajournement au 1er semestre": {
      en: "Compensation and failure rules for the first semester",
      zh: "第一学期补偿与未通过规则",
    },
    "Règles du Semestre 2": {
      en: "Semester 2 rules",
      zh: "第二学期规则",
    },
    "Mémoire, stage, bonus de cours et mentions": {
      en: "Thesis, internship, course bonuses, and honors",
      zh: "论文、实习、课程加分与学位等级",
    },
    "Cours S2 2025–2026": {
      en: "S2 courses 2025-2026",
      zh: "2025-2026 第二学期课程",
    },
    "Tableau des cours et modalités d'évaluation": {
      en: "Course table and assessment methods",
      zh: "课程与考核方式表",
    },
    "Récapitulatif des procédures administratives, des 3 situations de validation au 30 septembre et des modalités de soutenance.": {
      en: "Summary of administrative procedures, the 3 validation situations on September 30, and defense procedures.",
      zh: "行政流程、9 月 30 日的三种通过状态以及答辩安排总览。",
    },

    "Doctorat (Thèse)": {
      en: "Doctorate (PhD)",
      zh: "博士（论文）",
    },
    "Synthèse du processus de candidature — Mathématiques, École Doctorale ED 386 (Paris Centre)": {
      en: "Summary of the application process - Mathematics, Doctoral School ED 386 (Paris Centre)",
      zh: "申请流程概要：数学，ED 386 博士学院（巴黎中心）",
    },
    "Conditions préalables": {
      en: "Prerequisites",
      zh: "前置条件",
    },
    "Être titulaire d'un Master 2 (M2) au plus tard en 2026": {
      en: "Hold a Master 2 (M2) degree no later than 2026",
      zh: "最迟在 2026 年取得 Master 2（M2）学位",
    },
    "Un encadrant": {
      en: "An advisor",
      zh: "一位导师",
    },
    "Un sujet de thèse": {
      en: "A thesis topic",
      zh: "一个博士课题",
    },
    "Un financement": {
      en: "Funding",
      zh: "一份经费",
    },
    "Anticiper dès le mémoire ou le stage de M2": {
      en: "Plan ahead from the M2 thesis or internship",
      zh: "从 M2 论文或实习阶段就提前规划",
    },
    "Si vous envisagez une thèse, il est essentiel de vous renseigner dès le choix du mémoire ou du stage de M2, en discutant directement avec votre encadrant :": {
      en: "If you are considering a PhD, it is essential to ask about this as soon as you choose your M2 thesis or internship, by discussing directly with your advisor:",
      zh: "如果你考虑读博，那么在选择 M2 论文或实习时就应该主动了解相关可能性，并直接和导师讨论：",
    },
    "Le sujet de mémoire/stage peut-il déboucher sur un sujet de thèse ?": {
      en: "Can the thesis or internship topic lead to a PhD topic?",
      zh: "论文或实习题目是否可能延伸为博士课题？",
    },
    "L'encadrant dispose-t-il d'un financement de projet (ANR, ERC, etc.) incluant une bourse de thèse ?": {
      en: "Does the advisor have project funding (ANR, ERC, etc.) that includes a PhD fellowship?",
      zh: "导师是否有项目经费（ANR、ERC 等），其中包含博士奖学金？",
    },
    "Existe-t-il des bourses thématiques spécifiques auxquelles postuler ?": {
      en: "Are there specific thematic fellowships you can apply for?",
      zh: "是否有可以申请的特定主题博士奖学金？",
    },
    "Une candidature en doctorat suppose une démarche proactive dans la recherche. Commencez à y penser bien avant la fin du M2.": {
      en: "A PhD application requires a proactive research-oriented approach. Start thinking about it well before the end of the M2 year.",
      zh: "博士申请需要在科研上主动推进。请在 M2 结束前很早就开始考虑。",
    },
    "Candidature via l'École Doctorale (dernier recours)": {
      en: "Application through the Doctoral School (last resort)",
      zh: "通过博士学院申请（最后方案）",
    },
    "École Doctorale ED 386 – Paris Centre": {
      en: "Doctoral School ED 386 - Paris Centre",
      zh: "ED 386 博士学院 - 巴黎中心",
    },
    "Universités : Sorbonne Université, Université Paris Diderot, Université Paris Descartes": {
      en: "Universities: Sorbonne Université, Université Paris Diderot, Université Paris Descartes",
      zh: "大学：索邦大学、巴黎狄德罗大学、巴黎笛卡尔大学",
    },
    "Laboratoires : LJLL, LPSM, MAP5, IMJ, etc.": {
      en: "Laboratories: LJLL, LPSM, MAP5, IMJ, etc.",
      zh: "实验室：LJLL、LPSM、MAP5、IMJ 等",
    },
    "Président de l'ED : Idris KHARROUBI": {
      en: "Head of the doctoral school: Idris KHARROUBI",
      zh: "博士学院负责人：Idris KHARROUBI",
    },
    "Secrétariat : Jean-François VENUTTI": {
      en: "Administration: Jean-François VENUTTI",
      zh: "秘书处：Jean-François VENUTTI",
    },
    "Site web : ed386.sorbonne-universite.fr": {
      en: "Website: ed386.sorbonne-universite.fr",
      zh: "网站：ed386.sorbonne-universite.fr",
    },
    "Calendrier": {
      en: "Timeline",
      zh: "时间表",
    },
    "Mai": {
      en: "May",
      zh: "五月",
    },
    "Mi-juin": {
      en: "Mid-June",
      zh: "六月中旬",
    },
    "Juin": {
      en: "June",
      zh: "六月",
    },
    "Juillet": {
      en: "July",
      zh: "七月",
    },
    "Ouverture de l'appel à candidatures": {
      en: "Opening of the call for applications",
      zh: "开放申请",
    },
    "Date limite de dépôt des dossiers": {
      en: "Application submission deadline",
      zh: "材料提交截止日期",
    },
    "Classement interne des laboratoires (ex. LPSM)": {
      en: "Internal ranking by laboratories (e.g. LPSM)",
      zh: "实验室内部排序（例如 LPSM）",
    },
    "Commission et classement final de l'ED": {
      en: "Committee meeting and final ranking by the doctoral school",
      zh: "博士学院委员会与最终排序",
    },
    "Nombre de bourses": {
      en: "Number of fellowships",
      zh: "奖学金名额",
    },
    "L'ED 386 attribue chaque année entre 22 et 26 bourses de thèse pour l'ensemble des laboratoires :": {
      en: "ED 386 awards between 22 and 26 PhD fellowships each year across all laboratories:",
      zh: "ED 386 每年为所有实验室分配约 22 到 26 个博士奖学金名额：",
    },
    "Environ la moitié pour Paris 6": {
      en: "About half for Paris 6",
      zh: "大约一半给 Paris 6",
    },
    "L'autre moitié pour Paris 7": {
      en: "The other half for Paris 7",
      zh: "另一半给 Paris 7",
    },
    "En général une bourse pour Paris 5": {
      en: "Usually one fellowship for Paris 5",
      zh: "通常有一个名额给 Paris 5",
    },
    "Dossier de candidature": {
      en: "Application file",
      zh: "申请材料",
    },
    "Un encadrant membre de l'ED 386 s'engageant à diriger la thèse (co-encadrement possible si l'un est membre de l'ED)": {
      en: "An advisor who is a member of ED 386 and agrees to supervise the thesis (co-supervision is possible if one advisor is a member of the doctoral school)",
      zh: "一位 ED 386 成员导师承诺指导博士论文（若其中一位导师是博士学院成员，也可以联合指导）",
    },
    "Un projet de thèse cohérent": {
      en: "A coherent PhD project",
      zh: "一个连贯的博士课题计划",
    },
    "Les relevés de notes": {
      en: "Transcripts",
      zh: "成绩单",
    },
    "Si le mémoire n'est pas terminé : une attestation de l'encadrant indiquant qu'il est en cours de finalisation": {
      en: "If the thesis is not finished: a statement from the advisor indicating that it is being finalized",
      zh: "如果论文尚未完成：导师需出具证明，说明论文正在收尾",
    },
    "Il est très important de transmettre une copie du dossier au responsable du M2 afin qu'il puisse défendre la candidature lors des réunions de sélection.": {
      en: "It is very important to send a copy of the file to the M2 director so that they can support the application during selection meetings.",
      zh: "非常重要：请把申请材料副本发给 M2 负责人，以便他/她在遴选会议上为你的申请辩护。",
    },
    "Critères de classement interne (ex. LPSM)": {
      en: "Internal ranking criteria (e.g. LPSM)",
      zh: "内部排序标准（例如 LPSM）",
    },
    "Excellence académique et appartenance aux Masters du laboratoire — les étudiants des Masters LPSM ayant de très bons résultats sont priorisés.": {
      en: "Academic excellence and affiliation with the laboratory's master's programs: LPSM master's students with very strong results are prioritized.",
      zh: "学术优秀程度以及是否属于实验室相关硕士项目：成绩非常好的 LPSM 硕士学生优先。",
    },
    "À niveau équivalent : considérations thématiques, nombre de doctorants déjà encadrés, autres critères.": {
      en: "At an equivalent level: thematic considerations, number of PhD students already supervised, and other criteria.",
      zh: "在水平相近时：考虑研究主题、导师已指导博士生数量以及其他标准。",
    },
    "Démarches de financement alternatives : les candidats n'ayant pas postulé à d'autres bourses accessibles (bourses ENS, etc.) sont défavorisés. Les étudiants issus de Grandes Écoles ont l'obligation morale de postuler en priorité aux financements de leur établissement.": {
      en: "Alternative funding applications: candidates who have not applied to other accessible fellowships (ENS fellowships, etc.) are disadvantaged. Students from Grandes Écoles are morally expected to apply first for funding from their own institution.",
      zh: "其他经费申请：如果候选人没有申请其他可申请的奖学金（ENS 奖学金等），会处于不利位置。来自 Grandes Écoles 的学生原则上应优先申请本校经费。",
    },
    "Classement final de l'ED": {
      en: "Final ranking by the doctoral school",
      zh: "博士学院最终排序",
    },
    "Les candidats dans le noyau dur obtiennent immédiatement une bourse.": {
      en: "Candidates in the top core group immediately receive a fellowship.",
      zh: "处于核心录取名单的候选人会立即获得奖学金。",
    },
    "Les autres sont placés sur liste d'attente, susceptible d'évoluer selon les désistements.": {
      en: "The others are placed on a waiting list, which may move depending on withdrawals.",
      zh: "其他候选人进入候补名单，名单可能随放弃名额而变化。",
    },
    "Cas particulier – Année 2025": {
      en: "Special case - Year 2025",
      zh: "特殊情况：2025 年",
    },
    "En 2025, tous les étudiants de la promotion ont obtenu un financement en dehors des bourses de l'ED. Aucun dossier n'a été déposé, ce qui a permis l'attribution d'une bourse à un étudiant diplômé en 2024.": {
      en: "In 2025, all students in the cohort obtained funding outside the doctoral-school fellowships. No file was submitted, which allowed one fellowship to be awarded to a student who graduated in 2024.",
      zh: "2025 年，该届所有学生都通过博士学院奖学金以外的渠道获得经费。因此没有提交申请材料，这使得一个奖学金名额分配给了 2024 年毕业的学生。",
    },

    "Tableau des cours et modalités d'évaluation": {
      en: "Course table and assessment methods",
      zh: "课程与考核方式表",
    },
    "Récapitulatif de tous les cours optionnels proposés au S2 2025–2026 et leurs modalités d'évaluation.": {
      en: "Summary of all optional courses offered in S2 2025-2026 and their assessment methods.",
      zh: "2025-2026 第二学期所有选修课及其考核方式总览。",
    },
    "Les modalités peuvent évoluer selon le nombre d'inscrits. Les enseignants communiquent directement par email avec leurs groupes. Aucune info sur le site web. Période d'essai recommandée : 2 à 3 premières semaines.": {
      en: "Assessment methods may change depending on the number of enrolled students. Instructors communicate directly by email with their groups. No information is posted on the website. Recommended trial period: the first 2 to 3 weeks.",
      zh: "考核方式可能会根据选课人数变化。教师会直接通过邮件与各自小组沟通。网站上没有相关信息。建议试听期：前 2 到 3 周。",
    },
    "Enseignant": {
      en: "Instructor",
      zh: "教师",
    },
    "Sujet du cours": {
      en: "Course topic",
      zh: "课程主题",
    },
    "Modalités d'évaluation": {
      en: "Assessment",
      zh: "考核方式",
    },
    "La dynamique du modèle de Kuramoto": {
      en: "Dynamics of the Kuramoto model",
      zh: "Kuramoto 模型动力学",
    },
    "Étude d'article, approfondissement du cours": {
      en: "Article study and deeper treatment of the course material",
      zh: "文献研读，并深入展开课程内容",
    },
    "Introduction à la théorie ergodique": {
      en: "Introduction to ergodic theory",
      zh: "遍历理论导论",
    },
    "Oral (si < 6–7 étudiants), sinon Examen": {
      en: "Oral exam if fewer than 6-7 students; otherwise written exam",
      zh: "若少于 6-7 名学生则口试，否则考试",
    },
    "Invariants asymptotiques et marches aléatoires…": {
      en: "Asymptotic invariants and random walks...",
      zh: "渐近不变量与随机游走……",
    },
    "Dépendra du nombre d'étudiants": {
      en: "Depends on the number of students",
      zh: "取决于学生人数",
    },
    "Mécanique statistique critique en dimension 2…": {
      en: "Critical statistical mechanics in dimension 2...",
      zh: "二维临界统计力学……",
    },
    "Oral — liste de sujets 10j avant, exposé 30 min + questions": {
      en: "Oral exam: topic list 10 days before, 30-minute presentation plus questions",
      zh: "口试：提前 10 天给题目列表，30 分钟报告加问答",
    },
    "Probabilités Intégrables et la classe KPZ": {
      en: "Integrable probability and the KPZ class",
      zh: "可积概率与 KPZ 类",
    },
    "Modèle d'Ising": {
      en: "Ising model",
      zh: "Ising 模型",
    },
    "Transport optimal (martingale)": {
      en: "Optimal transport (martingale)",
      zh: "最优输运（鞅）",
    },
    "Géométrie planaire discrète aléatoire": {
      en: "Random discrete planar geometry",
      zh: "随机离散平面几何",
    },
    "Bayésien non paramétrique et applications": {
      en: "Nonparametric Bayesian methods and applications",
      zh: "非参数贝叶斯及应用",
    },
    "Théorie et Analyse des Valeurs Extrêmes": {
      en: "Theory and analysis of extreme values",
      zh: "极值理论与分析",
    },
    "Oral de fin de cours (compréhension globale + discussion sur une partie)": {
      en: "End-of-course oral exam (global understanding plus discussion of one part)",
      zh: "课程末口试（整体理解加某一部分讨论）",
    },
    "Modèles géométriques aléatoires": {
      en: "Random geometric models",
      zh: "随机几何模型",
    },
    "Limites d'échelles de graphes aléatoires": {
      en: "Scaling limits of random graphs",
      zh: "随机图的尺度极限",
    },
    "Oral (sauf si grand nombre d'étudiants)": {
      en: "Oral exam, except if there are many students",
      zh: "口试，除非学生人数很多",
    },
    "Les Grands réseaux aléatoires denses (Graphons)": {
      en: "Large dense random networks (graphons)",
      zh: "大型稠密随机网络（Graphons）",
    },
    "Oral type cours + présentation d'article": {
      en: "Course-style oral exam plus article presentation",
      zh: "课程式口试加文献报告",
    },
    "Modèles Probabilistes pour les Neurosciences": {
      en: "Probabilistic models for neuroscience",
      zh: "神经科学中的概率模型",
    },
    "Étude d'article, rapport écrit + présentation orale": {
      en: "Article study, written report, and oral presentation",
      zh: "文献研读、书面报告与口头展示",
    },
    "Propagation d'évidence dans les réseaux bayésiens": {
      en: "Evidence propagation in Bayesian networks",
      zh: "贝叶斯网络中的证据传播",
    },
    "Systèmes désordonnés et polymères dirigés": {
      en: "Disordered systems and directed polymers",
      zh: "无序系统与有向聚合物",
    },
    "Probablement lecture d'article et exposé (dépend du nombre)": {
      en: "Probably article reading and presentation, depending on enrollment",
      zh: "大概率为文献阅读与报告，取决于人数",
    },
    "Rough Paths et applications aux EDS": {
      en: "Rough paths and applications to SDEs",
      zh: "粗糙路径及其在随机微分方程中的应用",
    },
    "Processus de type McKean-Vlasov et EDP Paraboliques": {
      en: "McKean-Vlasov type processes and parabolic PDEs",
      zh: "McKean-Vlasov 型过程与抛物型偏微分方程",
    },
    "Examen écrit (discutable)": {
      en: "Written exam (to be discussed)",
      zh: "笔试（可讨论）",
    },
    "Inégalités de concentration": {
      en: "Concentration inequalities",
      zh: "集中不等式",
    },
    "Examen": {
      en: "Exam",
      zh: "考试",
    },
    "Examen écrit": {
      en: "Written exam",
      zh: "笔试",
    },
    "Projet": {
      en: "Project",
      zh: "项目",
    },
    "Projet + Examen": {
      en: "Project + exam",
      zh: "项目 + 考试",
    },
    "Projets personnels": {
      en: "Personal projects",
      zh: "个人项目",
    },
    "Non précisé": {
      en: "Not specified",
      zh: "未说明",
    },

    "Validation du 1er Semestre & Redoublement": {
      en: "Semester 1 Validation & Retaking the Year",
      zh: "第一学期通过规则与留级",
    },
    "Règles officielles de compensation, ajournement et redoublement pour le premier semestre du M2-PMA.": {
      en: "Official rules on compensation, failure, and retaking the year for the first semester of M2-PMA.",
      zh: "M2-PMA 第一学期关于补偿通过、未通过与留级的官方规则。",
    },
    "Validation du 1er semestre": {
      en: "Semester 1 validation",
      zh: "第一学期通过规则",
    },
    "Au premier semestre, la moyenne est calculée à partir de quatre notes sur 20 : deux UE de 9 ECTS (notes x et y), deux UE de 6 ECTS (notes z et w).": {
      en: "In the first semester, the average is computed from four grades out of 20: two 9-ECTS courses (grades x and y) and two 6-ECTS courses (grades z and w).",
      zh: "第一学期的平均分由四个 20 分制成绩计算：两门 9 ECTS 课程（成绩 x 和 y），两门 6 ECTS 课程（成绩 z 和 w）。",
    },
    "Cas possibles": {
      en: "Possible cases",
      zh: "可能情况",
    },
    "✅ Cas 1 — Admission directe": {
      en: "✅ Case 1 - Direct pass",
      zh: "✅ 情况 1：直接通过",
    },
    "Toutes les notes x, y, z, w ≥ 10/20": {
      en: "All grades x, y, z, w are at least 10/20",
      zh: "所有成绩 x、y、z、w 均不低于 10/20",
    },
    "Le semestre est validé en première session": {
      en: "The semester is validated in the first session",
      zh: "第一轮即通过该学期",
    },
    "Aucune note ne peut être repassée": {
      en: "No grade can be retaken",
      zh: "任何成绩都不能重考",
    },
    "⚖️ Cas 2 — Semestre compensé": {
      en: "Case 2 - Semester passed by compensation",
      zh: "情况 2：通过补偿机制通过学期",
    },
    "M ≥ 10/20, mais certaines notes sont < 10/20. Deux choix :": {
      en: "M is at least 10/20, but some grades are below 10/20. There are two choices:",
      zh: "M 不低于 10/20，但部分成绩低于 10/20。此时有两个选择：",
    },
    "Accepter la compensation": {
      en: "Accept compensation",
      zh: "接受补偿通过",
    },
    "Semestre validé en 1re session": {
      en: "Semester validated in the first session",
      zh: "第一轮即通过学期",
    },
    "Notes définitives, non modifiables": {
      en: "Final grades, not modifiable",
      zh: "成绩固定，不可修改",
    },
    "Refuser la compensation": {
      en: "Refuse compensation",
      zh: "拒绝补偿通过",
    },
    "Ajourné en 1re session": {
      en: "Failed in the first session",
      zh: "第一轮记为未通过",
    },
    "Notes ≥ 10 acquises, non repassées": {
      en: "Grades at least 10 are kept and cannot be retaken",
      zh: "不低于 10 的成绩保留，不能重考",
    },
    "Notes < 10 à repasser en 2e session": {
      en: "Grades below 10 must be retaken in the second session",
      zh: "低于 10 的成绩需在第二轮重考",
    },
    "❌ Cas 3 — Ajournement": {
      en: "Case 3 - Failure",
      zh: "情况 3：未通过",
    },
    "M < 10/20 — L'étudiant est ajourné en première session :": {
      en: "M is below 10/20: the student fails the first session:",
      zh: "M 低于 10/20：学生第一轮未通过：",
    },
    "Notes ≥ 10/20 sont acquises": {
      en: "Grades at least 10/20 are kept",
      zh: "不低于 10/20 的成绩保留",
    },
    "Notes < 10/20 à repasser en 2e session": {
      en: "Grades below 10/20 must be retaken in the second session",
      zh: "低于 10/20 的成绩需在第二轮重考",
    },
    "Seules les notes de 2e session sont prises en compte": {
      en: "Only second-session grades are taken into account",
      zh: "只计算第二轮成绩",
    },
    "📅 La seconde session du 1er semestre a lieu au mois de mars.": {
      en: "The second session for the first semester takes place in March.",
      zh: "第一学期的第二轮考试安排在三月。",
    },
    "Points importants pour la validation du M2": {
      en: "Important points for validating the M2",
      zh: "M2 通过的重要事项",
    },
    "En M2, il n'existe pas de compensation annuelle : chaque semestre doit être validé séparément.": {
      en: "In M2, there is no annual compensation: each semester must be validated separately.",
      zh: "在 M2，没有全年补偿机制：每个学期必须分别通过。",
    },
    "En cas de non-validation du 1er semestre, il est impossible d'être diplômé la même année, quel que soit le résultat du 2nd semestre.": {
      en: "If the first semester is not validated, it is impossible to graduate in the same year, regardless of the result of the second semester.",
      zh: "如果第一学期未通过，无论第二学期结果如何，都不可能在同一年毕业。",
    },
    "Il est strictement impossible de valider l'UE de mémoire avant la validation du 1er semestre.": {
      en: "It is strictly impossible to validate the thesis course unit before the first semester has been validated.",
      zh: "在第一学期通过之前，严格不可能通过论文 UE。",
    },
    "Il est strictement impossible de signer une convention de stage sans validation du 1er semestre.": {
      en: "It is strictly impossible to sign an internship agreement without validating the first semester.",
      zh: "若第一学期未通过，严格不可能签署实习协议。",
    },
    "Aucune dérogation ne sera accordée. La seconde session de mars permet aux étudiants validant le 1er semestre de signer leur convention de stage et de commencer au 1er avril.": {
      en: "No exemption will be granted. The March second session allows students who validate the first semester to sign their internship agreement and start on April 1.",
      zh: "不会给予任何例外。三月的第二轮考试使通过第一学期的学生能够签署实习协议，并于 4 月 1 日开始实习。",
    },
    "Redoublement": {
      en: "Retaking the year",
      zh: "留级",
    },
    "Le redoublement n'est pas un droit.": {
      en: "Retaking the year is not an automatic right.",
      zh: "留级并不是一项自动权利。",
    },
    "Le jury est systématiquement défavorable au redoublement des étudiants ayant validé moins de 15 ECTS au premier semestre.": {
      en: "The jury is systematically unfavorable to allowing students who validated fewer than 15 ECTS in the first semester to retake the year.",
      zh: "对于第一学期通过少于 15 ECTS 的学生，评审委员会通常不支持其留级。",
    },
    "Il est donc fortement recommandé d'éviter ce type de situation. Préparez bien chaque examen, même pour les UE que vous pensez connaître.": {
      en: "It is therefore strongly recommended to avoid this situation. Prepare carefully for every exam, even for course units you think you already know.",
      zh: "因此强烈建议避免这种情况。请认真准备每一门考试，即使是你觉得自己已经熟悉的 UE。",
    },

    "Règles du Semestre 2 — Mémoire & Stage": {
      en: "Semester 2 Rules - Thesis & Internship",
      zh: "第二学期规则：论文与实习",
    },
    "Organisation des cours optionnels, système de bonus, mentions et encadrement du mémoire/stage.": {
      en: "Organization of optional courses, bonus system, degree honors, and supervision of the thesis or internship.",
      zh: "选修课安排、加分机制、学位等级以及论文/实习指导规则。",
    },
    "Organisation des cours optionnels": {
      en: "Organization of optional courses",
      zh: "选修课安排",
    },
    "Les cours optionnels commencent la dernière semaine de janvier": {
      en: "Optional courses begin in the last week of January",
      zh: "选修课从一月最后一周开始",
    },
    "Chaque cours dure 24 heures : 8 semaines × 3h, ou 12 semaines × 2h": {
      en: "Each course lasts 24 hours: either 8 weeks x 3 hours or 12 weeks x 2 hours",
      zh: "每门课共 24 小时：8 周 × 3 小时，或 12 周 × 2 小时",
    },
    "La première semaine de mars est en principe une semaine d'interruption des cours": {
      en: "The first week of March is in principle a break week",
      zh: "三月第一周原则上为停课周",
    },
    "Validation du Semestre 2": {
      en: "Semester 2 validation",
      zh: "第二学期通过规则",
    },
    "L'étudiant doit valider 30 ECTS, répartis ainsi :": {
      en: "The student must validate 30 ECTS, distributed as follows:",
      zh: "学生必须通过 30 ECTS，分配如下：",
    },
    "3 cours optionnels de 6 ECTS chacun = 18 ECTS": {
      en: "3 optional courses of 6 ECTS each = 18 ECTS",
      zh: "3 门选修课，每门 6 ECTS，共 18 ECTS",
    },
    "Un mémoire ou un stage de 12 ECTS": {
      en: "A thesis or internship worth 12 ECTS",
      zh: "一篇论文或一次实习，12 ECTS",
    },
    "La brochure propose 20 cours optionnels regroupés en 7 blocs. Le choix est totalement libre. Il est fortement recommandé de valider plus de 3 cours (voir système de bonus).": {
      en: "The brochure lists 20 optional courses grouped into 7 blocks. The choice is entirely free. It is strongly recommended to validate more than 3 courses (see the bonus system).",
      zh: "手册列出 20 门选修课，分为 7 个模块。选课完全自由。强烈建议通过超过 3 门课程（见加分机制）。",
    },
    "Prise en compte des notes": {
      en: "How grades are counted",
      zh: "成绩计算方式",
    },
    "Les notes sont classées par ordre décroissant :": {
      en: "Grades are ranked in decreasing order:",
      zh: "成绩按降序排列：",
    },
    "Cours sous contrat (obligatoires)": {
      en: "Contract courses (mandatory)",
      zh: "合同内课程（必算课程）",
    },
    "Les notes \\(N_1, N_2, N_3\\) sont enregistrées comme les trois cours obligatoires du semestre. Si 2 ou 3 appartiennent au même bloc, le jury les répartit administrativement dans 3 blocs distincts — aucune incidence pour l'étudiant.": {
      en: "The grades \\(N_1, N_2, N_3\\) are recorded as the three mandatory courses of the semester. If two or three belong to the same block, the jury administratively distributes them into three distinct blocks; this has no effect on the student.",
      zh: "成绩 \\(N_1, N_2, N_3\\) 被登记为本学期三门必算课程。如果其中两门或三门属于同一模块，评审委员会会在行政上将其分配到三个不同模块；这对学生没有影响。",
    },
    "Cours hors contrat (bonus)": {
      en: "Extra-contract courses (bonus)",
      zh: "合同外课程（加分）",
    },
    "Les notes \\(N_4, N_5, N_6, \\ldots\\) ne sont pas obligatoires mais génèrent des points de bonus significatifs.": {
      en: "The grades \\(N_4, N_5, N_6, \\ldots\\) are not mandatory but generate significant bonus points.",
      zh: "成绩 \\(N_4, N_5, N_6, \\ldots\\) 不是必算项，但会产生显著加分。",
    },
    "✅ Validé : \\(N \\ge 10\\)": {
      en: "✅ Validated: \\(N \\ge 10\\)",
      zh: "✅ 通过：\\(N \\ge 10\\)",
    },
    "⚠️ Presque validé : \\(8 \\le N < 10\\)": {
      en: "Almost validated: \\(8 \\le N < 10\\)",
      zh: "接近通过：\\(8 \\le N < 10\\)",
    },
    "❌ Non validé : \\(N < 8\\)": {
      en: "Not validated: \\(N < 8\\)",
      zh: "未通过：\\(N < 8\\)",
    },
    "Système de bonus": {
      en: "Bonus system",
      zh: "加分机制",
    },
    "1er cours hors contrat validé (si \\(N_4 \\ge 10\\))": {
      en: "First validated extra-contract course (if \\(N_4 \\ge 10\\))",
      zh: "第一门通过的合同外课程（若 \\(N_4 \\ge 10\\)）",
    },
    "+1 point sur \\(N_2\\) et \\(N_3\\) · Gain sur moyenne : +0,4 point/20": {
      en: "+1 point on \\(N_2\\) and \\(N_3\\) · Gain in average: +0.4/20",
      zh: "\\(N_2\\) 和 \\(N_3\\) 各加 1 分 · 平均分提升：+0.4/20",
    },
    "Chaque cours hors contrat supplémentaire (\\(N_5, N_6, \\ldots\\))": {
      en: "Each additional extra-contract course (\\(N_5, N_6, \\ldots\\))",
      zh: "每一门额外的合同外课程（\\(N_5, N_6, \\ldots\\)）",
    },
    "+1 point sur \\(N_1\\), \\(N_2\\) et \\(N_3\\) · Gain sur moyenne : +0,6 point/20": {
      en: "+1 point on \\(N_1\\), \\(N_2\\), and \\(N_3\\) · Gain in average: +0.6/20",
      zh: "\\(N_1\\)、\\(N_2\\)、\\(N_3\\) 各加 1 分 · 平均分提升：+0.6/20",
    },
    "Chaque cours presque validé (\\(8 \\le N < 10\\))": {
      en: "Each almost validated course (\\(8 \\le N < 10\\))",
      zh: "每一门接近通过的课程（\\(8 \\le N < 10\\)）",
    },
    "+1 point sur \\(N_3\\) · Gain sur moyenne : +0,2 point/20": {
      en: "+1 point on \\(N_3\\) · Gain in average: +0.2/20",
      zh: "\\(N_3\\) 加 1 分 · 平均分提升：+0.2/20",
    },
    "Mention du diplôme": {
      en: "Degree honors",
      zh: "学位等级",
    },
    "Sur le CV, seule la mention apparaît. C'est souvent déterminant.": {
      en: "On a CV, only the honor level appears. This is often decisive.",
      zh: "在简历上只会显示学位等级。这往往很关键。",
    },
    "Assez Bien": {
      en: "Honors",
      zh: "Assez Bien",
    },
    "Bien": {
      en: "High honors",
      zh: "Bien",
    },
    "Très Bien": {
      en: "Highest honors",
      zh: "Très Bien",
    },
    "Moyenne annuelle ≥ 12/20": {
      en: "Annual average at least 12/20",
      zh: "全年平均分不低于 12/20",
    },
    "Moyenne annuelle ≥ 14/20": {
      en: "Annual average at least 14/20",
      zh: "全年平均分不低于 14/20",
    },
    "Moyenne annuelle ≥ 16/20": {
      en: "Annual average at least 16/20",
      zh: "全年平均分不低于 16/20",
    },
    "Stratégie : Un cours optionnel supplémentaire peut permettre de changer de mention grâce au système de bonus.": {
      en: "Strategy: an additional optional course can make it possible to move up an honor level thanks to the bonus system.",
      zh: "策略：由于加分机制，多通过一门选修课可能让你提升学位等级。",
    },
    "Le jury est systématiquement défavorable pour l'attribution des mentions si le S2 est validé par compensation ou si \\(N_3 < 10\\).": {
      en: "The jury is systematically unfavorable to awarding honors if S2 is validated by compensation or if \\(N_3 < 10\\).",
      zh: "如果第二学期通过补偿机制才通过，或 \\(N_3 < 10\\)，评审委员会通常不支持授予等级荣誉。",
    },
    "Cas exceptionnel : 2 cours + Stage 18 ECTS": {
      en: "Exceptional case: 2 courses + 18-ECTS internship",
      zh: "特殊情况：2 门课程 + 18 ECTS 实习",
    },
    "Cette possibilité est exceptionnelle, réservée aux stages industriels longs avec obligation de présence stricte, lorsqu'il est impossible de suivre les cours.": {
      en: "This possibility is exceptional and reserved for long industrial internships with strict attendance requirements, when it is impossible to attend courses.",
      zh: "这种可能性很特殊，仅限于需要严格到岗、因而无法上课的长期工业实习。",
    },
    "Recommandations par parcours": {
      en: "Recommendations by track",
      zh: "按方向给出的建议",
    },
    "Majeure EDP–Probas : Fortement incités à choisir dans le bloc Proba–Analyse. Le M2 Modélisation propose aussi 3 cours au choix.": {
      en: "PDE-Probability track: strongly encouraged to choose from the Probability-Analysis block. The M2 Modeling program also offers 3 elective courses.",
      zh: "EDP-概率方向：强烈建议在概率-分析模块中选课。M2 Modélisation 也提供 3 门可选课程。",
    },
    "Cours hors plaquette : Possibles (avec attestation), mais ne comptent pas dans la moyenne et ne donnent pas de bonus (sauf exception pour M2 Modélisation).": {
      en: "Courses outside the brochure: possible with a certificate, but they do not count toward the average and do not give bonuses, except for the M2 Modeling exception.",
      zh: "手册外课程：可以选（需证明），但不计入平均分，也不产生加分（M2 Modélisation 的例外情况除外）。",
    },
    "Mémoire de M2": {
      en: "M2 thesis",
      zh: "M2 论文",
    },
    "Encadrement et Validation": {
      en: "Supervision and validation",
      zh: "指导与确认",
    },
    "Contacter un enseignant pour trouver un sujet (liste proposée ou initiative personnelle)": {
      en: "Contact an instructor to find a topic (from the proposed list or by personal initiative)",
      zh: "联系教师寻找题目（可从建议列表中选，也可主动提出）",
    },
    "Encadrant LPSM/M2 PMA : Aucune validation requise · Encadrant extérieur : Validation obligatoire avant de commencer (envoyer nom/fonction, articles à étudier, résumé)": {
      en: "LPSM/M2-PMA advisor: no validation required · External advisor: validation required before starting (send name/position, articles to study, and summary)",
      zh: "LPSM/M2-PMA 导师：无需额外确认 · 外部导师：开始前必须确认（发送姓名/职务、拟研究文章、摘要）",
    },
    "Grille d'évaluation": {
      en: "Evaluation scale",
      zh: "评分标准",
    },
    "Note": {
      en: "Grade",
      zh: "分数",
    },
    "Description": {
      en: "Description",
      zh: "说明",
    },
    "Travail très limite, mais validé": {
      en: "Very borderline work, but validated",
      zh: "非常勉强，但通过",
    },
    "Étude bibliographique suffisante": {
      en: "Sufficient bibliographic study",
      zh: "文献研读充分",
    },
    "Étude bibliographique complète et détaillée": {
      en: "Complete and detailed bibliographic study",
      zh: "完整且详细的文献研读",
    },
    "Travail bibliographique très complet et particulièrement soigné": {
      en: "Very complete and particularly careful bibliographic work",
      zh: "非常完整且特别细致的文献工作",
    },
    "Idem + début de recherche autonome (non publiable)": {
      en: "Same, plus the beginning of autonomous research (not publishable)",
      zh: "同上，并有自主研究的开端（尚不可发表）",
    },
    "Idem + travail publiable (journal second plan)": {
      en: "Same, plus publishable work in a second-tier journal",
      zh: "同上，并达到可在二线期刊发表的工作",
    },
    "Idem + travail publiable (journal premier plan)": {
      en: "Same, plus publishable work in a top-tier journal",
      zh: "同上，并达到可在一线期刊发表的工作",
    },
    "Très haut niveau (Annals of Probability, PTRF)": {
      en: "Very high level (Annals of Probability, PTRF)",
      zh: "非常高水平（Annals of Probability、PTRF）",
    },
    "Calendrier mémoire": {
      en: "Thesis timeline",
      zh: "论文时间安排",
    },
    "Fév–Avr": {
      en: "Feb-Apr",
      zh: "二月至四月",
    },
    "Avr–Sep": {
      en: "Apr-Sep",
      zh: "四月至九月",
    },
    "25 juin": {
      en: "June 25",
      zh: "6 月 25 日",
    },
    "30 sep": {
      en: "Sep. 30",
      zh: "9 月 30 日",
    },
    "Recherche du sujet": {
      en: "Topic search",
      zh: "寻找题目",
    },
    "Rédaction": {
      en: "Writing",
      zh: "写作",
    },
    "Date limite pour diplôme en juillet (1re session)": {
      en: "Deadline for graduation in July (first session)",
      zh: "七月毕业截止日期（第一轮）",
    },
    "Date limite pour diplôme en octobre (2e session) — majorité des soutenances en septembre": {
      en: "Deadline for graduation in October (second session): most defenses take place in September",
      zh: "十月毕业截止日期（第二轮）：大多数答辩在九月进行",
    },
    "Stage de M2": {
      en: "M2 internship",
      zh: "M2 实习",
    },
    "Conditions et Convention": {
      en: "Conditions and internship agreement",
      zh: "条件与实习协议",
    },
    "Pré-requis : Validation du 1er semestre obligatoire (compensation acceptée)": {
      en: "Prerequisite: the first semester must be validated (compensation accepted)",
      zh: "前提：第一学期必须通过（接受补偿通过）",
    },
    "Validation pédagogique : Soumettre la fiche de stage avant signature": {
      en: "Pedagogical validation: submit the internship form before signing",
      zh: "教学确认：签署前提交实习表格",
    },
    "Encadrement : Double encadrement (Maître de stage + Enseignant Sorbonne Université)": {
      en: "Supervision: double supervision (internship supervisor + Sorbonne Université instructor)",
      zh: "指导：双重指导（实习导师 + 索邦大学教师）",
    },
    "Convention : Via la plateforme SU (signature via Yann PONCIN)": {
      en: "Agreement: via the SU platform (signature via Yann PONCIN)",
      zh: "协议：通过 SU 平台办理（由 Yann PONCIN 签署流程）",
    },
    "Durée et Délais": {
      en: "Duration and deadlines",
      zh: "时长与期限",
    },
    "Début généralement en avril": {
      en: "Usually starts in April",
      zh: "通常在四月开始",
    },
    "Peut durer jusqu'à décembre 2026 pour les stages longs": {
      en: "Can last until December 2026 for long internships",
      zh: "长期实习可持续到 2026 年 12 月",
    },
    "Une prolongation au-delà du 15 décembre 2026 implique le redoublement du M2.": {
      en: "An extension beyond December 15, 2026 implies retaking the M2 year.",
      zh: "若延期超过 2026 年 12 月 15 日，则意味着需要 M2 留级。",
    },

    "Guide de Validation et Fin d'Année": {
      en: "Validation and End-of-Year Guide",
      zh: "通过规则与学年末指南",
    },
    "Récapitulatif des procédures administratives, des 3 situations de validation au 30 septembre et des modalités de soutenance.": {
      en: "Summary of administrative procedures, the 3 validation situations on September 30, and defense procedures.",
      zh: "行政流程、9 月 30 日的三种通过状态以及答辩安排总览。",
    },
    "Date fatidique : 30 septembre. Il n'y aura aucun rappel. À cette date, vous devez obligatoirement vous trouver dans l'une des 3 situations ci-dessous. Dans le cas contraire, le jury considérera que vous abandonnez le Master.": {
      en: "Critical date: September 30. There will be no reminder. On that date, you must be in one of the 3 situations below. Otherwise, the jury will consider that you are abandoning the master's program.",
      zh: "关键日期：9 月 30 日。不会另行提醒。到这一天，你必须属于以下三种情况之一。否则，评审委员会会认为你放弃该硕士项目。",
    },
    "1. Votre situation au 30 septembre": {
      en: "1. Your situation on September 30",
      zh: "1. 你在 9 月 30 日的状态",
    },
    "Situation": {
      en: "Situation",
      zh: "情况",
    },
    "Critères requis": {
      en: "Required criteria",
      zh: "所需条件",
    },
    "Suite et Délais": {
      en: "Next steps and deadlines",
      zh: "后续与期限",
    },
    "1. Tout est validé": {
      en: "1. Everything is validated",
      zh: "1. 全部通过",
    },
    "Cours du S2 validésMémoire ou stage soutenuNote envoyée par l'encadrant": {
      en: "S2 courses validated / Thesis or internship defended / Grade sent by the advisor",
      zh: "第二学期课程已通过 / 论文或实习已答辩 / 导师已发送成绩",
    },
    "PV signés début octobre.Cérémonie de remise mi-décembre": {
      en: "Records signed in early October. Graduation ceremony in mid-December",
      zh: "十月初签署成绩记录。十二月中旬举行授予仪式",
    },
    "2. Stage Entreprise": {
      en: "2. Company internship",
      zh: "2. 企业实习",
    },
    "Cours du S2 validésStage en entreprise (non académique) en cours": {
      en: "S2 courses validated / Company internship (non-academic) still in progress",
      zh: "第二学期课程已通过 / 企业实习（非学术）仍在进行",
    },
    "Soutenance AVANT le 15 décembreDiplôme retirable en janvier/février (sans cérémonie)": {
      en: "Defense BEFORE December 15. Diploma available in January/February, without ceremony",
      zh: "12 月 15 日之前答辩。文凭可在一月/二月领取（无仪式）",
    },
    "attestation de réussite du M2": {
      en: "M2 completion certificate",
      zh: "M2 通过证明",
    },
    "30 septembre": {
      en: "September 30",
      zh: "9 月 30 日",
    },
    "Cérémonie de remise mi-décembre": {
      en: "Graduation ceremony in mid-December",
      zh: "12 月中旬毕业典礼",
    },
    "Prévenir I. KOURKOVA entre le 15 et le 30 sept.": {
      en: "Notify I. KOURKOVA between September 15 and 30",
      zh: "9 月 15 日至 30 日之间通知 I. KOURKOVA",
    },
    "Soutenance AVANT le 15 décembre": {
      en: "Defense BEFORE December 15",
      zh: "12 月 15 日前答辩",
    },
    "3. Redoublement": {
      en: "3. Retaking the year",
      zh: "3. 留级",
    },
    "Semestre 1 validéSouhait d'ajourner le S2": {
      en: "Semester 1 validated / Wish to postpone S2",
      zh: "第一学期已通过 / 希望延后第二学期",
    },
    "Prévenir I. KOURKOVA entre le 15 et le 30 sept.(Clôture logicielle des réinscriptions par SU le 30/09)": {
      en: "Notify I. KOURKOVA between September 15 and 30 (SU closes the re-enrollment software on 30/09)",
      zh: "在 9 月 15 日至 30 日之间通知 I. KOURKOVA（SU 重新注册系统于 9 月 30 日关闭）",
    },
    "2. Modalités de Soutenance (Mémoire / Stage)": {
      en: "2. Defense procedures (thesis / internship)",
      zh: "2. 答辩方式（论文 / 实习）",
    },
    "Type de stage": {
      en: "Type of internship",
      zh: "实习类型",
    },
    "Organisation du Jury": {
      en: "Jury organization",
      zh: "评审安排",
    },
    "Transmission de la note": {
      en: "Grade transmission",
      zh: "成绩传递",
    },
    "Votre rôle": {
      en: "Your role",
      zh: "你的职责",
    },
    "Académique(Labo, ENS, X, INRIA...)": {
      en: "Academic (lab, ENS, X, INRIA...)",
      zh: "学术实习（实验室、ENS、X、INRIA 等）",
    },
    "L'encadrant lit le rapport, convoque 2-3 spécialistes et fixe la date.": {
      en: "The advisor reads the report, invites 2-3 specialists, and sets the date.",
      zh: "导师阅读报告，邀请 2-3 位专家，并确定日期。",
    },
    "L'encadrant envoie la note + une justification (selon la grille du M2) à I. KOURKOVA.": {
      en: "The advisor sends the grade and a justification, following the M2 scale, to I. KOURKOVA.",
      zh: "导师根据 M2 评分标准，将成绩和说明发送给 I. KOURKOVA。",
    },
    "Rappeler la deadline du 30 septembre à l'encadrant. Ne pas envoyer le rapport à la direction.": {
      en: "Remind the advisor of the September 30 deadline. Do not send the report to the program direction.",
      zh: "提醒导师 9 月 30 日截止。不要把报告发送给项目负责人。",
    },
    "Entreprise(Banque, EDF, CEA...)": {
      en: "Company (bank, EDF, CEA...)",
      zh: "企业（银行、EDF、CEA 等）",
    },
    "Prendre contact avec I. KOURKOVA pour fixer la date (Jussieu ou en ligne). L'encadrant entreprise doit être présent.": {
      en: "Contact I. KOURKOVA to set the date, either at Jussieu or online. The company supervisor must be present.",
      zh: "联系 I. KOURKOVA 确定日期（Jussieu 现场或线上）。企业导师必须出席。",
    },
    "I. KOURKOVA évalue la soutenance (ou L. ABBAS-TURKI pour la finance).": {
      en: "I. KOURKOVA evaluates the defense (or L. ABBAS-TURKI for finance).",
      zh: "由 I. KOURKOVA 评估答辩（金融方向由 L. ABBAS-TURKI）。",
    },
    "Envoyer le rapport à I. KOURKOVA à l'avance pour qu'elle l'étudie.": {
      en: "Send the report to I. KOURKOVA in advance so that she can review it.",
      zh: "提前将报告发送给 I. KOURKOVA，以便她阅读。",
    },
    "3. Thèse et Contrat Doctoral": {
      en: "3. PhD and doctoral contract",
      zh: "3. 博士与博士合同",
    },
    "Postuler en thèse : Le relevé de notes suffit (Y. PONCIN peut fournir un relevé provisoire du S2). Pas besoin d'avoir soutenu. Commencer le contrat (Être payé) : Une attestation de réussite du M2 est OBLIGATOIRE. Elle n'est délivrée qu'une fois le mémoire soutenu (Situation 1). Contrat au 1er octobre : Être en Situation 1 le 30 septembre. Contrat au 1er septembre : Soutenir avant le 31 août et demander l'attestation le 1er septembre à la rentrée.": {
      en: "Applying for a PhD: the transcript is enough; Y. PONCIN can provide a provisional S2 transcript. You do not need to have defended yet. Starting the contract (being paid): a certificate of successful M2 completion is mandatory. It is issued only once the thesis has been defended (Situation 1). Contract starting October 1: be in Situation 1 on September 30. Contract starting September 1: defend before August 31 and request the certificate on September 1 at the start of the academic year.",
      zh: "申请博士：成绩单即可；Y. PONCIN 可以提供第二学期临时成绩单。不需要已经答辩。开始博士合同（获得薪水）：必须有 M2 通过证明。该证明只有在论文答辩完成后才会发放（情况 1）。10 月 1 日开始合同：9 月 30 日必须处于情况 1。9 月 1 日开始合同：8 月 31 日前完成答辩，并在 9 月 1 日开学时申请证明。",
    },
    "Contacts administratifs : Yann PONCIN (Scolarité, Attestations, Relevés) | I. KOURKOVA (Direction, Notes, Soutenances) Attention : Utilisez uniquement votre adresse prenom.nom@etu.sorbonne-universite.fr pour recevoir les invitations aux cérémonies et correspondre avec l'administration.": {
      en: "Administrative contacts: Yann PONCIN (student office, certificates, transcripts) | I. KOURKOVA (direction, grades, defenses). Important: use only your prenom.nom@etu.sorbonne-universite.fr address to receive ceremony invitations and correspond with the administration.",
      zh: "行政联系人：Yann PONCIN（学籍、证明、成绩单）| I. KOURKOVA（项目管理、成绩、答辩）。注意：请只使用 prenom.nom@etu.sorbonne-universite.fr 邮箱接收仪式邀请并与行政部门通信。",
    },

    "Convergence des Mesures, Grandes Déviations et Percolation": {
      en: "Convergence of Measures, Large Deviations and Percolation",
      zh: "测度收敛、大偏差与渗流",
    },
    "Théorèmes limites avancés, théorie des grandes déviations, et introduction à la percolation.": {
      en: "Advanced limit theorems, large deviation theory, and an introduction to percolation.",
      zh: "高级极限定理、大偏差理论，以及渗流导论。",
    },
    "Calcul Stochastique et Processus de Diffusion": {
      en: "Stochastic Calculus and Diffusion Processes",
      zh: "随机微积分与扩散过程",
    },
    "Calcul Stochastique et Processus de Diffusion (CS)": {
      en: "Stochastic Calculus and Diffusion Processes (CS)",
      zh: "随机微积分与扩散过程（CS）",
    },
    "Cours fondamental du M2-PMA : du mouvement brownien aux équations différentielles stochastiques.": {
      en: "Core M2-PMA course: from Brownian motion to stochastic differential equations.",
      zh: "M2-PMA 核心课程：从布朗运动到随机微分方程。",
    },
    "Chaînes de Markov, Processus de Markov et Applications, Nuages Poissonniens — cours fondamental de la majeure PS.": {
      en: "Markov chains, Markov processes and applications, Poisson point clouds: a core course in the stochastic processes track.",
      zh: "马尔可夫链、马尔可夫过程及应用、泊松点云：随机过程方向核心课程。",
    },
    "Théorie des Nuages Poissonniens, Processus de Lévy et Théorie des Excursions.": {
      en: "Theory of Poisson point clouds, Lévy processes, and excursion theory.",
      zh: "泊松点云理论、Lévy 过程与游程理论。",
    },
    "Pour la majeure Probabilités appliquées et EDProba, seuls 6 ECTS sont retenus — la partie Nuages de Poisson n'est pas au programme.": {
      en: "For the Applied Probability and EDProba tracks, only 6 ECTS are counted; the Poisson point cloud part is not included in the syllabus.",
      zh: "对于应用概率方向和 EDProba 方向，只计 6 ECTS；泊松点云部分不在课程要求内。",
    },
    "Détails du cours": {
      en: "Course details",
      zh: "课程详情",
    },
    "Ressources": {
      en: "Resources",
      zh: "资源",
    },
    "Ressources du cours": {
      en: "Course resources",
      zh: "课程资源",
    },
    "Polycopié": {
      en: "Lecture notes",
      zh: "讲义",
    },
    "Polycopié & TDs": {
      en: "Lecture notes & problem sheets",
      zh: "讲义与习题",
    },
    "Matériaux additionnels (In English 🇬🇧)": {
      en: "Additional materials (in English)",
      zh: "补充材料（英文）",
    },
    "Professeur": {
      en: "Instructor",
      zh: "授课教师",
    },
    "Crédits ECTS": {
      en: "ECTS credits",
      zh: "ECTS 学分",
    },
    "Format": {
      en: "Format",
      zh: "形式",
    },
    "Site web": {
      en: "Website",
      zh: "网站",
    },
    "Site officiel du cours": {
      en: "Official course website",
      zh: "课程官网",
    },
    "Contenu du cours": {
      en: "Course content",
      zh: "课程内容",
    },
    "Convergence des mesures de probabilité": {
      en: "Convergence of probability measures",
      zh: "概率测度收敛",
    },
    "Théorie des grandes déviations": {
      en: "Large deviation theory",
      zh: "大偏差理论",
    },
    "Percolation": {
      en: "Percolation",
      zh: "渗流",
    },
    "Filtrations et Martingales": {
      en: "Filtrations and martingales",
      zh: "滤过与鞅",
    },
    "Mouvement Brownien": {
      en: "Brownian motion",
      zh: "布朗运动",
    },
    "Intégration Stochastique": {
      en: "Stochastic integration",
      zh: "随机积分",
    },
    "Semi-martingales continues": {
      en: "Continuous semimartingales",
      zh: "连续半鞅",
    },
    "Équations Différentielles Stochastiques (EDS)": {
      en: "Stochastic differential equations (SDEs)",
      zh: "随机微分方程（SDE）",
    },
    "Chaînes de Markov (incluant les graphes aléatoires)": {
      en: "Markov chains, including random graphs",
      zh: "马尔可夫链（包括随机图）",
    },
    "Processus de Markov et applications (temps continu, espace d'états discret)": {
      en: "Markov processes and applications (continuous time, discrete state space)",
      zh: "马尔可夫过程及应用（连续时间、离散状态空间）",
    },
    "Nuages de Poisson": {
      en: "Poisson point clouds",
      zh: "泊松点云",
    },
    "Nuages Poissonniens (Poissonian Clouds)": {
      en: "Poisson point clouds",
      zh: "泊松点云",
    },
    "Processus de Lévy": {
      en: "Lévy processes",
      zh: "Lévy 过程",
    },
    "Théorie des Excursions": {
      en: "Excursion theory",
      zh: "游程理论",
    },
    "Cours magistral + TD": {
      en: "Lecture + problem session",
      zh: "大课 + 习题课",
    },
    "Cours magistral + TDs": {
      en: "Lecture + problem sessions",
      zh: "大课 + 习题课",
    },
    "Cours magistral (sans TD)": {
      en: "Lecture course (no problem sessions)",
      zh: "大课（无习题课）",
    },
    "6 + 3 ECTS (PS) / 6 ECTS (autres)": {
      en: "6 + 3 ECTS (Stochastic Processes) / 6 ECTS (other tracks)",
      zh: "6 + 3 ECTS（随机过程方向）/ 6 ECTS（其他方向）",
    },
    "Tous les matériaux (polycopiés, TDs, corrigés) sont disponibles directement sur le site web officiel du cours.": {
      en: "All materials (lecture notes, problem sheets, solutions) are available directly on the official course website.",
      zh: "所有材料（讲义、习题、解答）都可以直接在课程官方网站上获取。",
    },
    "Polycopié du cours": {
      en: "Course lecture notes",
      zh: "课程讲义",
    },
    "TDs (énoncés)": {
      en: "Problem sheets",
      zh: "习题题目",
    },
    "Accéder au site du cours": {
      en: "Open the course website",
      zh: "打开课程网站",
    },
    "Polycopié (2023–2024)": {
      en: "Lecture notes, 2023-2024",
      zh: "讲义，2023-2024",
    },
    "Polycopié version 2023–2024": {
      en: "Lecture notes, 2023-2024 version",
      zh: "讲义，2023-2024 版",
    },
    "Polycopié (2015–2016)": {
      en: "Lecture notes, 2015-2016",
      zh: "讲义，2015-2016",
    },
    "Polycopié version 2015–2016": {
      en: "Lecture notes, 2015-2016 version",
      zh: "讲义，2015-2016 版",
    },
    "Solutions des TDs": {
      en: "Problem sheet solutions",
      zh: "习题解答",
    },
    "Solutions LE GALL": {
      en: "LE GALL solutions",
      zh: "LE GALL 解答",
    },
    "M2 Revisions – N. FOURNIER": {
      en: "M2 revision notes - N. FOURNIER",
      zh: "M2 复习讲义 - N. FOURNIER",
    },
    "Martingales & Chaînes de Markov – BALDI et al.": {
      en: "Martingales & Markov chains - BALDI et al.",
      zh: "鞅与马尔可夫链 - BALDI 等",
    },
    "LE GALL (version française)": {
      en: "LE GALL (French version)",
      zh: "LE GALL（法文版）",
    },
    "LE GALL – BM, Martingales & SC": {
      en: "LE GALL - Brownian motion, martingales & stochastic calculus",
      zh: "LE GALL - 布朗运动、鞅与随机微积分",
    },
    "MÖRTERS & PERES – Brownian Motion": {
      en: "MÖRTERS & PERES - Brownian Motion",
      zh: "MÖRTERS & PERES - 布朗运动",
    },
    "REVUZ & YOR – Continuous Martingales": {
      en: "REVUZ & YOR - Continuous Martingales",
      zh: "REVUZ & YOR - 连续鞅",
    },
  };

  const SELECTORS = [
    ".pma-hero-label",
    ".pma-hero h1",
    ".pma-hero p",
    ".pma-hero a",
    ".pma-section-title",
    ".rule-section-title",
    ".sub-section-title",
    ".info-box p",
    ".info-box li",
    ".alert span",
    ".rule-list li",
    ".numbered-list li",
    ".cond-title",
    ".ed-box-title",
    ".ed-box-list li",
    ".calendar-month",
    ".calendar-content",
    ".eval-table th",
    ".eval-table td",
    ".grade-table th",
    ".grade-table td",
    ".mention-badge",
    ".mention-desc",
    ".course-meta-label",
    ".course-meta-value",
    ".content-list-title",
    ".content-list li",
    ".resource-group-title",
    ".resource-btn",
    ".badge",
    ".legend-label",
    ".semester-label",
    ".ue-name",
    ".parcours-sem-label",
    ".parcours-sem-ects",
    ".parcours-course-name",
    ".parcours-course-sub",
    ".parcours-doc-link",
    ".info-link-card-title",
    ".info-link-card-desc",
    ".pma-main h2",
    ".pma-main h3",
    ".pma-main p",
  ];

  function normalizeText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function translationKey(element) {
    let text = normalizeText(element.textContent);
    if (element.querySelector(":scope > .rule-num")) {
      text = text.replace(/^\d+/, "").trim();
    }
    return text;
  }

  function preservePrefix(element, translated) {
    if (/<[a-z][\s\S]*>/i.test(translated)) return translated;

    const prefixes = [];
    for (const child of element.children) {
      if (
        child.tagName === "I" ||
        child.classList.contains("rule-num") ||
        child.classList.contains("cond-icon")
      ) {
        prefixes.push(child.outerHTML);
      } else {
        break;
      }
    }
    return prefixes.length ? `${prefixes.join(" ")} ${translated}` : translated;
  }

  function syncLanguageFlags(language) {
    const labels = {
      en: { en: "Switch to English", fr: "Passer en anglais", zh: "切换到英文" },
      fr: { en: "Switch to French", fr: "Passer en français", zh: "切换到法语" },
      zh: { en: "Switch to Chinese", fr: "Passer en chinois", zh: "切换到中文" },
    };

    document.querySelectorAll("[data-lang-option]").forEach((button) => {
      const target = button.dataset.langOption;
      const hidden = target === language;
      button.hidden = hidden;
      button.setAttribute("aria-hidden", hidden ? "true" : "false");
      const label = labels[target] && labels[target][language];
      if (label) {
        button.title = label;
        button.setAttribute("aria-label", label);
      }
    });
  }

  function collect() {
    document.querySelectorAll(SELECTORS.join(",")).forEach((element) => {
      if (element.dataset.pmaI18nReady) return;
      if (element.classList.contains("parcours-course-sub") && element.querySelector(".parcours-doc-link")) return;
      element.dataset.pmaI18nReady = "true";
      element.dataset.pmaI18nText = translationKey(element);
      element.dataset.pmaI18nHtml = element.innerHTML;
    });
    document.__pmaI18nOriginalTitle = document.__pmaI18nOriginalTitle || document.title;
  }

  function apply(language) {
    collect();
    const normalized = language === "zh" ? "zh" : language === "en" ? "en" : "fr";

    document.querySelectorAll("[data-pma-i18n-ready]").forEach((element) => {
      const key = element.dataset.pmaI18nText;
      const entry = TRANSLATIONS[key];
      if (normalized === "fr" || !entry || !entry[normalized]) {
        element.innerHTML = element.dataset.pmaI18nHtml;
        return;
      }
      element.innerHTML = preservePrefix(element, entry[normalized]);
    });

    const titleKey = normalizeText(document.__pmaI18nOriginalTitle);
    const titleEntry = TRANSLATIONS[titleKey];
    if (normalized !== "fr" && titleEntry && titleEntry[normalized]) {
      document.title = titleEntry[normalized];
    }

    syncLanguageFlags(normalized);
  }

  collect();

  window.addEventListener("site-language-change", (event) => {
    apply(event.detail && event.detail.language);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      apply(document.documentElement.dataset.language || document.documentElement.dataset.defaultLang || "fr");
    }, { once: true });
  } else {
    apply(document.documentElement.dataset.language || document.documentElement.dataset.defaultLang || "fr");
  }
})();
