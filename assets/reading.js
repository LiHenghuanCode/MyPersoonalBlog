/* ============================================================
   阅读列表 —— 唯一数据源
   新增一条：在 READING 数组开头加一项（越靠前越新），
   然后把 reading/_template.html 复制成 note 指向的文件名去写笔记。
   字段：
     title  显示的标题
     source 出处（期刊 / 博客 / 作者，随意）
     date   "2026-10" 这种，只用于显示
     note   笔记页路径，相对站点根目录
     orig   原文链接，留空字符串则不显示「原文」
   ============================================================ */
window.READING = [
  {
    title: "美团技术团队 Agent 评测白皮书",
    source: "美团技术团队",
    date: "2026-10",
    note: "reading/meituan-agent-eval.html",
    orig: ""
  },
  {
    title: "aliyun / ai-agent-handbook",
    source: "阿里云 · GitHub",
    date: "2026-10",
    note: "reading/aliyun-agent-handbook.html",
    orig: "https://github.com/aliyun/ai-agent-handbook"
  },
  {
    title: "深度解析 Jev 模型：如何快速做结构化决策",
    source: "微信公众号",
    date: "2026-10",
    note: "reading/jev-model.html",
    orig: "https://mp.weixin.qq.com/s/OLWHlE9HAiZKFrz2WgjWcA"
  }
];

/* ---------- 渲染 ----------
   「最近在读」和「最近在学」共用这一个渲染函数：
     data-reading  → window.READING（本文件）
     data-courses  → window.COURSES（assets/courses.js）
   -------------------------------------------------------- */
(function () {
  function render(el, items, opts) {
    opts = opts || {};
    var base = opts.base || "";
    items = items || [];
    if (opts.limit) items = items.slice(0, opts.limit);

    el.textContent = "";
    if (!items.length) {
      var li = document.createElement("li");
      li.className = "empty";
      li.textContent = "还没有条目。";
      el.appendChild(li);
      return;
    }

    items.forEach(function (it) {
      var li = document.createElement("li");

      var a = document.createElement("a");
      a.className = "t";
      a.href = base + it.note;
      a.textContent = it.title;
      li.appendChild(a);

      var meta = document.createElement("div");
      meta.className = "meta";
      meta.textContent = [it.source, it.date].filter(Boolean).join(" · ");

      if (it.orig) {
        var o = document.createElement("a");
        o.className = "orig";
        o.href = it.orig;
        o.target = "_blank";
        o.rel = "noopener";
        o.textContent = opts.origText || "原文 ↗";
        meta.appendChild(o);
      }
      li.appendChild(meta);
      el.appendChild(li);
    });
  }

  // 自动渲染：给 <ul> 加 data-reading 或 data-courses 即可
  //   data-reading / data-courses   必需，二选一，决定用哪份数据
  //   data-base="../"               页面相对站点根目录的前缀
  //   data-limit="5"                只显示前 N 条
  var SOURCES = {
    "data-reading": { data: function () { return window.READING; }, origText: "原文 ↗" },
    "data-courses": { data: function () { return window.COURSES; }, origText: "主页 ↗" }
  };
  document.addEventListener("DOMContentLoaded", function () {
    Object.keys(SOURCES).forEach(function (attr) {
      var nodes = document.querySelectorAll("[" + attr + "]");
      Array.prototype.forEach.call(nodes, function (el) {
        render(el, SOURCES[attr].data(), {
          origText: SOURCES[attr].origText,
          base: el.getAttribute("data-base") || "",
          limit: parseInt(el.getAttribute("data-limit"), 10) || 0
        });
      });
    });
  });
})();
