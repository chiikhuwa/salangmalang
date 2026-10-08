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
