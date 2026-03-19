import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import type { ProjectDetailsPageData } from "@contracts/pages/project-details";

import { ProjectDetailsHeaderCard } from "./ProjectDetailsHeaderCard";
import { ProjectDetailsMeetingsSection } from "./ProjectDetailsMeetingsSection";
import { ProjectDetailsMembersSection } from "./ProjectDetailsMembersSection";
import { ProjectDetailsPhaseSection } from "./ProjectDetailsPhaseSection";
import { ProjectDetailsPlanSection } from "./ProjectDetailsPlanSection";

const testTheme = createTheme({});

const TestProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={testTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const sampleHeader: ProjectDetailsPageData["header"] = {
  id: "1",
  name: "ECサイトリニューアルプロジェクト",
  code: "PRJ-2024-001",
  startDate: "2024年1月15日",
};

const sampleOverall: ProjectDetailsPageData["overallProgress"] = {
  percentage: 36,
  completedCount: 3,
  inProgressCount: 1,
  notStartedCount: 6,
};

const samplePhases: ProjectDetailsPageData["phases"] = [
  { id: "phase-1", name: "要件定義", status: "DONE", progress: 100 },
];

const sampleMembers: ProjectDetailsPageData["members"] = [
  { id: "member-1", name: "田中太郎", role: "メンバー", avatarUrl: null },
];

const sampleMeetings: ProjectDetailsPageData["meetings"] = [
  {
    id: "meeting-1",
    name: "週次定例ミーティング",
    dayOfWeek: "MON",
    timeRange: "14:00-15:00",
  },
];

const samplePlan: ProjectDetailsPageData["plan"] = [
  {
    id: "plan-basic",
    title: "基本情報",
    items: [{ label: "発注元", value: "ABC株式会社" }],
  },
];

describe("ProjectDetails action handlers", () => {
  it("calls back handler on header", () => {
    const handleBack = vi.fn();
    render(
      <TestProvider>
        <ProjectDetailsHeaderCard
          header={sampleHeader}
          overallProgress={sampleOverall}
          memberCount={1}
          onBack={handleBack}
        />
      </TestProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "プロジェクト一覧に戻る" }));
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it("calls action handlers for sections", () => {
    const handleAddPhase = vi.fn();
    const handleAddMember = vi.fn();
    const handleAddMeeting = vi.fn();
    const handlePrint = vi.fn();
    const handleEdit = vi.fn();

    render(
      <TestProvider>
        <ProjectDetailsPhaseSection phases={samplePhases} onAddPhase={handleAddPhase} />
        <ProjectDetailsMembersSection
          members={sampleMembers}
          onAddMember={handleAddMember}
        />
        <ProjectDetailsMeetingsSection
          meetings={sampleMeetings}
          onAddMeeting={handleAddMeeting}
        />
        <ProjectDetailsPlanSection
          plan={samplePlan}
          resetKey="1"
          onEdit={handleEdit}
          onPrint={handlePrint}
        />
      </TestProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "フェーズ追加" }));
    fireEvent.click(screen.getByRole("button", { name: "メンバー追加" }));
    fireEvent.click(screen.getByRole("button", { name: "会議体追加" }));
    fireEvent.click(screen.getByRole("button", { name: "印刷" }));
    fireEvent.click(screen.getByRole("button", { name: "編集" }));

    expect(handleAddPhase).toHaveBeenCalledTimes(1);
    expect(handleAddMember).toHaveBeenCalledTimes(1);
    expect(handleAddMeeting).toHaveBeenCalledTimes(1);
    expect(handlePrint).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });
});
