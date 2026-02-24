import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ReactNode } from "react";

import { ProjectListPanel } from "./ProjectListPanel";

const testTheme = createTheme({});

type TestProviderProps = {
  children: ReactNode;
};

const TestProvider = ({ children }: TestProviderProps) => {
  return (
    <ThemeProvider theme={testTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

describe("ProjectListPanel", () => {
  it("renders empty state when project list is empty", () => {
    render(
      <TestProvider>
        <ProjectListPanel title="プロジェクト一覧" projects={[]} />
      </TestProvider>
    );

    expect(screen.getByText("プロジェクトがありません")).toBeInTheDocument();
  });
});
