"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import type { DashboardHeaderProps } from "@contracts/pages/dashboard";
import { LcIcon } from "@ui/atoms/LcIcon";
import { LcAvatar } from "@ui/atoms/LcAvatar";

export const DashboardHeader = ({
  header,
  searchQuery,
  onSearchChange,
}: DashboardHeaderProps) => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar className="justify-between">
        <Box className="flex items-center gap-2" sx={{ minWidth: 240 }}>
          <LcIcon iconKey="search" size="md" />
          <InputBase
            placeholder={header.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{
              fontSize: theme.typography.body2.fontSize,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              px: 1.5,
              py: 0.5,
            }}
            inputProps={{ "aria-label": header.searchPlaceholder }}
          />
        </Box>
        <Box className="flex items-center gap-3">
          <LcIcon iconKey="bell" size="md" />
          <Box className="flex items-center gap-1">
            <LcAvatar
              src={header.userAvatarUrl}
              alt={header.userName}
              size="sm"
            />
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.primary }}
            >
              {header.userName}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
