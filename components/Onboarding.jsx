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
