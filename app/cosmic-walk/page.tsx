import type { Metadata } from "next";
import { PostIndex } from "@/components/PostIndex";
import { getPostsBySection } from "@/lib/posts";

export const metadata: Metadata = {
  title: "宇宙漫步"
};

export default function CosmicWalkPage() {
  return (
    <main id="main-content" className="page-width section-page cosmic-section">
      <header className="section-heading">
        <p className="eyebrow">COSMIC WALK</p>
        <h1>宇宙漫步</h1>
      </header>
      <PostIndex posts={getPostsBySection("cosmic-walk")} />
    </main>
  );
}
