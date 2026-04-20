"use client";

import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/dictionaries";
import { t } from "@/i18n/dictionaries";

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="bg-[var(--primary)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Image
                src="/images/logo-header-white.png"
                alt="OHI Tech"
                width={140}
                height={36}
                className="h-9 w-auto brightness-0 invert"
                loading="lazy"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              {t(locale, "about.description")}
            </p>
            <p className="text-gray-400 text-sm mt-4">
              <a href="https://www.ohitech.co.kr" className="hover:text-[var(--accent)] transition">
                www.ohitech.co.kr
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: t(locale, "nav.about") },
                { href: "/products", label: t(locale, "nav.products") },
                { href: "/contact", label: t(locale, "nav.contact") },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={`${item.href}?lang=${locale}`} className="text-gray-400 text-sm hover:text-white transition inline-block py-1">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-200">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                jino.kim@ohitech.co.kr
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>경기도 화성시 동탄영천로 150,<br />현대 실리콘엘리 B-1101호</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} {t(locale, "footer.company")}. {t(locale, "footer.rights")}
          </p>
          <div className="flex gap-4 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition py-1 px-1">{t(locale, "footer.privacy")}</Link>
            <Link href="#" className="hover:text-white transition py-1 px-1">{t(locale, "footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
