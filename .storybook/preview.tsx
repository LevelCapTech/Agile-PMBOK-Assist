import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import type { Preview } from "@storybook/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import { IconResolverProvider } from "@ui/contexts/IconResolverContext";
import { appTheme } from "../src/providers/appTheme";
import "../app/globals.css";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

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
            <IconResolverProvider
              resolver={(iconKey) => (
                <span aria-hidden data-testid={`icon-${iconKey}`}>
                  {iconKey.slice(0, 1).toUpperCase()}
                </span>
              )}
            >
              <Story />
            </IconResolverProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
    ),
  ],
};

export default preview;
