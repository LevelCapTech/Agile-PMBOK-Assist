import { ThemeProvider, createTheme } from "@mui/material/styles";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { IconResolverProvider } from "../contexts/IconResolverContext";
import { DashboardHeader } from "./DashboardHeader";

const theme = createTheme({});

describe("DashboardHeader", () => {
  it("search input is controlled by props", () => {
    const onSearchChange = vi.fn();

    render(
      <ThemeProvider theme={theme}>
        <IconResolverProvider resolver={(iconKey) => <span>{iconKey}</span>}>
          <DashboardHeader
            header={{
              title: "ダッシュボード",
              subtitle: "説明",
              searchPlaceholder: "検索",
              searchQuery: "初期値",
              userName: "ユーザー",
            }}
            onSearchChange={onSearchChange}
            searchQuery="検索キーワード"
          />
        </IconResolverProvider>
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText("検索") as HTMLInputElement;
    expect(input.value).toBe("検索キーワード");

    fireEvent.change(input, { target: { value: "更新" } });

    expect(onSearchChange).toHaveBeenCalledWith("更新");
  });
});
