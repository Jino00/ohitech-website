"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import type { Locale } from "@/i18n/dictionaries";
import { t } from "@/i18n/dictionaries";
import { lp, lq } from "@/lib/locale";

const localeLabels: Record<Locale, string> = { ko: "한국어", en: "English", zh: "中文" };

export default function Header({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      router.push(`${pathname}${lp(newLocale)}`);
      setLangOpen(false);
    },
    [pathname, router]
  );

  const navItems = [
    { href: "/", label: t(locale, "nav.home") },
    { href: "/about", label: t(locale, "nav.about") },
    { href: "/products", label: t(locale, "nav.products") },
    { href: "/insights", label: t(locale, "nav.insights") },
    { href: "/contact", label: t(locale, "nav.contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${lp(locale)}`} className="flex items-center min-h-[44px]">
            <Image
              src="/images/logo-header.png"
              alt="OHI Tech"
              width={98}
              height={25}
              className="h-[26px] w-auto mix-blend-multiply"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`${item.href}${lp(locale)}`}
                className="nav-link text-[17px] font-extrabold tracking-tight text-gray-900 hover:text-[var(--primary)] min-h-[44px] flex items-center px-3"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Language + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-[var(--primary)] transition min-h-[44px] px-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                {localeLabels[locale]}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[120px]">
                  {(["ko", "en", "zh"] as Locale[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLocale(l)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${l === locale ? "text-[var(--accent)] font-semibold" : "text-gray-700"}`}
                    >
                      {localeLabels[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/contact${lq(locale, "type=quote")}`}
              className="px-4 min-h-[44px] flex items-center bg-[var(--accent)] text-white text-sm font-medium rounded-lg hover:bg-[var(--accent-light)] transition"
            >
              {t(locale, "nav.quote")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`${item.href}${lp(locale)}`}
                className="block py-3 text-gray-700 hover:text-[var(--primary)]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              {(["ko", "en", "zh"] as Locale[]).map((l) => (
                <button
                  key={l}
                  onClick={() => { switchLocale(l); setMenuOpen(false); }}
                  className={`px-3 py-1 text-sm rounded ${l === locale ? "bg-[var(--accent)] text-white" : "bg-gray-100 text-gray-700"}`}
                >
                  {localeLabels[l]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
