import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ReactNode } from "react";

import { LcIconButton } from "./LcIconButton";

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

describe("LcIconButton", () => {
  it("renders a disabled icon button", () => {
    render(
      <TestProvider>
        <LcIconButton
          disabled
          iconKey="plus"
          label="新規プロジェクト"
        />
      </TestProvider>
    );

    expect(
      screen.getByRole("button", { name: "新規プロジェクト" })
    ).toBeDisabled();
  });
});
