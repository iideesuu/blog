import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getPostBySlug, posts, sectionConfig } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const section = sectionConfig[post.section];

  return (
    <main id="main-content" className="article-page" data-section={post.section}>
      <article>
        <header className="article-heading">
          <Link className="article-section" href={section.href}>{section.label}</Link>
          <h1>{post.title}</h1>
          <div className="article-meta">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {post.demo ? <span>Demo 示例文本</span> : null}
          </div>
        </header>

        {post.tableOfContents.length > 0 ? (
          <nav className="article-toc" aria-label="文章目录">
            <details>
              <summary>目录</summary>
              <ol>
                {post.tableOfContents.map((item) => (
                  <li key={item.id} data-depth={item.depth}>
                    <a href={`#${item.id}`}>{item.title}</a>
                  </li>
                ))}
              </ol>
            </details>
          </nav>
        ) : null}

        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      <nav className="article-end" aria-label="文章结束后的入口">
        <Link className="text-link" href={section.href}>返回{section.label}</Link>
        <Link className="text-link" href="/help/">如果你现在需要帮助</Link>
      </nav>
    </main>
  );
}
