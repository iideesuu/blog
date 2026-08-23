import Link from "next/link";
import { formatPostDate, type Post } from "@/lib/posts";

type PostListProps = {
  heading: string;
  href: string;
  posts: Post[];
};

export function PostList({ heading, href, posts }: PostListProps) {
  const headingId = `list-${heading}`;

  return (
    <section className="post-column" aria-labelledby={headingId}>
      <header className="post-column-heading">
        <h2 id={headingId}>{heading}</h2>
        <Link href={href} aria-label={`查看全部${heading}`}>全部</Link>
      </header>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/writing/${post.slug}/`}>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span>{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
