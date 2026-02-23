import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "../testUtils/renderWithProviders";
import type { DashboardHeaderView } from "../types/dashboard";
import { DashboardHeader } from "./DashboardHeader";

const header: DashboardHeaderView = {
  title: "プロジェクト選択",
  subtitle: "プロジェクトを選択して作業を開始",
  searchPlaceholder: "検索",
  searchQuery: "",
  userName: "田中太郎",
  userAvatarUrl: "https://placehold.co/64x64",
};

describe("DashboardHeader", () => {
  it("calls onSearchChange when input changes", () => {
    const handleChange = vi.fn();
    renderWithProviders(
      <DashboardHeader
        header={header}
        searchQuery="初期"
        onSearchChange={handleChange}
      />,
    );

    const input = screen.getByPlaceholderText("検索") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "更新" } });

    expect(handleChange).toHaveBeenCalledWith("更新");
  });
});
