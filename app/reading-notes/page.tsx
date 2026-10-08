import type { Metadata } from "next";
import Link from "next/link";
import { SectionSketch } from "@/components/SectionSketch";
import { formatPostDate, getPostsBySection } from "@/lib/posts";

export const metadata: Metadata = {
  title: "回声拾贝",
  description: "收录读后感与关于世界、自我和生活的思考文章，让书页里的触动与日常的追问继续回响。"
};

export default function ReadingNotesPage() {
  const posts = getPostsBySection("reading-notes");

  return (
    <main id="main-content" className="page-width section-page reading-notes-section">
      <header className="section-heading illustrated-heading reading-notes-heading">
        <div className="section-heading-copy">
          <p className="eyebrow">ECHO SHELLS</p>
          <h1>回声拾贝</h1>
          <p className="section-intro">
            把书页里的触动与生活中的追问写成文字，让关于世界与自己的思考在这里回响。
          </p>
        </div>
        <SectionSketch variant="book" />
      </header>

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
            <p>这里还没有留下新的回声。</p>
            <span>下一次读到想要停留的句子，或想到值得写下的问题，就从这里开始。</span>
          </div>
        )}
      </div>
    </main>
  );
}
