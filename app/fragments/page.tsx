import type { Metadata } from "next";
import Link from "next/link";
import { SectionSketch } from "@/components/SectionSketch";
import { getPostsBySection, type Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "情绪手记",
  description: "记录每日的琐碎与情绪起伏，留给未来的自己一封关于此刻的信。"
};

export default function FragmentsPage() {
  const months = new Map<string, Post[]>();
  for (const post of getPostsBySection("fragments")) {
    const month = post.date.slice(0, 7);
    const entries = months.get(month) ?? [];
    entries.push(post);
    months.set(month, entries);
  }

  return (
    <main id="main-content" className="page-width section-page journal-section">
      <header className="section-heading illustrated-heading journal-heading">
        <div className="section-heading-copy">
          <p className="eyebrow">EMOTIONAL DIARY</p>
          <h1>情绪手记</h1>
          <p className="section-intro">
            把每一天的琐碎与心绪写进日记，留给未来的自己一封关于此刻的信。
          </p>
        </div>
        <SectionSketch variant="journal" />
      </header>

      <div className="journal-archive">
        {Array.from(months, ([month, entries]) => (
          <section className="journal-month" key={month} aria-labelledby={`month-${month}`}>
            <header className="journal-month-heading">
              <h2 id={`month-${month}`}>
                <span>{month.slice(0, 4)} 年</span>
                {month.slice(5)}<small>月</small>
              </h2>
              <p>{entries.length} 篇日记</p>
            </header>
            <ol className="journal-entries">
              {entries.map((post) => (
                <li key={post.slug}>
                  <Link href={`/writing/${post.slug}/`}>
                    <time dateTime={post.date} aria-label={post.date}>
                      {post.date.slice(8)}<small>日</small>
                    </time>
                    <h3>{post.title}</h3>
                    <span className="journal-entry-arrow" aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
        {months.size === 0 ? (
          <div className="section-empty">
            <span className="section-empty-mark" aria-hidden="true">—</span>
            <p>今天的情绪，还没有被写下。</p>
            <span>从一个感受开始，慢慢记录此刻的自己。</span>
          </div>
        ) : null}
      </div>
    </main>
  );
}
