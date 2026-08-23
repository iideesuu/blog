import Link from "next/link";
import { PhilosophyField } from "@/components/PhilosophyField";
import { PostList } from "@/components/PostList";
import { WhaleScene } from "@/components/WhaleScene";
import { getPostsBySection } from "@/lib/posts";

export default function HomePage() {
  const fragments = getPostsBySection("fragments").slice(0, 3);
  const cosmicWalk = getPostsBySection("cosmic-walk").slice(0, 3);

  return (
    <main id="main-content" className="home-page">
      <div className="home-stage">
        <section className="hero" aria-labelledby="home-title">
          <PhilosophyField />
          <div className="hero-copy">
            <p className="eyebrow">“AND I ONLY AM ESCAPED ALONE TO TELL THEE” — JOB</p>
            <h1 id="home-title">传信予你</h1>
            <p className="hero-statement">
              没有一种当下的判断，
              <br />
              有权垄断尚未发生的未来。
            </p>
            <div className="hero-reading" aria-hidden="true">
              <span>PHYSETER MACROCEPHALUS</span>
              <span>MOBY-DICK · EPILOGUE</span>
            </div>
          </div>
          <WhaleScene />
        </section>

        <div className="home-reader-frame">
          <div className="home-reader">
            <aside className="ishmael-note" aria-labelledby="ishmael-title">
              <p className="eyebrow" id="ishmael-title">以实玛利</p>
              <p className="ishmael-opening">就叫我以实玛利吧。</p>
              <p className="ishmael-copy">
                我从海上听到白鲸的回声，与那些关于意义、生活和宇宙的漫长对话，留在这里。即便我依然会觉得一切毫无意义，但我不愿让这种判断成为最后的判词。我希望更多的人不再独自沉沦，换一个角度阅读人生，走出沉船的阴霾，走向太阳底下尚未命名的未知。
              </p>
              <p className="ishmael-boundary">
                文学与哲学可以陪伴我们理解痛苦，但不能替代治疗与紧急援助。
              </p>
              <Link className="text-link help-band-link" href="/help/">
                如果你现在需要帮助
                <span aria-hidden="true"> →</span>
              </Link>
            </aside>

            <section className="home-columns" aria-label="最新文章">
              <PostList
                heading="宇宙漫步"
                href="/cosmic-walk/"
                posts={cosmicWalk}
              />
              <PostList
                heading="日记碎片"
                href="/fragments/"
                posts={fragments}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
