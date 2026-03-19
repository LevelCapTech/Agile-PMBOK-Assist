import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";

import type { ProjectDetailsPageData } from "@contracts/pages/project-details";

import { ProjectDetailsPage } from "./ProjectDetailsPage";

const testTheme = createTheme({});

const TestProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={testTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const buildSampleData = (): ProjectDetailsPageData => ({
  header: {
    id: "1",
    name: "ECサイトリニューアルプロジェクト",
    code: "PRJ-2024-001",
    startDate: "2024年1月15日",
  },
  phases: [
    { id: "phase-1", name: "要件定義", status: "DONE", progress: 100 },
    { id: "phase-2", name: "基本設計", status: "IN_PROGRESS", progress: 60 },
  ],
  members: [
    { id: "member-1", name: "田中太郎", role: "PM", avatarUrl: null },
  ],
  meetings: [
    {
      id: "meeting-1",
      name: "週次定例ミーティング",
      dayOfWeek: "MON",
      timeRange: "14:00-15:00",
    },
  ],
  plan: [
    {
      id: "plan-basic",
      title: "基本情報",
      items: [{ label: "発注元", value: "ABC株式会社" }],
    },
  ],
  overallProgress: {
    percentage: 80,
    completedCount: 1,
    inProgressCount: 1,
    notStartedCount: 0,
  },
});

describe("ProjectDetailsPage", () => {
  it("renders header and plan sections", () => {
    const handleBack = vi.fn();
    render(
      <TestProvider>
        <ProjectDetailsPage data={buildSampleData()} onBack={handleBack} />
      </TestProvider>,
    );

    expect(
      screen.getByText("ECサイトリニューアルプロジェクト"),
    ).toBeInTheDocument();
    expect(screen.getByText("PRJ-2024-001")).toBeInTheDocument();
    expect(screen.getByText("開始日: 2024年1月15日")).toBeInTheDocument();
    expect(screen.getByText(/名のメンバー/)).toBeInTheDocument();
    expect(screen.getByText("プロジェクトフェーズ")).toBeInTheDocument();
    expect(screen.getByText("週次定例ミーティング")).toBeInTheDocument();
    expect(screen.getByText("ABC株式会社")).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "プロジェクト一覧に戻る" }));
    expect(handleBack).toHaveBeenCalledTimes(1);

    const accordionButton = screen.getByRole("button", { name: /1\. 基本情報/ });
    expect(accordionButton).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(accordionButton);
    expect(accordionButton).toHaveAttribute("aria-expanded", "false");
  });

  it("renders empty meetings state", () => {
    const data = buildSampleData();
    render(
      <TestProvider>
        <ProjectDetailsPage
          data={{
            ...data,
            meetings: [],
          }}
        />
      </TestProvider>,
    );

    expect(screen.getByText("会議体がありません")).toBeInTheDocument();
  });
});
