import Link from "next/link";
import { PhilosophyField } from "@/components/PhilosophyField";
import { PostList } from "@/components/PostList";
import { WhaleScene } from "@/components/WhaleScene";
import { getPostsBySection } from "@/data/posts";

export default function HomePage() {
  const fragments = getPostsBySection("fragments").slice(0, 3);
  const cosmicWalk = getPostsBySection("cosmic-walk").slice(0, 3);

  return (
    <main id="main-content" className="home-page">
      <div className="home-stage">
        <section className="hero" aria-labelledby="home-title">
          <PhilosophyField />
          <div className="hero-copy">
            <p className="eyebrow">THE WHITE WHALE / PLATE XLI</p>
            <h1 id="home-title">传信给你</h1>
            <p className="hero-statement">
              没有一种当下的判断，
              <br />
              有权垄断尚未发生的未来。
            </p>
            <div className="hero-reading" aria-hidden="true">
              <span>PHYSETER MACROCEPHALUS</span>
              <span>THE WHITE WHALE · CHAPTER XLI</span>
            </div>
          </div>
          <WhaleScene />
        </section>

        <div className="home-reader-frame">
          <div className="home-reader">
            <section className="home-columns" aria-label="最新文章">
              <PostList
                heading="日记碎片"
                href="/fragments/"
                posts={fragments}
              />
              <PostList
                heading="宇宙漫步"
                href="/cosmic-walk/"
                posts={cosmicWalk}
              />
            </section>

            <aside className="help-band" aria-labelledby="help-band-title">
              <div>
                <p className="eyebrow" id="help-band-title">REAL-WORLD SUPPORT</p>
                <p>文学与哲学可以陪伴我们理解痛苦，但不能替代治疗与紧急援助。</p>
              </div>
              <Link className="text-link help-band-link" href="/help/">
                如果你现在需要帮助
                <span aria-hidden="true"> →</span>
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
