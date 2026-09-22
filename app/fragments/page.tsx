import type { Metadata } from "next";
import Link from "next/link";
import { SectionSketch } from "@/components/SectionSketch";
import { getPostsBySection, type Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "朝夕手记",
  description: "记下平常日子里的念头与心绪，让每一个朝夕都有迹可循。"
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
          <p className="eyebrow">DAY BY DAY</p>
          <h1>朝夕手记</h1>
          <p className="section-intro">
            把一天里的念头与心绪写下来。平常的日子，也有值得寄往明天的话。
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
              <p>{entries.length} 则手记</p>
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
            <p>新的一页，留给今天。</p>
            <span>从一个念头开始，慢慢写下平常的日子。</span>
          </div>
        ) : null}
      </div>
    </main>
  );
}
