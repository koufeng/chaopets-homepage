"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/types";
import { localizedPath } from "@/i18n";

import logoBlack from "@/assets/images/logo-black.png";
import logoWhite from "@/assets/images/logo-white.png";

function homeHash(lang: Locale, hash: string) {
  return `${localizedPath("/", lang)}${hash}`;
}

export function WxSiteHeader({ lang, home = false }: { lang: Locale; home?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { href: home ? "#origin" : homeHash(lang, "#origin"), label: "起源" },
    { href: localizedPath("/archive", lang), label: "档案馆" },
    { href: home ? "#reborn" : homeHash(lang, "#reborn"), label: "抽盒" },
    { href: home ? "#world" : homeHash(lang, "#world"), label: "共鸣" },
  ];

  return (
    <header className="wx-header">
      <Link className="wx-logo-link" href={localizedPath("/", lang)} aria-label="五行小兽首页">
        <Image src={logoBlack} alt="Wuxing Beasts" width={100} height={41} priority />
      </Link>
      <nav className="wx-nav" aria-label="Main">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>{item.label}</Link>
        ))}
      </nav>
      <button
        className="wx-mobile-menu-toggle"
        type="button"
        aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
        aria-expanded={menuOpen}
        aria-controls="wx-mobile-menu"
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
      </button>
      {menuOpen ? (
        <nav className="wx-mobile-menu" id="wx-mobile-menu" aria-label="Mobile">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function WxSiteFooter({ lang, lulumartUrl }: { lang: Locale; lulumartUrl: string }) {
  return (
    <footer id="footer" className="wx-footer">
      <div className="wx-footer-main">
        <div className="wx-footer-brand">
          <Image src={logoWhite} alt="Wuxing Beasts" width={100} height={41} />
          <p>一座能呼吸的东方奇幻数字藏馆。山海集 © 2026 — 持续生长中。</p>
        </div>

        <nav className="wx-footer-nav" aria-label="Footer">
          <div>
            <h3>NAVIGATE 探索</h3>
            <Link href={homeHash(lang, "#origin")}>起源故事</Link>
            <Link href={localizedPath("/archive", lang)}>角色档案馆</Link>
            <Link href={homeHash(lang, "#reborn")}>古灵新生</Link>
          </div>
          <div>
            <h3>COMMUNITY 共鸣</h3>
            <a href="https://www.xiaohongshu.com/" target="_blank" rel="noopener">小红书 @五行小兽</a>
            <a href="https://weibo.com/" target="_blank" rel="noopener">微博 @山海集</a>
            <a href="https://www.douyin.com/" target="_blank" rel="noopener">抖音 @wuxingbeasts</a>
            <a href="https://discord.com/" target="_blank" rel="noopener">Discord</a>
          </div>
          <div>
            <h3>OFFICIAL 官方</h3>
            <a href={lulumartUrl} target="_blank" rel="noopener">lulumart.app · 抽盒</a>
            <a href="mailto:dev@wuxing-beasts.com">开发者支持</a>
            <a href="mailto:bd@wuxing-beasts.com">合作 · BD</a>
            <a href="#privacy">隐私 · 条款</a>
          </div>
        </nav>
      </div>

      <div className="wx-footer-bottom">
        <span>© 2026 SHANHAIJI · 山海集</span>
        <span>WǓ XÍNG BEASTS · ALL EIGHT BEASTS, ALL CONTRACTS HONORED.</span>
        <span>v 1.0 · MAY 2026</span>
      </div>
    </footer>
  );
}
