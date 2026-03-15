import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocale } from "@/lib/locale";
import { t } from "@/i18n/dictionaries";
import ContactForm from "./ContactForm";

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = getLocale(params);
  const inquiryType = typeof params.type === "string" ? params.type : "general";

  return (
    <>
      <Header locale={locale} />
      <main className="pt-16 min-h-screen bg-[var(--bg-alt)]">
        <section className="hero-gradient py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white mb-2">{t(locale, "contact.title")}</h1>
            <p className="text-gray-300">{t(locale, "contact.subtitle")}</p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ContactForm locale={locale} initialType={inquiryType} />
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
