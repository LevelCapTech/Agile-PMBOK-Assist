import { ThemeProvider, createTheme } from "@mui/material/styles";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IconResolverProvider } from "../contexts/IconResolverContext";
import { LcIcon } from "./LcIcon";

const theme = createTheme({});

describe("LcIcon", () => {
  it("uses icon resolver from context", () => {
    render(
      <ThemeProvider theme={theme}>
        <IconResolverProvider resolver={(iconKey) => <span>{`icon:${iconKey}`}</span>}>
          <LcIcon iconKey="project" />
        </IconResolverProvider>
      </ThemeProvider>
    );

    expect(screen.getByText("icon:project")).toBeTruthy();
  });
});
