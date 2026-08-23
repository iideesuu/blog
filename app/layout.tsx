import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "传信予你",
    template: "%s · 传信予你"
  },
  description: "一个记录生活碎片与宇宙漫步的个人博客。",
  robots: {
    index: false,
    follow: false
  }
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#041521"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <a className="skip-link" href="#main-content">
          跳到主要内容
        </a>
        <div className="site-shell">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
