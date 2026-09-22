import Link from "next/link";
import { formatPostDate, type Post } from "@/lib/posts";

type PostListProps = {
  heading: string;
  href: string;
  posts: Post[];
  emptyLabel?: string;
};

export function PostList({ heading, href, posts, emptyLabel }: PostListProps) {
  const headingId = `list-${heading}`;

  return (
    <section className="post-column" aria-labelledby={headingId}>
      <header className="post-column-heading">
        <h2 id={headingId}>{heading}</h2>
        <Link href={href} aria-label={`查看全部${heading}`}>全部</Link>
      </header>
      <ul className="post-list">
        {posts.length > 0
          ? posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/writing/${post.slug}/`}>
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span>{post.title}</span>
                </Link>
              </li>
            ))
          : emptyLabel
            ? <li className="post-list-empty"><span>{emptyLabel}</span></li>
            : null}
      </ul>
    </section>
  );
}
