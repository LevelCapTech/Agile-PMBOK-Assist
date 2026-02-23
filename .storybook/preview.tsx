import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import type { Preview } from "@storybook/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import React from "react";

import { appTheme } from "../src/providers/appTheme";
import { IconResolverContext } from "../packages/ui/src/contexts/IconResolverContext";
import "../app/globals.css";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const mockIconResolver = (iconKey: string) =>
  React.createElement("span", { "data-testid": `icon-${iconKey}` }, `[${iconKey}]`);

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
            <IconResolverContext value={mockIconResolver}>
              <Story />
            </IconResolverContext>
          </ThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
    ),
  ],
};

export default preview;
