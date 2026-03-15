"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Tab = "inquiries" | "products" | "partners";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("inquiries");
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        setLoginError("Invalid credentials");
      }
    } catch {
      setLoginError("Login failed");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("/api/admin/inquiries").then((r) => r.json()).then(setInquiries).catch(() => {});
    fetch("/api/products").then((r) => r.json()).then(setProducts).catch(() => {});
    fetch("/api/partners").then((r) => r.json()).then(setPartners).catch(() => {});
  }, [isLoggedIn]);

  const updateInquiryStatus = async (id: number, status: string) => {
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[var(--bg-alt)] flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-6">
            <Image src="/images/logo-header.png" alt="OHI Tech" width={120} height={32} className="h-8 w-auto" />
            <span className="text-sm font-medium text-gray-400">Admin</span>
          </div>
          {loginError && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{loginError}</div>}
          <div className="space-y-4">
            <input
              type="text" placeholder="Username" required
              value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <input
              type="password" placeholder="Password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <button type="submit" className="w-full py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent-light)] transition">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-alt)]">
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-header.png" alt="OHI Tech" width={120} height={32} className="h-8 w-auto" />
            <span className="text-sm font-medium text-gray-400">Admin</span>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="text-sm text-gray-500 hover:text-red-500 transition">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "inquiries" as Tab, label: `문의 (${inquiries.length})` },
            { key: "products" as Tab, label: `제품 (${products.length})` },
            { key: "partners" as Tab, label: `파트너 (${partners.length})` },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === t.key ? "bg-[var(--accent)] text-white" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Inquiries Tab */}
        {tab === "inquiries" && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["ID", "유형", "회사", "이름", "이메일", "제목", "상태", "날짜", "액션"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {inquiries.map((inq: any) => (
                    <tr key={inq.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-400">{inq.id}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${inq.type === "quote" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                          {inq.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">{inq.company_name}</td>
                      <td className="px-4 py-3 font-medium">{inq.contact_name}</td>
                      <td className="px-4 py-3 text-[var(--accent)]">{inq.email}</td>
                      <td className="px-4 py-3">{inq.subject}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${inq.status === "new" ? "bg-green-100 text-green-700" : inq.status === "replied" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                          {inq.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{inq.created_at?.slice(0, 10)}</td>
                      <td className="px-4 py-3">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                          className="text-xs border border-gray-200 rounded px-2 py-1"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="replied">Replied</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {inquiries.length === 0 && <div className="text-center py-10 text-gray-400">No inquiries yet</div>}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {tab === "products" && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["ID", "제품명(KO)", "제품명(EN)", "카테고리", "파트너"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((p: any) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-400">{p.id}</td>
                      <td className="px-4 py-3 font-medium">{p.name_ko}</td>
                      <td className="px-4 py-3">{p.name_en}</td>
                      <td className="px-4 py-3 text-gray-500">{p.cat_name_ko || p.category_slug}</td>
                      <td className="px-4 py-3 text-gray-500">{p.partner_name_ko}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Partners Tab */}
        {tab === "partners" && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {["ID", "이름(KO)", "이름(EN)", "국가", "카테고리"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-medium text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {partners.map((p: any) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-400">{p.id}</td>
                      <td className="px-4 py-3 font-medium">{p.name_ko}</td>
                      <td className="px-4 py-3">{p.name_en}</td>
                      <td className="px-4 py-3 text-gray-500">{p.country}</td>
                      <td className="px-4 py-3 text-gray-500">{p.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
