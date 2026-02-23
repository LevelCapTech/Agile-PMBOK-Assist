"use client";

import { Box, Stack } from "@mui/material";

import type { DashboardLayoutTemplateProps } from "@contracts/pages/dashboard";

export const DashboardLayoutTemplate = ({
  header,
  sidebar,
  main,
}: DashboardLayoutTemplateProps) => {
  return (
    <Stack direction="row" sx={{ minHeight: "100vh" }}>
      <Box sx={{ width: 260, borderRight: 1, borderColor: "divider" }}>{sidebar}</Box>
      <Stack sx={{ flex: 1 }}>
        {header}
        <Box
          sx={(theme) => ({
            p: 3,
            background: theme.palette.background.default,
            display: "grid",
            gap: 4,
          })}
        >
          {main}
        </Box>
      </Stack>
    </Stack>
  );
};
