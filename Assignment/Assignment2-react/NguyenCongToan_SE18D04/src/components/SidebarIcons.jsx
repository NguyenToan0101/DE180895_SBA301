import React from "react";

const iconSize = 20;
const stroke = "currentColor";
const strokeW = 2;

export const SidebarIconDashboard = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

export const SidebarIconNews = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8" />
    <path d="M15 18h-5" />
    <path d="M10 6h8v4h-8V6Z" />
  </svg>
);

export const SidebarIconCategory = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <line x1="9" y1="14" x2="15" y2="14" />
  </svg>
);

export const SidebarIconTags = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </svg>
);

export const SidebarIconUsers = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const SidebarIconProfile = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </svg>
);

export const SidebarIconHistory = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const iconMap = {
  dashboard: SidebarIconDashboard,
  news: SidebarIconNews,
  category: SidebarIconCategory,
  tags: SidebarIconTags,
  users: SidebarIconUsers,
  profile: SidebarIconProfile,
  history: SidebarIconHistory,
};

export function getSidebarIcon(id) {
  return iconMap[id] || SidebarIconDashboard;
}
