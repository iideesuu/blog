第二优先级：为超长哲学文章设计阅读工具
两篇“宇宙漫步”分别超过 800 行和 1100 行，而文章页目前基本只有标题、日期、正文和返回入口：[page.tsx (line 40)](C:/Users/zhaonian.cao/ZOO/blog/app/writing/[slug]/page.tsx:40)。
建议优先增加：
- 自动文章目录与标题锚点。
- 阅读进度。
- 顶部摘要、预计阅读时间。
- “上一篇/下一篇”。
- 脚注、参考文献返回链接。
- 移动端浮动目录或折叠目录。
- 对一级标题过多的问题建立内容编排规范。
现在内容规模已经接近“小册章节”，继续用普通博客正文承载会让读者很难建立方位感。
第三优先级：吸收 life-blog 的内容模型
life-blog 的内容 schema 支持 summary、tags、mood、contentWarning：[content.config.mjs (line 6)](C:/Users/zhaonian.cao/ZOO/life-blog/src/content.config.mjs:6)。blog 目前只有标题、日期、草稿和 demo：[posts.ts (line 20)](C:/Users/zhaonian.cao/ZOO/blog/lib/posts.ts:20)。
建议给 blog 增加统一的：
- summary：首页、栏目页和分享描述使用。
- tags：哲学家、时代、主题等横向组织。
- description：文章级 SEO。
- contentWarning：敏感内容提示。
- updated：长文修订日期。
- series/order：宇宙漫步系列排序。
- readingTime：长文章尤其需要。
blog 自研的内容校验其实比 life-blog 更严谨——能检查日期、slug、重复文件名、空正文等，值得保留；只需扩充 schema，不必为了这些字段改用 Astro。
第四优先级：明确它究竟是“私人站”还是“公开博客”
目前存在目标冲突：
- 已配置正式域名 blog.deesuu.com。
- README 写了 GitHub Pages 正式发布流程。
- 页面具有完整站点品牌。
- 但 [robots.txt (line 1)](C:/Users/zhaonian.cao/ZOO/blog/public/robots.txt:1) 使用 Disallow: /，禁止所有遵守规则的搜索引擎抓取。
如果目标是私人分享，当前设置合理，但不应再投入大量 SEO 工作。如果希望陌生读者发现哲学文章，则建议开放抓取，并补充：
- sitemap、RSS/Atom。
- canonical URL。
- Open Graph 与分享图。
- 每篇文章独立 description。
- 结构化文章数据。
另外，当前文章路由统一是 /writing/{slug}，并要求两个栏目文件名全局唯一。长期可考虑使用 /cosmic-walk/{slug}、/fragments/{slug}，让 URL 体现信息架构。
第五优先级：让“个人博客”里出现更多作者本人
blog 的品牌语言和视觉已经很成熟，但首页一侧是文学宣言，主要内容又是两篇百科式哲学长文。读者可能记住“漂亮、详尽”，却不知道作者是谁、为什么写。
建议下一批内容不要继续扩张哲学史覆盖面，而是补：
- 简短的“关于我/关于本站”页面。
- 哲学长文前的作者缘起和个人问题。
- 更多真正的“日记碎片”。
- 每篇长文结尾的个人判断或阅读札记。
- 明确文章是原创研究、整理、翻译还是 AI 辅助生成。
这是 blog 成为作品而非主题 Demo 的关键。README 当前也直接说明文章是版式验证内容：[README.md (line 146)](C:/Users/zhaonian.cao/ZOO/blog/README.md:146)。
