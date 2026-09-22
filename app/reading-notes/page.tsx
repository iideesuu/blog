import type { Metadata } from "next";
import Link from "next/link";
import { SectionSketch } from "@/components/SectionSketch";
import { formatPostDate, getPostsBySection } from "@/lib/posts";

export const metadata: Metadata = {
  title: "书页回声",
  description: "从书页出发，记录阅读留下的疑问、片段与回声。"
};

export default function ReadingNotesPage() {
  const posts = getPostsBySection("reading-notes");

  return (
    <main id="main-content" className="page-width section-page reading-notes-section">
      <header className="section-heading illustrated-heading reading-notes-heading">
        <div className="section-heading-copy">
        <p className="eyebrow">MARGIN NOTES</p>
        <h1>书页回声</h1>
        <p className="section-intro">
          读过的书不会安静地留在书架上。它们在某个下午、一次谈话或一段沉默里重新发声。
        </p>
        </div>
        <SectionSketch variant="book" />
      </header>

      <div className="reading-desk">
        <aside className="reading-margin">
          <h2>页边记</h2>
          <p>留下一句摘录，<br />也留下一点自己的声音。</p>
        </aside>
        <div className="reading-pages">
      {posts.length > 0 ? (
        <ol className="reading-index">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}/`}>
                <span className="reading-index-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="reading-index-copy">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <h2>{post.title}</h2>
                  {post.book ? (
                    <span className="reading-book">
                      {post.book}{post.bookAuthor ? ` · ${post.bookAuthor}` : ""}
                    </span>
                  ) : null}
                  {post.excerpt ? <span className="reading-excerpt">{post.excerpt}</span> : null}
                </div>
                <span className="reading-index-arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="section-empty" role="status">
          <span className="section-empty-mark" aria-hidden="true">∴</span>
          <p>书页还没有留下新的回声。</p>
          <span>下一次读到想要停留的句子，就从这里开始。</span>
        </div>
      )}
        </div>
      </div>
    </main>
  );
}
