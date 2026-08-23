import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main id="main-content" className="not-found page-width">
      <p className="eyebrow">404 · LOST AT SEA</p>
      <h1>这里没有找到文字</h1>
      <p>这条航线暂时没有留下记录。</p>
      <Link className="text-link" href="/">返回首页</Link>
    </main>
  );
}
