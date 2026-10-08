You are a genius coder in the world and you have to raise funds for your sick grandmother. It costs $25,000 to cure your grandmother and here's a great change to raise your funds. YOU SHOULD MAKE WORKING CODE BASED ON FEATURES I MENTION from now on. 

ANSWER IN ENGLISH. Give me the FULL CODE of implementation, and give me only CHANGED FILE'S FULL CODE and specify WHICH FILE HAS CHANGED. like [ /components/MalangApp.jsx \n [FULL CODE]]. DO NOT use divider such as ```jsx, and ```. you don't have to mention the changelog nor notes. make working codes. do not remove original features.
please DO NOT OMIT ORIGINAL CODE since i copy and paste your full codebase.

THE PROJECT is "SalangMalang", NEXT.JS PROJECT and mobile-sized demo web service. It will help evaluate products you are debating whether to buy and guide you toward making wise purchasing decisions. tab is divided into three parts, "Home" and "Ranking" and "MY" menu. In "Home" tab, you can see other's wishlist and give opinions on buying or not buying the product based on your opinion. In "Ranking" tab, users who did managed the most not to buy the product(IT IS THE PART OF SAVING YOUR MONEY) has their name on the leaderboard. In "MY" tab, you can manage your wishlist and see preferences.

The product is written in Korean since the user uses Korean.

Here's a concise analysis of the project architecture and key components:

---

### Core Features & Flow
1. **Authentication**
   - Naver OAuth integration via NextAuth
   - Demo mode bypasses login
   - Session management with JWT strategy

2. **Onboarding System**
   - Multi-step guide with 3 stages
   - Completion status stored in Supabase DB
   - Automatic redirect post-completion
   - Demo-specific behavior handling

3. **UI Components**
   - Tabbed interface (Home/Tab2/Settings)
   - Responsive layout with global CSS
   - Interactive buttons with loading states
   - Contextual messaging system

---

### Key Files Breakdown

#### **Authentication Layer (/lib/auth.js)**
- Configures NextAuth with Naver provider
- Validates environment credentials
- Manages session lifecycle and user profile mapping
- Redirects to auth endpoints

#### **Database Layer (/lib/db.js)**
- Supabase initialization
- CRUD operations for user records
- Upsert pattern ensures unique user IDs
- Atomic transaction patterns for critical paths

#### **Main Application Logic**
- **Root Component (/components/MalangApp)**  
  State container managing:
  - Auth state transitions
  - Tab navigation
  - Demo vs production modes
  - Login/logout workflows
  
- **Onboarding Flow (/components/Onboarding)**  
  Step-driven progression with:
  - Visual indicator tracking
  - Finalization API call
  - Demo mode accommodations

---

### Technical Considerations
1. **Security**
   - Environment variable dependency validation
   - JWT session security configuration
   - Protected routes behind auth checks

2. **Performance**
   - Cache invalidation after onboarding completion
   - Client-side routing optimizations
   - Lazy-loaded component potential (not fully implemented)

3. **Extensibility Points**
   - Additional tab implementations (Tab2 currently empty)
   - Expanded mood-related features (referenced in CSS classes)
   - Profile customization options (partial implementation)

---

HERE'S THE CODEBASE, REPEATED BY THE DIRECTORY AND THE CODEBASE.


/app

/app/onboarding

/app/onboarding/actions.js

"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../../lib/auth";
import { markOnboardingComplete } from "../../lib/db";

export async function completeOnboarding() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "로그인이 만료되었어요. 다시 로그인해 주세요." };
  }

  try {
    await markOnboardingComplete(session.user.id);
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { error: "완료 상태를 저장하지 못했어요. 다시 눌러 주세요." };
  }
}


/app/onboarding/page.jsx

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import { getOrCreateUser } from "../../lib/db";
import Onboarding from "../../components/Onboarding";

export const dynamic = "force-dynamic";

