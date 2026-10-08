"use client";

// DB 연결 같은 서버 오류가 나면 Next.js가 이 화면을 보여 줍니다.
export default function ErrorPage({ retry }) {
  return (
    <main className="app">
      <header className="header">DemoApp</header>
      <section className="content">
        <h1>잠시 연결하지 못했어요</h1>
        <p className="description">잠시 후 다시 시도해 주세요.</p>
        <div className="actions">
          <button className="primary" onClick={() => retry()}>다시 시도</button>
        </div>
      </section>
    </main>
  );
}
