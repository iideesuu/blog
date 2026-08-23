import type { Metadata } from "next";
import { PostIndex } from "@/components/PostIndex";
import { getPostsBySection } from "@/lib/posts";

export const metadata: Metadata = {
  title: "日记碎片"
};

export default function FragmentsPage() {
  return (
    <main id="main-content" className="page-width section-page">
      <header className="section-heading">
        <p className="eyebrow">FRAGMENTS</p>
        <h1>日记碎片</h1>
      </header>
      <PostIndex posts={getPostsBySection("fragments")} />
    </main>
  );
}
