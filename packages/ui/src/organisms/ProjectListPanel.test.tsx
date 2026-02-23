import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "../testUtils/renderWithProviders";
import { ProjectListPanel } from "./ProjectListPanel";

describe("ProjectListPanel", () => {
  it("renders empty state when projects are missing", () => {
    renderWithProviders(
      <ProjectListPanel title="プロジェクト選択" projects={[]} />,
    );

    expect(screen.getByText("プロジェクトがありません")).toBeInTheDocument();
  });

  it("renders error message when error is provided", () => {
    renderWithProviders(
      <ProjectListPanel
        title="プロジェクト選択"
        projects={[]}
        error={{ code: "error", message: "取得に失敗しました" }}
      />,
    );

    expect(screen.getByText("取得に失敗しました")).toBeInTheDocument();
  });
});
