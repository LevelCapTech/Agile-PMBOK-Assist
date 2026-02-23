"use client";

import type { ReactNode } from "react";
import type { Decorator } from "@storybook/react";

import { IconResolverProvider } from "../contexts/IconResolverContext";

const ICON_SYMBOLS: Record<string, string> = {
  search: "🔍",
  bell: "🔔",
  menu: "☰",
  close: "✕",
  plus: "＋",
  calendar: "📅",
  users: "👥",
  settings: "⚙️",
  shield: "🛡️",
  download: "⬇️",
  eye: "👁️",
  lock: "🔒",
  sliders: "⚙",
  "chevron-down": "∨",
  project: "📁",
  member: "👤",
  stats: "📊",
};

export const mockIconResolver = (iconKey: string): ReactNode => {
  const symbol = ICON_SYMBOLS[iconKey] ?? "◆";
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1em",
        height: "1em",
        fontSize: "inherit",
      }}
    >
      {symbol}
    </span>
  );
};

export const withMockIconResolver: Decorator = (Story) => (
  <IconResolverProvider resolver={mockIconResolver}>
    <Story />
  </IconResolverProvider>
);
