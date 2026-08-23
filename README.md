# 传信予你 · 半量 Demo

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

## 写作与发布

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

## 本期范围

- 响应式双联页首页、原创 Moby Dick 蚀刻 SVG 与多语言哲学语录轨道
- 日记碎片、宇宙漫步两个栏目
- Markdown 文章工作流、正文模板与少量版式示例
- 独立的需要帮助页面
- 桌面端、移动端和减少动态效果适配

文章正文目前是用于验证版式的占位内容，不从私人聊天记录直接发布。完整内容系统、RSS、搜索和正式部署留在第二阶段。
