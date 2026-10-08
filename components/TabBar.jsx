"use client";

import IconifyIcon from "./IconifyIcon";

const tabs = [
  { id: "home", label: "홈", icon: "home" },
  { id: "profile", label: "프로필", icon: "profile" },
];

export default function TabBar({ activeTab, onChange }) {
  return (
    <nav className="tab-bar" aria-label="하단 메뉴">
      {tabs.map(({ id, label, icon }) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          aria-current={activeTab === id ? "page" : undefined}
          onClick={() => onChange(id)}
        >
          <IconifyIcon name={icon} size={22} />
        </button>
      ))}
    </nav>
  );
}
