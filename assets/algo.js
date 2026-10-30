/* ============================================================
   算法思考 —— 唯一数据源（首页左侧栏「算法思考」）
   新增一篇：在 ALGO 数组开头加一项（越靠前越新），
   然后把 algo/_template.html 复制成 note 指向的文件名去写文章。
   字段（和 assets/reading.js 的 READING 一致）：
     title  显示的标题
     source 分类 / 标签，比如 "Java · 刷题模板"
     date   "2026-10" 这种，只用于显示
     note   文章页路径，相对站点根目录
     orig   题目链接（如 LeetCode / 洛谷），留空字符串则不显示
   渲染逻辑在 assets/reading.js，两个脚本都要引入。
   ============================================================ */
window.ALGO = [
  {
    title: "贪心算法：五类套路与十道经典题",
    source: "贪心 · 左程云算法课",
    date: "2026-10",
    note: "algo/greedy.html",
    orig: ""
  },
  {
    title: "图论：建图、拓扑排序、最小生成树与最短路",
    source: "图论 · 左程云算法课",
    date: "2026-10",
    note: "algo/graph.html",
    orig: ""
  },
  {
    title: "排序算法：从 O(n²) 到基数排序",
    source: "排序 · 左程云算法课",
    date: "2026-10",
    note: "algo/sorting.html",
    orig: ""
  },
  {
    title: "Java 刷题：高效输入输出与空间复用",
    source: "Java · 刷题模板",
    date: "2026-10",
    note: "algo/java-fast-io.html",
    orig: ""
  }
];
