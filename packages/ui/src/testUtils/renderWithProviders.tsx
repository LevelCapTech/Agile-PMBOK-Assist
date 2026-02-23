import { CssBaseline, SvgIcon } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { ReactElement } from "react";
import { render } from "@testing-library/react";

import { IconResolverProvider } from "../atoms/IconResolverContext";

const theme = createTheme();

const mockIconResolver = () => <SvgIcon fontSize="inherit" />;

export const renderWithProviders = (ui: ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IconResolverProvider resolver={mockIconResolver}>
        {ui}
      </IconResolverProvider>
    </ThemeProvider>,
  );
};
