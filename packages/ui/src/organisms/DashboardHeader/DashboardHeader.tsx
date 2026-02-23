"use client";

import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { DashboardHeaderProps } from "@contracts/pages/dashboard";
import { LcIcon } from "../../atoms/LcIcon/LcIcon";
import { LcAvatar } from "../../atoms/LcAvatar/LcAvatar";

export const DashboardHeader = ({
  header,
  searchQuery,
  onSearchChange,
}: DashboardHeaderProps) => {
  const theme = useTheme();

  return (
    <Box
      component="header"
      sx={{
        height: 64,
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        px: 2,
        flexShrink: 0,
      }}
    >
      {/* Search */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          px: 1.5,
          py: 0.75,
          width: 240,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <LcIcon iconKey="search" size="sm" />
        <InputBase
          placeholder={header.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          inputProps={{ "aria-label": header.searchPlaceholder }}
          sx={{
            ml: 1,
            flex: 1,
            fontSize: "0.75rem",
            color: theme.palette.text.secondary,
          }}
        />
      </Box>

      {/* Logo */}
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: `4px solid ${theme.palette.primary.main}`,
        }}
      />

      {/* User area */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <LcIcon iconKey="bell" size="md" />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LcAvatar
            src={header.userAvatarUrl}
            alt={header.userName}
            size="sm"
          />
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.primary }}
          >
            {header.userName}
          </Typography>
          <LcIcon iconKey="chevron-down" size="sm" />
        </Box>
      </Box>
    </Box>
  );
};
