"use client";

import { Box } from "@mui/material";

import type { DashboardLayoutTemplateProps } from "@contracts/pages/dashboard";

export const DashboardLayoutTemplate = ({
  header,
  sidebar,
  main,
}: DashboardLayoutTemplateProps) => {
  return (
    <Box className="flex min-h-screen" sx={{ backgroundColor: "background.default" }}>
      <aside className="w-64">{sidebar}</aside>
      <div className="flex flex-1 flex-col">
        <header>{header}</header>
        <main className="flex-1 p-8">{main}</main>
      </div>
    </Box>
  );
};
