import { Box, CssBaseline } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import type { Preview } from "@storybook/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import { appTheme } from "../src/providers/appTheme";
import { IconResolverProvider } from "../packages/ui/src/contexts/IconResolverContext";
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
                <Box
                  component="span"
                  sx={{
                    alignItems: "center",
                    backgroundColor: appTheme.palette.action.selected,
                    borderRadius: "50%",
                    color: appTheme.palette.text.secondary,
                    display: "inline-flex",
                    fontSize: 10,
                    height: "100%",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  {iconKey.slice(0, 1).toUpperCase()}
                </Box>
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
