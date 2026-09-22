import type { Metadata } from "next";
import Link from "next/link";
import { formatPostDate, getPostsBySection } from "@/lib/posts";

export const metadata: Metadata = {
  title: "人间拾光",
  description: "收藏生活里偶然亮起的光，以及那些值得回看的瞬间。"
};

export default function GalleryPage() {
  const posts = getPostsBySection("gallery");

  return (
    <main id="main-content" className="page-width section-page gallery-section">
      <header className="section-heading gallery-heading">
        <p className="eyebrow">SMALL LIGHTS</p>
        <h1>人间拾光</h1>
        <p className="section-intro">
          不急着给生活下结论，只把偶然遇见的光线、声音和表情暂时保存下来。
        </p>
      </header>

      {posts.length > 0 ? (
        <ul className="gallery-grid">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link className="gallery-card" href={`/writing/${post.slug}/`}>
                {post.cover ? (
                  <span className="gallery-card-image">
                    <img src={post.cover} alt={post.coverAlt ?? post.title} />
                  </span>
                ) : (
                  <span className="gallery-card-placeholder" aria-hidden="true">
                    <span>{post.title.slice(0, 1)}</span>
                  </span>
                )}
                <span className="gallery-card-meta">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  {post.location ? <span>{post.location}</span> : null}
                </span>
                <h2>{post.title}</h2>
                {post.excerpt ? <p>{post.excerpt}</p> : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="section-empty gallery-empty" role="status">
          <span className="section-empty-mark" aria-hidden="true">✶</span>
          <p>这里还没有被保存的光。</p>
          <span>等一个值得回看的瞬间，等一张愿意留下来的照片。</span>
        </div>
      )}
    </main>
  );
}
