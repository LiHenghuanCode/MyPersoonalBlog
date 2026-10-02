# 部署清单 — lihenghuan.com → GitHub Pages

| 项 | 值 |
|---|---|
| 域名 | `lihenghuan.com` |
| DNS 服务商 | 腾讯云 DNSPod（`dennis.dnspod.net` / `bridget.dnspod.net`，状态正常）|
| GitHub 仓库 | `LiHenghuanCode/MyPersoonalBlog` |
| Pages 默认地址 | `https://lihenghuancode.github.io/MyPersoonalBlog/` |
| 最终地址 | `https://lihenghuan.com` |

**不需要备案。** 备案管的是境内服务器，GitHub Pages 的机器在境外，域名解析到境外 IP 不涉及 ICP 备案，腾讯云那台未备案的服务器可以先搁着。代价是国内访问速度不稳定。

---

## Step 1 · 推代码

在 `MyPersoonalBlog` 目录下：

```bash
git add -A
git commit -m "init: personal homepage"
git branch -M main
git remote add origin https://github.com/LiHenghuanCode/MyPersoonalBlog.git
git push -u origin main
```

如果 `git remote add` 报 `remote origin already exists`，说明已经加过了，换成：

```bash
git remote set-url origin https://github.com/LiHenghuanCode/MyPersoonalBlog.git
```

如果仓库在 GitHub 上建的时候勾了 README，`git push` 会被拒（`fetch first`）。处理：

```bash
git pull --rebase origin main
git push -u origin main
```

仓库必须是 **Public**，免费账号的私有仓库开不了 Pages。

---

## Step 2 · 开 Pages

https://github.com/LiHenghuanCode/MyPersoonalBlog/settings/pages

- **Source** → `Deploy from a branch`
- **Branch** → `main`，目录 `/ (root)` → **Save**

等 1~2 分钟，打开 `https://lihenghuancode.github.io/MyPersoonalBlog/` 确认能看到页面。

**这一步必须先过**，再去动 DNS —— 否则后面出问题你分不清是 Pages 还是解析的毛病。

---

## Step 3 · DNSPod 加解析

https://console.dnspod.cn/ → 我的域名 → `lihenghuan.com` → 添加记录

线路类型一律「默认」，TTL 填 `600`：

| 主机记录 | 记录类型 | 记录值 |
|---|---|---|
| `@` | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `www` | CNAME | `lihenghuancode.github.io` |

注意 CNAME 的值是 `lihenghuancode.github.io`，**全小写、不带仓库名、不带斜杠**。

可选 —— IPv6，主机记录都填 `@`，类型 AAAA：

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

### 先清旧记录

域名之前如果解析过腾讯云那台服务器，**把旧的 `@` A 记录和 `www` 记录删掉**。留着的话流量会轮流打到两边，表现是「刷新一下换一个页面」。

腾讯云轻量应用服务器的「域名解析」入口有时会自动塞一条指向实例公网 IP 的记录，一并检查。

---

## Step 4 · 绑域名 + 开 HTTPS

回 Settings → Pages → **Custom domain** 填：

```
lihenghuan.com
```

裸域，不带 `https://`、不带 `www`。Save 之后：

1. GitHub 会自动往仓库提交一个 `CNAME` 文件 —— **别自己手写这个文件**。本地记得 `git pull`，不然会落后一个 commit，下次 push 冲突。
2. 域名下方显示 `DNS check in progress`，等绿勾 ✅。DNS 刚改完通常几分钟，最长 24 小时。
3. 绿勾出现后，勾上 **Enforce HTTPS**（Let's Encrypt 免费证书，自动续期）。这个勾选框一开始是灰的，证书签发要时间，**不用反复刷新，过一阵再来勾**。

完成后 `http://lihenghuan.com`、`http://www.lihenghuan.com`、`https://www.lihenghuan.com` 都会跳到 `https://lihenghuan.com`。

---

## Step 5 · 填内容

`index.html` 里已经填好的：姓名 `Henghuan Li`、邮箱 `lihenghuan3@gmail.com`、GitHub 链接、canonical / og 标签、页脚。

> 名字是按域名拼的罗马字，要是你习惯写 `Li Henghuan` 或中文「李恒焕」，直接改 `<h1>` 和页脚两处。

剩下全文搜 `【` 逐个替换。不要的板块（News / Publication / Leadership）整段删掉。PDF 简历的链接在侧栏注释里，有文件了放到仓库根目录、取消注释即可。

配色改 `:root` 里的 `--accent`（现在是砖红 `#b4552d`）。

改完推送：

```bash
git add -A && git commit -m "update content" && git push
```

30 秒到 1 分钟自动生效，看到旧版就强刷 `Ctrl+Shift+R`。

---

## 排查

```bash
# 看裸域解析对不对，应返回那 4 个 185.199.x.153
nslookup lihenghuan.com

# 看 www 的 CNAME
nslookup www.lihenghuan.com
```

| 现象 | 原因 |
|---|---|
| `lihenghuancode.github.io/MyPersoonalBlog/` 能开，`lihenghuan.com` 404 | DNS 没生效，或 `@` 的 A 记录填错。先 `nslookup` 验 |
| 自定义域名打开是别的内容 / 刷新就变 | 旧的 A 或 CNAME 记录没删干净 |
| Pages 里 Custom domain 报 `improperly configured` | A 记录不全（必须 4 条都加），或 DNS 还在传播 |
| Enforce HTTPS 勾不上（灰的） | 证书还在签，等；或 DNS check 还没出绿勾 |
| 推送后页面没变 | 看仓库 Actions 页签有没有 `pages build and deployment` 跑成功；或者就是浏览器缓存 |
| 国内打开慢 / 时断时续 | GitHub Pages 在境外，正常。套 Cloudflare 免费 CDN 能缓一点，但国内效果有限 |

---

## 以后想加博客文章

现在只有一个静态页。要持续写文章（Markdown 写、自动生成列表和归档），用 Hugo —— Go 写的，和你这个 `go/MyProjects` 目录很搭：`hugo new site` 之后把这个简历页改成首页模版，GitHub Actions 自动构建部署，仓库和域名都不用换。
