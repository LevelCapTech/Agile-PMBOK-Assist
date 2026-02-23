import { CssBaseline, SvgIcon } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import type { Preview } from "@storybook/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import type { IconResolver } from "../packages/ui/src/types/dashboard";
import { IconResolverProvider } from "../packages/ui/src/atoms/IconResolverContext";
import { appTheme } from "../src/providers/appTheme";
import "../app/globals.css";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const mockIconResolver: IconResolver = (iconKey) => (
  <SvgIcon fontSize="inherit" titleAccess={iconKey} data-icon-key={iconKey}>
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12h8" stroke="currentColor" strokeWidth="2" />
  </SvgIcon>
);

const preview: Preview = {
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CacheProvider value={muiCache}>
        <StyledEngineProvider enableCssLayer injectFirst>
          <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <IconResolverProvider resolver={mockIconResolver}>
              <Story />
            </IconResolverProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
    ),
  ],
};

export default preview;
