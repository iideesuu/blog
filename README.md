# 传信予你

这是一个以深海蓝与《白鲸》为视觉底色的 React 博客。首页采用响应式双联页布局：左页是取自小说特征的抹香鲸海事蚀刻画与多语言思想语录，右页是一扇窄幅阅读窗。文章使用 Markdown 写作，构建与静态文件服务都在容器中运行。

## 本地运行

宿主机只需要 Docker，不需要安装 Node.js。

    docker compose up --build -d

打开：http://127.0.0.1:8080

查看状态与日志：

    docker compose ps
    docker compose logs --no-color web

停止容器：

    docker compose down

## Markdown 写作

文章只需要放进 `content/` 下对应的栏目目录：

```text
content/
├── fragments/        # 日记碎片
│   └── an-ordinary-afternoon.md
└── cosmic-walk/      # 宇宙漫步
    └── let-the-future-object.md
```

最简单的写作步骤：

1. 复制 `content/_template.md` 到目标栏目目录。
2. 把文件改成新的英文名称；只使用小写字母、数字和连字符，例如 `a-rainy-night.md`。
3. 修改文件顶部的标题和日期，然后在第二个 `---` 下面写正文。
4. 写完后把 `draft` 改成 `false`。
5. 保存文件，在 `blog` 目录执行 `docker compose up --build -d`。
6. 构建完成后刷新 <http://127.0.0.1:8080>。

每篇文章的基本格式：

```md
---
title: "一个雨夜"
date: "2026-08-24"
draft: false
---

从这里开始写正文。

## 二级标题

普通段落之间留一个空行。

> 这是引用文字。
```

- 文件所在目录决定栏目，不需要另外填写栏目名称。
- 文件名决定文章地址：`a-rainy-night.md` 会生成 `/writing/a-rainy-night/`。
- 两个栏目不能使用相同的文件名。
- `title` 和 `date` 必填；日期使用 `YYYY-MM-DD` 格式并保留引号。
- `draft: true` 表示草稿，不会出现在首页、栏目或文章页面；准备发布时改成 `false`。
- `demo: true` 只用于现有示例文章，正式文章不需要填写。
- Markdown 原始文件不会直接公开；构建会把已发布文章转换成静态 HTML。

文章图片放进 `public/images/posts/`，正文中这样引用：

```md
![图片说明](/images/posts/example.jpg)
```

构建时会检查缺少标题、无效日期、错误布尔值、空正文和重复文件名，并在终端中指出具体文件。运行中的生产容器不会监听 Markdown 改动，所以每次新增、修改或删除文章后都需要重新构建。

## 发布到 GitHub Pages

发布目录固定为仓库根目录的 `dist/`。它是从容器中复制出来的静态站点，也是 `git subtree` 的发布前缀；不要直接编辑其中的文件。

仓库已经预置：

```text
public/CNAME
public/.nojekyll   # 避免 GitHub Pages 忽略 _next 资源
```

它们会在构建时自动进入静态产物根目录。`CNAME` 必须保持大写，内容只能是域名，不能带 `https://`、路径或结尾斜杠。

每次新增、修改或删除文章后，在仓库根目录依次执行：

```bash
# 1. 构建容器，并用容器内的 /app/out 完整替换本地 dist/
./scripts/export-static.sh

# 2. 提交 Markdown、文章图片和生成后的静态文件
git add content public dist
git status --short
git commit -m "content: update posts"

# 3. 只把 dist/ 的内容推送到远端 gh-pages 分支
git subtree push --prefix dist origin gh-pages
```

导出脚本会执行 `docker compose up --build -d`，等待容器健康，再检查 `index.html`、`CNAME`、`.nojekyll`、`robots.txt` 和 `LICENSE`；全部成功后才整体替换 `dist/`。因此构建失败时不会误发旧内容，删除或改名的旧文章也不会残留。`git subtree` 只能读取已经提交的内容，所以必须先执行 `git commit`，再执行 `git subtree push`。

这套流程不会切换本地分支，也不会执行 `git push origin main`。不要切换到 `gh-pages` 后手动复制文件，也不要使用 `git push origin main:gh-pages`。如果除文章外还修改了页面、样式或发布脚本，请在提交时一并 `git add` 对应的源文件。

### 第一次启用 Pages

第一次执行 subtree 命令会创建远端 `gh-pages` 分支。随后需要在 GitHub 仓库完成一次设置：

1. 打开 **Settings → Pages**。
2. Source 选择 **Deploy from a branch**。
3. 分支选择 `gh-pages`，目录选择 `/(root)`。
4. Custom domain 填写 `blog.deesuu.com`。
5. DNS 生效后启用 **Enforce HTTPS**。

以后发布新内容时，只需要编辑 `content/` 中的 Markdown，然后重复“导出 → 提交 → subtree push”三步。

## 爬虫规则

正常内容页面不输出 `noindex` 或 `nofollow` 元数据；Next.js 生成的 404 错误页会保留框架自动添加的 `noindex`，避免无效地址进入搜索结果。根目录的 `robots.txt` 使用下面的规则，请求遵守 Robots Exclusion Protocol 的爬虫不要访问任何页面：

```text
User-agent: *
Disallow: /
```

`robots.txt` 是公开约定而不是访问控制，不能阻止无视规则的采集程序直接请求公开页面。

## 许可证

本项目采用 [MIT License](./LICENSE)。

### TODO

已完成：

- [x] 启用 GFM 表格，并为窄屏表格增加横向滚动。
- [x] 规范哲学长文的标题层级，为标题生成稳定锚点，并增加轻量可折叠目录。
- [x] 修复移动页面顶部下拉时露出浅色跳转框的问题，同时保留键盘和屏幕阅读器使用的“跳到主要内容”入口。

后续先决定：

1. 是否允许搜索引擎收录。`robots.txt` 当前是 `Disallow: /`；如果这是有意的低曝光策略则保持不变，如果希望公开搜索发现，则先开放抓取。
2. 确认公开收录后，再依次补充每篇独立摘要和短 SEO 标题、canonical 与 `sitemap.xml`。

暂缓：

- 上一篇、下一篇和相关阅读。
- 逐篇 Open Graph 分享图、RSS、Twitter 专属字段与 `BlogPosting` 结构化数据。
