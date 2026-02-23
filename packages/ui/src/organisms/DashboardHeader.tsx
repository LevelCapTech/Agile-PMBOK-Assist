"use client";

import { AppBar, Box, Stack, TextField, Toolbar, Typography } from "@mui/material";

import type { DashboardHeaderProps } from "@contracts/pages/dashboard";

import { LcAvatar } from "../atoms/LcAvatar";
import { LcIcon } from "../atoms/LcIcon";

export const DashboardHeader = ({
  header,
  searchQuery,
  onSearchChange,
}: DashboardHeaderProps) => {
  return (
    <AppBar color="inherit" elevation={0} position="static" sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        <Stack spacing={0.5}>
          <Typography color="text.primary" variant="h6">
            {header.title}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {header.subtitle}
          </Typography>
        </Stack>

        <TextField
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={header.searchPlaceholder}
          size="small"
          sx={{ minWidth: 320 }}
          value={searchQuery}
        />

        <Stack alignItems="center" direction="row" spacing={1}>
          <LcIcon iconKey="notification" />
          <LcAvatar alt={header.userName} src={header.userAvatarUrl} />
          <Box>
            <Typography color="text.primary" variant="body2">
              {header.userName}
            </Typography>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
