import type { Metadata } from "next";

// 관리자 페이지는 검색엔진 색인 금지 (noindex). page.tsx가 "use client"라
// 여기 서버 컴포넌트 layout에서 robots 메타를 설정한다.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
