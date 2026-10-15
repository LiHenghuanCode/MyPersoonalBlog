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
    title: "示例：这条怎么写（看一眼就删）",
    source: "站点说明",
    date: "2026-10",
    note: "reading/_template.html",
    orig: ""
  }
];

/* ---------- 渲染 ---------- */
(function () {
  function render(el, opts) {
    opts = opts || {};
    var base = opts.base || "";
    var items = window.READING || [];
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
        o.textContent = "原文 ↗";
        meta.appendChild(o);
      }
      li.appendChild(meta);
      el.appendChild(li);
    });
  }

  // 自动渲染：给 <ul> 加 data-reading 即可
  //   data-reading       必需
  //   data-base="../"    页面相对站点根目录的前缀
  //   data-limit="5"     只显示前 N 条
  document.addEventListener("DOMContentLoaded", function () {
    var nodes = document.querySelectorAll("[data-reading]");
    Array.prototype.forEach.call(nodes, function (el) {
      render(el, {
        base: el.getAttribute("data-base") || "",
        limit: parseInt(el.getAttribute("data-limit"), 10) || 0
      });
    });
  });
})();
