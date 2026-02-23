import { CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import type { Preview } from "@storybook/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import { appTheme } from "../src/providers/appTheme";
import { IconResolverProvider } from "../packages/ui/src/contexts/IconResolverContext";
import { mockIconResolver } from "../packages/ui/src/stories/mockIconResolver";
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