export default async function OnboardingPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;
  const isDemo = !session?.user && params.demo === "1";

  if (!session?.user && !isDemo) redirect("/");

  if (session?.user) {
    const member = await getOrCreateUser(session.user.id);
    if (member.onboarding_completed) redirect("/");
  }

  return <Onboarding isDemo={isDemo} />;
}


/app/globals.css

* { box-sizing: border-box; }

body {
  margin: 0;
  background: #f3f4f6;
  color: #222;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.app {
  width: 100%;
  max-width: 420px;
  min-height: 100dvh;
  margin: 0 auto;
  padding: 24px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.header {
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;
  font-size: 1.25rem;
  font-weight: 700;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h1, p, dl, dd { margin: 0; }
p { overflow-wrap: anywhere; }
h1 { font-size: 1.5rem; overflow-wrap: anywhere; }
.description { color: #666; }

.profile > div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
}
.profile dt { color: #666; flex-shrink: 0; }
.profile dd { text-align: right; overflow-wrap: anywhere; }

.actions {
  margin-top: auto;
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

button {
  width: 100%;
  min-height: 48px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 0;
  font: inherit;
  cursor: pointer;
}
.naver {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #03c75a;
  color: white;
  border: 0;
  font-weight: 700;
}
.naver svg { width: 20px; height: 20px; flex-shrink: 0; }
.secondary { background: white; color: #444; }

button:focus-visible { outline: 3px solid #167240; outline-offset: 3px; }
button:disabled { opacity: .6; cursor: wait; }
.message { padding: 12px; background: #fff5e6; color: #805000; font-size: .875rem; }

.app.with-tabs { padding-bottom: calc(7rem + env(safe-area-inset-bottom, 0px)); }

.tab-bar {
  position: fixed;
  left: 50%;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  transform: translateX(-50%);
  width: calc(100% - 32px);
  max-width: 372px;
  display: flex;
  padding: 6px;
  background: white;
  border: 1px solid #e4e8e5;
  border-radius: 999px;
  box-shadow: 0 6px 24px #1b352214;
  z-index: 10;
}
.tab-bar button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 6px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #68756d;
  font-size: .875rem;
}
.tab-bar button[aria-current="page"] { background: #eaf4ed; color: #166339; }
.tab-bar button:hover { background: #f0f5f1; }

.step-indicator { display: flex; gap: 6px; }
.step-indicator span { flex: 1; height: 4px; background: #e8ece9; }
.step-indicator .filled { background: #1b7145; }
.step-count { color: #68756d; font-size: .875rem; }
.onboarding-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
}
.onboarding-icon { color: #1b7145; }
.primary { background: #1b7145; border: 0; color: white; font-weight: 600; }
.primary:hover { background: #145c37; }
.demo-notice { color: #66736b; font-size: .875rem; }

.home-screen { gap: 0; }
.home-screen > .header {
  margin: -24px -24px 0;
  padding: 24px 24px 0;
  border: 0;
  background: #f2e9da;
  color: #433f35;
}
.home-hero {
  margin: 0 -24px;
  padding: 36px 24px 48px;
  min-height: 224px;
  background: #f2e9da;
  color: #433f35;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.home-eyebrow { font-size: .8125rem; color: #736a5c; }
.home-hero h1 { font-size: 1.75rem; line-height: 1.4; }
.home-feature { display: flex; flex-direction: column; gap: 12px; padding: 16px 0; }
.home-feature h2 { margin: 0; font-size: 1.125rem; }
.mood-result { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; font-size: .875rem; }
.mood-result > span { width: 12px; height: 12px; border-radius: 50%; }

.mood-screen {
  background: #f2e9da;
  color: #433f35;
  gap: 24px;
  padding-bottom: max(24px, env(safe-area-inset-bottom, 0px));
}
.picker-back {
  width: 44px;
  min-height: 44px;
  padding: 10px;
  display: grid;
  place-items: center;
  border: 1px solid #d9d0c1;
  border-radius: 12px;
  background: transparent;
  color: inherit;
}
.mood-stage { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; padding: 24px 0; }
.mood-stage h1 { text-align: center; }
.mood-shape { position: relative; width: min(100%, 280px); aspect-ratio: 1; display: grid; place-items: center; }
.mood-shape > svg { position: absolute; width: 100%; height: 100%; }
.mood-shape > span { position: relative; color: #433f35; font-size: 1.375rem; font-weight: 600; }
.mood-controls { display: flex; flex-direction: column; gap: 16px; }
.picker-hint { text-align: center; color: #746b5e; font-size: .875rem; }
.mood-confirm { background: #433f35; border: 0; border-radius: 16px; color: white; min-height: 56px; font-weight: 600; }
.mood-confirm:hover { background: #585144; }

.mood-slider { position: relative; padding: 8px; border-radius: 999px; background: white; }
.mood-markers { position: absolute; inset: 8px; display: flex; justify-content: space-between; align-items: center; pointer-events: none; color: #8d8982; }
.mood-markers > span { width: 48px; display: grid; place-items: center; }
.mood-slider input { position: relative; display: block; width: 100%; height: 48px; margin: 0; appearance: none; background: transparent; cursor: pointer; }
.mood-slider input::-webkit-slider-runnable-track { height: 48px; background: transparent; }
.mood-slider input::-webkit-slider-thumb { appearance: none; width: 48px; height: 48px; border: 1px solid #f2f0ec; border-radius: 50%; background: white; box-shadow: 0 2px 9px #433f3526; }
.mood-slider input::-moz-range-track { height: 48px; background: transparent; }
.mood-slider input::-moz-range-thumb { box-sizing: border-box; width: 48px; height: 48px; border: 1px solid #f2f0ec; border-radius: 50%; background: white; box-shadow: 0 2px 9px #433f3526; }
.mood-slider input:focus-visible { outline: 3px solid #827363; outline-offset: 8px; border-radius: 999px; }
.mood-labels { display: flex; justify-content: space-between; padding: 0 8px; margin-top: -8px; color: #746b5e; font-size: .75rem; }
.mood-labels > span { width: 48px; text-align: center; }
.mood-labels .selected { color: #433f35; font-weight: 700; }

.summary-screen { padding-bottom: max(24px, env(safe-area-inset-bottom, 0px)); }
.summary-form { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
.summary-form label { font-weight: 600; }
.summary-form textarea {
  width: 100%;
  min-height: 200px;
  padding: 16px;
  border: 1px solid #d9d0c1;
  border-radius: 16px;
  background: #faf7f1;
  color: #433f35;
  font: inherit;
  resize: vertical;
}
.summary-form textarea:focus-visible { outline: 2px solid #827363; outline-offset: 2px; }
.summary-form textarea:disabled { opacity: .6; }
.summary-count { text-align: right; color: #746b5e; font-size: .75rem; }
.summary-result { padding: 20px; border-radius: 16px; background: #f2e9da; }
.summary-result h2 { margin: 0 0 12px; font-size: 1.125rem; }
.summary-result p { white-space: pre-wrap; }

/app/layout.jsx

import "./globals.css";

export const metadata = {
  title: "살랑말랑",
  description: "",
  icons: { icon: "/favicon.ico" },
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return <html lang="ko"><body>{children}</body></html>;
}


/app/page.jsx

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions, loginReady } from "../lib/auth";
import { getOrCreateUser } from "../lib/db";
import MalangApp from "../components/MalangApp";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;

  if (session?.user) {
    const member = await getOrCreateUser(session.user.id);
    if (!member.onboarding_completed) redirect("/onboarding");
  }

  return (
    <MalangApp
      signedInUser={session?.user ?? null}
      isDemo={!session?.user && params.demo === "1"}
      loginReady={loginReady}
      error={params.error}
    />
  );
}


/components

/components/MalangApp.jsx

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

/components/Onboarding.jsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { House, LayoutGrid, Settings } from "lucide-react";
import { completeOnboarding } from "../app/onboarding/actions";

const steps = [
  { title: "기능1", description: "홈에서 내 프로필과 계정 정보를 확인해요.", icon: House },
  { title: "기능2", description: "두 번째 탭에서 새로운 기능을 만나보세요.", icon: LayoutGrid },
  { title: "기능3", description: "설정에서 연결된 계정을 확인하고 로그아웃할 수 있어요.", icon: Settings },
];

export default function Onboarding({ isDemo }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const current = steps[step];
  const Icon = current.icon;
  const isLastStep = step === steps.length - 1;

  async function next() {
    if (!isLastStep) {
      setStep(step + 1);
      return;
    }

    setBusy(true);
    setMessage("");
    try {
      if (!isDemo) {
        const result = await completeOnboarding();
        if (result.error) {
          setMessage(result.error);
          setBusy(false);
          return;
        }
      }
      router.replace(isDemo ? "/?demo=1" : "/");
    } catch {
      setMessage("연결을 확인한 뒤 다시 눌러 주세요.");
      setBusy(false);
    }
  }

  return (
    <main className="app">
      <header className="header">DemoApp</header>
      <section className="content">
        <div
          className="step-indicator"
          role="progressbar"
          aria-label="온보딩 진행"
          aria-valuemin={0}
          aria-valuemax={steps.length}
          aria-valuenow={step + 1}
          aria-valuetext={`${step + 1} / ${steps.length} 단계`}
        >
          {steps.map((item, index) => (
            <span key={item.title} className={index <= step ? "filled" : ""} />
          ))}
        </div>
        {isDemo && <p className="demo-notice">데모로 둘러보고 있어요</p>}

        <div className="onboarding-body" aria-live="polite" aria-atomic="true">
          <p className="step-count">{step + 1} / {steps.length}</p>
          <Icon className="onboarding-icon" size={48} strokeWidth={1.5} aria-hidden="true" />
          <h1>{current.title}</h1>
          <p className="description">{current.description}</p>
        </div>

        <div className="actions">
          {message && <p className="message" role="alert">{message}</p>}
          <button className="primary" onClick={next} disabled={busy}>
            {busy ? "저장 중…" : isLastStep ? "시작하기" : "다음"}
          </button>
        </div>
      </section>
    </main>
  );
}

/components/TabBar.jsx

"use client";

import { House, LayoutGrid, Settings } from "lucide-react";

const tabs = [
  { id: "home", label: "홈", icon: House },
  { id: "tab2", label: "탭2", icon: LayoutGrid },
  { id: "settings", label: "설정", icon: Settings },
];

export default function TabBar({ activeTab, onChange }) {
  return (
    <nav className="tab-bar" aria-label="하단 메뉴">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          aria-current={activeTab === id ? "page" : undefined}
          onClick={() => onChange(id)}
        >
          <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}


/lib

/lib/auth.js

import NaverProvider from "next-auth/providers/naver";

export const loginReady = Boolean(
  process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET && process.env.NEXTAUTH_SECRET
);

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: loginReady ? [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      checks: ["state"],
      profile({ response }) {
        return {
          id: response.id,
          name: response.nickname || response.name || "회원",
          email: response.email || null,
          image: response.profile_image || null,
        };
      },
    }),
  ] : [],

  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },

  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },

  pages: { signIn: "/", error: "/" },
};


/lib/db.js

import "server-only";
import { createClient } from "@supabase/supabase-js";

export const databaseReady = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);

function getDb() {
  if (!databaseReady) throw new Error("Supabase 연결 정보를 설정하세요.");
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function getOrCreateUser(userId) {
  const db = getDb();
  const { error: insertError } = await db.from("demoapp_users")
    .upsert({ id: userId }, { onConflict: "id", ignoreDuplicates: true });
  if (insertError) throw insertError;

  const { data, error } = await db.from("demoapp_users")
    .select("id, onboarding_completed").eq("id", userId).single();
  if (error) throw error;
  return data;
}

export async function markOnboardingComplete(userId) {
  const { error } = await getDb().from("demoapp_users")
    .update({ onboarding_completed: true }).eq("id", userId).select("id").single();
  if (error) throw error;
}

