import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import type { Preview } from "@storybook/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import React from "react";

import { appTheme } from "../src/providers/appTheme";
import { IconResolverProvider } from "../packages/ui/src/context/IconResolverContext";
import "../app/globals.css";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const mockIconResolver = (iconKey: string): React.ReactNode => {
  return React.createElement("span", {
    "data-testid": `icon-${iconKey}`,
    "aria-label": iconKey,
    style: { fontSize: "inherit", lineHeight: 1 },
  }, `[${iconKey}]`);
};

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
