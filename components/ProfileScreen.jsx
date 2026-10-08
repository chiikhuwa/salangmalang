"use client";

import { useState } from "react";
import IconifyIcon from "./IconifyIcon";

export default function ProfileScreen({ user, busy, message, onLogout }) {
  const [notice, setNotice] = useState("");
  const name = user.name || "사용자";

  function showMock(label) {
    setNotice(`${label} 화면은 목업이에요.`);
  }

  return (
    <div className="profile-screen">
      <div className="profile-banner">
        <div className="profile-avatar" role="img" aria-label="목업 프로필 사진">
          <IconifyIcon name="profile" size={26} />
        </div>
        <div className="profile-user">
          <span>네이버 계정</span>
          <strong>{name}</strong>
        </div>
        <button type="button" className="profile-edit" aria-label="프로필 수정" onClick={() => showMock("프로필 수정")}>
          <IconifyIcon name="pencil" size={20} />
        </button>
      </div>
      <img className="profile-emotion" src="/emotion.png" alt="살랑이 캐릭터" width="800" height="800" />
      <p className="profile-type"><strong>{name}</strong>님은 <strong className="salang-color">살랑이</strong> 유형이에요</p>
      <div className="profile-history">
        <button type="button" onClick={() => showMock("투표기록")}>투표기록</button>
        <button type="button" onClick={() => showMock("판결기록")}>판결기록</button>
      </div>
      <div className="profile-menu">
        <div className="profile-menu-list">
          {["설정", "기록", "고객센터"].map((label) => (
            <button type="button" key={label} onClick={() => showMock(label)}>
              <span>{label}</span><IconifyIcon name="chevron" size={16} />
            </button>
          ))}
          <button type="button" onClick={onLogout} disabled={busy}>
            <span>{busy ? "로그아웃 중…" : "로그아웃"}</span><IconifyIcon name="chevron" size={16} />
          </button>
        </div>
      </div>
      {notice && <p className="profile-notice" role="status">{notice}</p>}
      {message && <p role="alert" className="message">{message}</p>}
    </div>
  );
}
