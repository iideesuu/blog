import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import type { Heading, Root } from "mdast";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export const sectionConfig = {
  fragments: {
    label: "日记碎片",
    href: "/fragments/"
  },
  "cosmic-walk": {
    label: "宇宙漫步",
    href: "/cosmic-walk/"
  }
} as const;

export type Section = keyof typeof sectionConfig;

export type Post = {
  slug: string;
  section: Section;
  title: string;
  author: string;
  date: string;
  demo: boolean;
  html: string;
  tableOfContents: TableOfContentsItem[];
};

export type TableOfContentsItem = {
  id: string;
  title: string;
  depth: number;
};

type LoadedPost = Post & {
  draft: boolean;
  sourcePath: string;
};

const contentRoot = path.join(process.cwd(), "content");
const sections = Object.keys(sectionConfig) as Section[];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const sanitizedHeadingIdPrefix = "user-content-";

function sourceLabel(sourcePath: string) {
  return path.relative(process.cwd(), sourcePath);
}

function contentError(sourcePath: string, message: string): never {
  throw new Error(`[Markdown 内容错误] ${sourceLabel(sourcePath)}：${message}`);
}

function readTitle(value: unknown, sourcePath: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    contentError(sourcePath, "front matter 中必须填写非空的 title。");
  }

  return value.trim();
}

function readAuthor(value: unknown, sourcePath: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    contentError(sourcePath, "front matter 中必须填写非空的 author。");
  }

  return value.trim();
}

function readDate(value: unknown, sourcePath: string) {
  const normalized = value instanceof Date && !Number.isNaN(value.getTime())
    ? value.toISOString().slice(0, 10)
    : typeof value === "string"
      ? value.trim()
      : "";

  if (!datePattern.test(normalized)) {
    contentError(sourcePath, "date 必须使用 YYYY-MM-DD 格式，例如 \"2026-08-23\"。");
  }

  const parsedDate = new Date(`${normalized}T00:00:00Z`);
  if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== normalized) {
    contentError(sourcePath, `date 不是有效日期：${normalized}。`);
  }

  return normalized;
}

function readBoolean(value: unknown, fallback: boolean, field: string, sourcePath: string) {
  if (value === undefined) {
    return fallback;
  }

  if (typeof value !== "boolean") {
    contentError(sourcePath, `${field} 只能填写 true 或 false。`);
  }

  return value;
}

function nodeText(node: unknown): string {
  if (!node || typeof node !== "object") {
    return "";
  }

  if ("value" in node && typeof node.value === "string") {
    return node.value;
  }

  if ("alt" in node && typeof node.alt === "string") {
    return node.alt;
  }

  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map(nodeText).join("");
  }

  return "";
}

function addHeadingAnchors(tableOfContents: TableOfContentsItem[]) {
  return (tree: Root) => {
    const slugger = new GithubSlugger();

    for (const node of tree.children) {
      if (node.type !== "heading") {
        continue;
      }

      const heading = node as Heading;
      const title = nodeText(heading).trim();
      const id = slugger.slug(title || "section");

      heading.data = {
        ...heading.data,
        hProperties: {
          ...heading.data?.hProperties,
          id
        }
      };

      if (heading.depth === 2) {
        // remark-html 的默认安全规则会给 id 加此前缀，目录必须指向最终输出的值。
        tableOfContents.push({
          id: `${sanitizedHeadingIdPrefix}${id}`,
          title,
          depth: heading.depth
        });
      }
    }
  };
}

function renderMarkdown(markdown: string, sourcePath: string) {
  const tableOfContents: TableOfContentsItem[] = [];

  try {
    const html = String(
      remark()
        .use(remarkGfm)
        .use(() => addHeadingAnchors(tableOfContents))
        .use(remarkHtml, { allowDangerousHtml: false })
        .processSync(markdown)
    );

    return { html, tableOfContents };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    contentError(sourcePath, `Markdown 正文无法解析：${reason}`);
  }
}

function readPost(section: Section, fileName: string): LoadedPost {
  const sourcePath = path.join(contentRoot, section, fileName);
  const slug = path.basename(fileName, path.extname(fileName));

  if (!slugPattern.test(slug)) {
    contentError(sourcePath, "文件名只能包含小写英文字母、数字和连字符，例如 my-first-post.md。");
  }

  let parsed: ReturnType<typeof matter>;
  try {
    parsed = matter(readFileSync(sourcePath, "utf8"));
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    contentError(sourcePath, `front matter 无法解析：${reason}`);
  }

  const draft = readBoolean(parsed.data.draft, false, "draft", sourcePath);
  const demo = readBoolean(parsed.data.demo, false, "demo", sourcePath);

  if (!draft && parsed.content.trim().length === 0) {
    contentError(sourcePath, "准备发布的文章不能没有正文；未完成时可设置 draft: true。");
  }

  const rendered = renderMarkdown(parsed.content, sourcePath);

  return {
    slug,
    section,
    title: readTitle(parsed.data.title, sourcePath),
    author: readAuthor(parsed.data.author, sourcePath),
    date: readDate(parsed.data.date, sourcePath),
    draft,
    demo,
    html: rendered.html,
    tableOfContents: rendered.tableOfContents,
    sourcePath
  };
}

function loadPosts(): Post[] {
  const loadedPosts = sections.flatMap((section) => {
    const sectionDirectory = path.join(contentRoot, section);

    if (!existsSync(sectionDirectory)) {
      throw new Error(`[Markdown 内容错误] 缺少栏目目录：${sourceLabel(sectionDirectory)}。`);
    }

    return readdirSync(sectionDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === ".md")
      .map((entry) => readPost(section, entry.name));
  });

  const slugSources = new Map<string, string>();
  for (const post of loadedPosts) {
    const previousSource = slugSources.get(post.slug);
    if (previousSource) {
      contentError(
        post.sourcePath,
        `文件名生成的 slug “${post.slug}” 与 ${sourceLabel(previousSource)} 重复。`
      );
    }
    slugSources.set(post.slug, post.sourcePath);
  }

  return loadedPosts
    .filter((post) => !post.draft)
    .map(({ slug, section, title, author, date, demo, html, tableOfContents }) => ({
      slug,
      section,
      title,
      author,
      date,
      demo,
      html,
      tableOfContents
    }))
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export const posts = loadPosts();

export function getPostsBySection(section: Section) {
  return posts.filter((post) => post.section === section);
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return `${year}年${month}月${day}日`;
}
