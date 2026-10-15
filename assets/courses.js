/* ============================================================
   课程列表 —— 唯一数据源（「最近在学」）
   新增一条：在 COURSES 数组开头加一项（越靠前越新），
   然后把 courses/_template.html 复制成 note 指向的文件名去写笔记。
   字段（和 assets/reading.js 的 READING 一致）：
     title  显示的标题
     source 学校 / 平台
     date   "2026-10" 这种，只用于显示
     note   笔记页路径，相对站点根目录
     orig   课程主页，留空字符串则不显示「原文」
   渲染逻辑在 assets/reading.js，两个脚本都要引入。
   ============================================================ */
window.COURSES = [
  {
    title: "CS336: Language Modeling from Scratch",
    source: "Stanford",
    date: "2026-10",
    note: "courses/stanford-cs336.html",
    orig: "https://cs336.stanford.edu/"
  },
  {
    title: "11-768: AI Agents (2026)",
    source: "CMU",
    date: "2026-10",
    note: "courses/cmu-11768.html",
    orig: "https://www.cmu-agents.com/"
  },
  {
    title: "CS329T: Building and Evaluating Agentic Systems",
    source: "Stanford",
    date: "2026-10",
    note: "courses/stanford-cs329t.html",
    orig: "https://web.stanford.edu/class/cs329t/index.html"
  }
];
