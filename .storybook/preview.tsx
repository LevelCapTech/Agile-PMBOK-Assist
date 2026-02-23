import { Box, CssBaseline, Typography } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import type { Preview } from "@storybook/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import type { IconResolver } from "@contracts/pages/dashboard";
import { IconResolverProvider } from "@ui/contexts/IconResolverContext";

import { appTheme } from "../src/providers/appTheme";
import "../app/globals.css";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const iconResolver: IconResolver = (iconKey) => (
  <Box
    component="span"
    sx={(theme) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1em",
      height: "1em",
      borderRadius: theme.spacing(0.5),
      border: `1px solid ${theme.palette.divider}`,
      fontSize: "0.65em",
      lineHeight: 1,
    })}
  >
    <Typography variant="caption" component="span" color="text.secondary">
      {iconKey.slice(0, 1).toUpperCase()}
    </Typography>
  </Box>
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
            <IconResolverProvider resolver={iconResolver}>
              <Story />
            </IconResolverProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
    ),
  ],
};

export default preview;
