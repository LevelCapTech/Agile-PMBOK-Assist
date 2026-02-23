import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ReactNode } from "react";

import { MuiTailwindSample } from "./MuiTailwindSample";

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

describe("MuiTailwindSample", () => {
  it("renders the MUI button label", () => {
    render(
      <TestProvider>
        <MuiTailwindSample />
      </TestProvider>
    );

    expect(
      screen.getByRole("button", {
        name: "MUI Button",
      })
    ).toBeTruthy();
  });
});
