"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import type { DashboardHeaderProps } from "@contracts/dashboard/types";

import { LcAvatar } from "@ui/atoms/LcAvatar";
import { LcIcon } from "@ui/atoms/LcIcon";
import { LcIconButton } from "@ui/atoms/LcIconButton";

export const DashboardHeader = ({
  header,
  searchQuery,
  onSearchChange,
}: DashboardHeaderProps) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "background.paper", borderBottom: 1, borderColor: "divider" }}
    >
      <Toolbar className="flex items-center justify-between gap-4">
        <Box className="flex items-center gap-2">
          <LcIconButton iconKey="menu" label="メニュー" />
          <Typography
            variant="subtitle1"
            sx={{ color: "text.primary", fontWeight: "bold" }}
          >
            {header.title}
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder={header.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LcIcon iconKey="search" size="sm" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ minWidth: 240 }}
        />

        <Box className="flex items-center gap-2">
          <LcIconButton iconKey="bell" label="通知" />
          <LcAvatar
            src={header.userAvatarUrl}
            alt={header.userName}
            size="lg"
          />
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {header.userName}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
