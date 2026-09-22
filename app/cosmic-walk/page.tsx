import type { Metadata } from "next";
import Link from "next/link";
import { SectionSketch } from "@/components/SectionSketch";
import { formatPostDate, getPostsBySection } from "@/lib/posts";

export const metadata: Metadata = {
  title: "宇宙漫步"
};

export default function CosmicWalkPage() {
  const posts = getPostsBySection("cosmic-walk");

  return (
    <main id="main-content" className="page-width section-page cosmic-section">
      <header className="section-heading illustrated-heading cosmic-heading">
        <div className="section-heading-copy">
          <p className="eyebrow">COSMIC WALK</p>
          <h1>宇宙漫步</h1>
          <p className="section-intro">
            沿着那些尚未终结的思想轨道漫步，暂时把答案交给更辽阔的时间。
          </p>
        </div>
        <SectionSketch variant="orbit" />
      </header>

      {posts.length > 0 ? (
        <ol className="cosmic-index">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}/`}>
                <span className="cosmic-index-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="cosmic-index-copy">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <h2>{post.title}</h2>
                </span>
                <span className="cosmic-index-arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="section-empty cosmic-empty" role="status">
          <span className="section-empty-mark" aria-hidden="true">∴</span>
          <p>宇宙仍在等待下一次漫步。</p>
          <span>等一个问题沿着夜色浮现，再从这里写下它的轨迹。</span>
        </div>
      )}
    </main>
  );
}
