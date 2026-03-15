"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/dictionaries";
import { t } from "@/i18n/dictionaries";

export default function ContactForm({ locale, initialType }: { locale: Locale; initialType: string }) {
  const [form, setForm] = useState({
    type: initialType || "general",
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    country: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ type: "general", company_name: "", contact_name: "", email: "", phone: "", country: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
      {status === "success" && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm">
          {t(locale, "contact.success")}
        </div>
      )}
      {status === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
          Error occurred. Please try again.
        </div>
      )}

      <div className="grid gap-5">
        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, "contact.type")}</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className={inputClass}
          >
            <option value="general">{t(locale, "contact.type.general")}</option>
            <option value="quote">{t(locale, "contact.type.quote")}</option>
            <option value="support">{t(locale, "contact.type.support")}</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, "contact.company")}</label>
            <input type="text" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, "contact.name")} *</label>
            <input type="text" required value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, "contact.email")} *</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, "contact.phone")}</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, "contact.country")}</label>
          <input type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, "contact.subject")} *</label>
          <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t(locale, "contact.message")} *</label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={inputClass + " resize-none"}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent-light)] transition disabled:opacity-50"
        >
          {status === "loading" ? "..." : t(locale, "contact.submit")}
        </button>
      </div>
    </form>
  );
}
