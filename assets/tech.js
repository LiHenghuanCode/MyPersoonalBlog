/* ============================================================
   互联网通用技术开发 —— 唯一数据源（首页左侧栏「互联网通用技术开发」）
   新增一篇：在 TECH 数组开头加一项（越靠前越新），
   然后把 tech/_template.html 复制成 note 指向的文件名去写文章。
   字段（和 assets/reading.js 的 READING 一致）：
     title  显示的标题
     source 分类 / 标签，比如 "Java · Redis"
     date   "2026-10" 这种，只用于显示
     note   文章页路径，相对站点根目录
     orig   源码仓库链接，留空字符串则不显示
   渲染逻辑在 assets/reading.js，两个脚本都要引入。
   ============================================================ */
window.TECH = [
  {
    title: "点评项目：Redis 缓存、秒杀与异步下单",
    source: "Java · Redis · RabbitMQ",
    date: "2026-10",
    note: "tech/dianping.html",
    orig: "https://github.com/LiHenghuanCode/dianping"
  }
];
