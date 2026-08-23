# 传信予你

这是一个以深海蓝与《白鲸》为视觉底色的 React 博客 Demo。首页采用响应式双联页布局：左页是取自小说特征的抹香鲸海事蚀刻画与多语言思想语录，右页是一扇窄幅阅读窗；首期只包含两个内容栏目和一个独立帮助页面。文章使用 Markdown 写作，构建与静态文件服务都在容器中运行。

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
public/CNAME       # 自定义域名：blog.deesuu.com
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

导出脚本会执行 `docker compose up --build -d`，等待容器健康，再检查 `index.html`、`CNAME` 和 `.nojekyll`；全部成功后才整体替换 `dist/`。因此构建失败时不会误发旧内容，删除或改名的旧文章也不会残留。`git subtree` 只能读取已经提交的内容，所以必须先执行 `git commit`，再执行 `git subtree push`。

这套流程不会切换本地分支，也不会执行 `git push origin main`。不要切换到 `gh-pages` 后手动复制文件，也不要使用 `git push origin main:gh-pages`。如果除文章外还修改了页面、样式或发布脚本，请在提交时一并 `git add` 对应的源文件。

### 第一次启用 Pages

第一次执行 subtree 命令会创建远端 `gh-pages` 分支。随后需要在 GitHub 仓库完成一次设置：

1. 打开 **Settings → Pages**。
2. Source 选择 **Deploy from a branch**。
3. 分支选择 `gh-pages`，目录选择 `/(root)`。
4. Custom domain 填写 `blog.deesuu.com`。
5. DNS 生效后启用 **Enforce HTTPS**。

在域名服务商处添加下面的 DNS 记录：

```text
类型：CNAME
主机记录：blog
目标：iideesuu.github.io
```

自定义域名生效前，通过 `https://iideesuu.github.io/blog/` 预览可能出现资源路径错误；正式访问地址以 `https://blog.deesuu.com/` 为准。

以后发布新内容时，只需要编辑 `content/` 中的 Markdown，然后重复“导出 → 提交 → subtree push”三步。

## 本期范围

- 响应式双联页首页、原创 Moby Dick 蚀刻 SVG 与多语言哲学语录轨道
- 日记碎片、宇宙漫步两个栏目
- Markdown 文章工作流、正文模板与少量版式示例
- Docker 静态导出、Git subtree 与 GitHub Pages 发布流程
- 独立的需要帮助页面
- 桌面端、移动端和减少动态效果适配

文章正文目前是用于验证版式的占位内容，不从私人聊天记录直接发布。RSS、搜索与其他内容能力留在后续阶段。
