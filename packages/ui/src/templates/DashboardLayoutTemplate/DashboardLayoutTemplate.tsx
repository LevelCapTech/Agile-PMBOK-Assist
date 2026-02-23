"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import type { DashboardLayoutTemplateProps } from "@contracts/pages/dashboard";

export const DashboardLayoutTemplate = ({
  header,
  sidebar,
  main,
}: DashboardLayoutTemplateProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.background.default,
      }}
    >
      {header}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {sidebar}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 4,
          }}
        >
          {main}
        </Box>
      </Box>
    </Box>
  );
};
