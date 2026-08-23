import Link from "next/link";
import { formatPostDate, type Post } from "@/data/posts";

export function PostIndex({ posts }: { posts: Post[] }) {
  return (
    <ol className="post-index">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/writing/${post.slug}/`}>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <h2>{post.title}</h2>
          </Link>
        </li>
      ))}
    </ol>
  );
}
