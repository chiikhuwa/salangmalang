"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import TabBar from "./TabBar";

export default function DemoApp({ signedInUser, isDemo, loginReady, error }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(error ? "로그인이 완료되지 않았어요. 다시 시도해 주세요." : "");
  const demoUser = isDemo ? { name: "데모", email: "demo@example.com", demo: true } : null;
  const user = signedInUser || demoUser;

  async function login() {
    if (!loginReady) {
      setMessage("네이버 로그인 설정 전이에요. 아래 데모 버튼으로 체험해 보세요.");
      return;
    }
    setBusy(true);
    try {
      await signIn("naver", { callbackUrl: "/" });
    } catch {
      setMessage("로그인을 시작하지 못했어요. 다시 시도해 주세요.");
      setBusy(false);
    }
  }

  async function logout() {
    if (user.demo) {
      router.replace("/");
      setActiveTab("home");
      setSelectedMood(null);
      return;
    }
    setBusy(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch {
      setMessage("로그아웃하지 못했어요. 다시 시도해 주세요.");
      setBusy(false);
    }
  }

  return (
    <main className={`app ${user ? "with-tabs" : ""} `}>
      <header className="header">살랑말랑</header>
      {user ? (
        <>
          <section className="content" key={activeTab}>
            {activeTab === "home" && (
              <>
                
              </>
            )}
            {activeTab === "tab2" && (
              <>
                
              </>
            )}
            {activeTab === "settings" && (
              <>
                <h1>설정</h1>
                <p className="description">{user.name}님의 계정</p>
                <p>{user.email || "이메일이 제공되지 않았어요."}</p>
                <div className="actions">
                  {message && <p role="alert" className="message">{message}</p>}
                  <button className="secondary" onClick={logout} disabled={busy}>
                    {busy ? "로그아웃 중…" : user.demo ? "데모 체험 종료" : "로그아웃"}
                  </button>
                </div>
              </>
            )}
          </section>
          <TabBar activeTab={activeTab} onChange={setActiveTab} />
        </>
      ) : (
        <section className="content">
          <h1>로그인</h1>
          <p className="description">네이버 계정으로 간편하게 시작하세요.</p>
          <div className="actions">
            {message && <p role="alert" className="message">{message}</p>}
            <button className="naver" onClick={login} disabled={busy}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M15.2 3v9.6L8.5 3H2v18h6.8v-9.6l6.7 9.6H22V3z" />
              </svg>
              {busy ? "네이버로 이동 중…" : "네이버로 시작하기"}
            </button>
            <button className="secondary" onClick={() => router.push("/onboarding?demo=1")} disabled={busy}>
              먼저 데모 둘러보기
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
