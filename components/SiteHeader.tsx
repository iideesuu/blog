import Link from "next/link";

const navigation = [
  { href: "/cosmic-walk/", label: "宇宙漫步" },
  { href: "/fragments/", label: "日记碎片" },
  { href: "/help/", label: "需要帮助", help: true }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner page-width">
        <Link className="wordmark" href="/" aria-label="传信予你，返回首页">
          传信予你
        </Link>
        <nav className="site-nav" aria-label="主要导航">
          {navigation.map((item) => (
            <Link
              className={item.help ? "nav-link nav-help" : "nav-link"}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
