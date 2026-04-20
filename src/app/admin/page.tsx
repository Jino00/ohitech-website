"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Tab = "inquiries" | "products" | "partners" | "lineups";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("inquiries");
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [lineups, setLineups] = useState<any[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);
  const [showLineupForm, setShowLineupForm] = useState(false);
  const [editingLineup, setEditingLineup] = useState<any>(null);
  const [lineupForm, setLineupForm] = useState({
    product_id: "",
    model_name: "",
    name_ko: "",
    name_en: "",
    name_zh: "",
    description_ko: "",
    description_en: "",
    description_zh: "",
    specifications: "",
    sort_order: "0",
  });

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
    fetch("/api/lineups").then((r) => r.json()).then(setLineups).catch(() => {});
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
            { key: "lineups" as Tab, label: `상품 라인업 (${lineups.length})` },
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
        {/* Lineups Tab - Partner-centric */}
        {tab === "lineups" && (
          <div className="flex gap-6">
            {/* Left: Partner List */}
            <div className="w-64 shrink-0">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">파트너사 선택</h3>
              <div className="space-y-1">
                {partners.map((partner: any) => {
                  const partnerProducts = products.filter((p: any) => p.partner_name_ko === partner.name_ko);
                  const partnerLineupCount = lineups.filter((l: any) => partnerProducts.some((p: any) => p.id === l.product_id)).length;
                  return (
                    <button
                      key={partner.id}
                      onClick={() => { setSelectedPartner(partner.id); setExpandedProduct(null); }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition ${
                        selectedPartner === partner.id
                          ? "bg-[var(--accent)] text-white shadow-sm"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"
                      }`}
                    >
                      <div className="font-medium">{partner.name_ko}</div>
                      <div className={`text-xs mt-0.5 ${selectedPartner === partner.id ? "text-white/70" : "text-gray-400"}`}>
                        제품 {partnerProducts.length}개 · 라인업 {partnerLineupCount}개
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Products & Lineups */}
            <div className="flex-1 min-w-0">
              {!selectedPartner ? (
                <div className="bg-white rounded-xl border border-gray-100 p-16 text-center text-gray-400">
                  <div className="text-4xl mb-3">←</div>
                  왼쪽에서 파트너사를 선택하세요
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Selected Partner Header */}
                  {(() => {
                    const partner = partners.find((p: any) => p.id === selectedPartner);
                    if (!partner) return null;
                    return (
                      <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--primary)]">{partner.name_ko}</h3>
                          <p className="text-sm text-gray-400">{partner.name_en} · {partner.country}</p>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Products under this partner */}
                  {products
                    .filter((p: any) => {
                      const partner = partners.find((pr: any) => pr.id === selectedPartner);
                      return partner && p.partner_name_ko === partner.name_ko;
                    })
                    .map((product: any) => {
                      const productLineups = lineups.filter((l: any) => l.product_id === product.id);
                      const isExpanded = expandedProduct === product.id;
                      return (
                        <div key={product.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                          {/* Product Header - Click to expand */}
                          <button
                            onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                            className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xs px-2 py-1 bg-[var(--bg-alt)] text-[var(--accent)] rounded-full font-medium">
                                {product.cat_name_ko}
                              </span>
                              <span className="font-semibold text-[var(--primary)]">{product.name_ko}</span>
                              <span className="text-xs text-gray-400">{product.name_en}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                라인업 {productLineups.length}개
                              </span>
                              <svg className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </button>

                          {/* Expanded: Lineups + Add button */}
                          {isExpanded && (
                            <div className="border-t border-gray-100 bg-gray-50/50 p-5">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-semibold text-gray-700">상품 라인업</h4>
                                <button
                                  onClick={() => {
                                    setEditingLineup(null);
                                    setLineupForm({
                                      product_id: String(product.id),
                                      model_name: "", name_ko: "", name_en: "", name_zh: "",
                                      description_ko: "", description_en: "", description_zh: "",
                                      specifications: "", sort_order: "0",
                                    });
                                    setShowLineupForm(true);
                                  }}
                                  className="px-3 py-1.5 bg-[var(--accent)] text-white text-xs font-medium rounded-lg hover:bg-[var(--accent-light)] transition"
                                >
                                  + 라인업 추가
                                </button>
                              </div>

                              {productLineups.length === 0 ? (
                                <div className="text-center py-8 text-gray-400 text-sm">
                                  등록된 라인업이 없습니다. 위 버튼으로 추가하세요.
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {productLineups.map((l: any) => {
                                    let specs: Record<string, string> = {};
                                    try { specs = JSON.parse(l.specifications || "{}"); } catch {}
                                    const hasSpecs = Object.keys(specs).length > 0;
                                    return (
                                      <div key={l.id} className="bg-white rounded-lg border border-gray-100 p-4 hover:border-gray-200 transition">
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                              <span className="font-medium text-sm text-[var(--primary)]">{l.name_ko}</span>
                                              {l.model_name && (
                                                <span className="text-xs font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{l.model_name}</span>
                                              )}
                                              <span className={`text-xs px-1.5 py-0.5 rounded-full ${l.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                                {l.is_active ? "활성" : "비활성"}
                                              </span>
                                            </div>
                                            {l.name_en && <div className="text-xs text-gray-400 mb-1">{l.name_en}</div>}
                                            {l.description_ko && <div className="text-xs text-gray-500 mb-2">{l.description_ko}</div>}
                                            {hasSpecs && (
                                              <div className="flex flex-wrap gap-1">
                                                {Object.entries(specs).map(([key, value]) => (
                                                  <span key={key} className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                                                    {key}: {String(value)}
                                                  </span>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                          <div className="flex gap-1 ml-3 shrink-0">
                                            <button
                                              onClick={() => {
                                                setEditingLineup(l);
                                                setLineupForm({
                                                  product_id: String(l.product_id),
                                                  model_name: l.model_name || "",
                                                  name_ko: l.name_ko,
                                                  name_en: l.name_en || "",
                                                  name_zh: l.name_zh || "",
                                                  description_ko: l.description_ko || "",
                                                  description_en: l.description_en || "",
                                                  description_zh: l.description_zh || "",
                                                  specifications: l.specifications || "",
                                                  sort_order: String(l.sort_order),
                                                });
                                                setShowLineupForm(true);
                                              }}
                                              className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition"
                                            >
                                              수정
                                            </button>
                                            <button
                                              onClick={async () => {
                                                if (!confirm("정말 삭제하시겠습니까?")) return;
                                                await fetch(`/api/lineups?id=${l.id}`, { method: "DELETE" });
                                                setLineups((prev) => prev.filter((x: any) => x.id !== l.id));
                                              }}
                                              className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition"
                                            >
                                              삭제
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Lineup Form Modal (shared) */}
            {showLineupForm && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {editingLineup ? "라인업 수정" : "새 라인업 등록"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">제품</label>
                        <div className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-600">
                          {products.find((p: any) => p.id === Number(lineupForm.product_id))?.name_ko || "선택된 제품 없음"}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">모델명</label>
                        <input
                          type="text" placeholder="예: ESC-300E"
                          value={lineupForm.model_name}
                          onChange={(e) => setLineupForm({ ...lineupForm, model_name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">정렬 순서</label>
                        <input
                          type="number"
                          value={lineupForm.sort_order}
                          onChange={(e) => setLineupForm({ ...lineupForm, sort_order: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">이름 (한국어) *</label>
                        <input
                          type="text"
                          value={lineupForm.name_ko}
                          onChange={(e) => setLineupForm({ ...lineupForm, name_ko: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">이름 (English)</label>
                        <input
                          type="text"
                          value={lineupForm.name_en}
                          onChange={(e) => setLineupForm({ ...lineupForm, name_en: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">이름 (中文)</label>
                        <input
                          type="text"
                          value={lineupForm.name_zh}
                          onChange={(e) => setLineupForm({ ...lineupForm, name_zh: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">설명 (한국어)</label>
                        <textarea rows={2} value={lineupForm.description_ko}
                          onChange={(e) => setLineupForm({ ...lineupForm, description_ko: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">설명 (English)</label>
                        <textarea rows={2} value={lineupForm.description_en}
                          onChange={(e) => setLineupForm({ ...lineupForm, description_en: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">설명 (中文)</label>
                        <textarea rows={2} value={lineupForm.description_zh}
                          onChange={(e) => setLineupForm({ ...lineupForm, description_zh: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">사양 (JSON)</label>
                        <textarea rows={3} placeholder='{"전압": "220V", "전력": "60kW"}'
                          value={lineupForm.specifications}
                          onChange={(e) => setLineupForm({ ...lineupForm, specifications: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <button onClick={() => setShowLineupForm(false)}
                        className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        취소
                      </button>
                      <button
                        onClick={async () => {
                          if (!lineupForm.product_id || !lineupForm.name_ko) return alert("이름(한국어)은 필수입니다.");
                          const payload = {
                            ...lineupForm,
                            product_id: Number(lineupForm.product_id),
                            sort_order: Number(lineupForm.sort_order) || 0,
                            ...(editingLineup ? { id: editingLineup.id, is_active: editingLineup.is_active } : {}),
                          };
                          const method = editingLineup ? "PUT" : "POST";
                          await fetch("/api/lineups", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
                          setShowLineupForm(false);
                          const res = await fetch("/api/lineups");
                          setLineups(await res.json());
                        }}
                        className="px-4 py-2 text-sm text-white bg-[var(--accent)] rounded-lg hover:bg-[var(--accent-light)] transition font-medium">
                        {editingLineup ? "수정" : "등록"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
