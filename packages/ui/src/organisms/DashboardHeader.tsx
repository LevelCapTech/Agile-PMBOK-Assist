"use client";

import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { DashboardHeaderProps } from "../types/dashboard";
import { LcAvatar } from "../atoms/LcAvatar";
import { LcIcon } from "../atoms/LcIcon";

export const DashboardHeader = ({
  header,
  searchQuery,
  onSearchChange,
}: DashboardHeaderProps) => {
  const theme = useTheme();

  return (
    <Box
      className="flex items-center justify-between gap-6"
      sx={{
        padding: theme.spacing(2, 3),
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box className="flex flex-col gap-1">
        <Typography variant="h6" color="text.primary">
          {header.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {header.subtitle}
        </Typography>
      </Box>
      <TextField
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={header.searchPlaceholder}
        size="small"
        sx={{
          minWidth: 280,
          backgroundColor: theme.palette.background.paper,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LcIcon iconKey="search" size="sm" />
            </InputAdornment>
          ),
        }}
      />
      <Box className="flex items-center gap-3">
        <IconButton aria-label="通知">
          <LcIcon iconKey="notification" size="md" />
        </IconButton>
        <Box className="flex items-center gap-2">
          <LcAvatar
            src={header.userAvatarUrl}
            alt={header.userName}
            size="md"
          />
          <Typography variant="body2" color="text.primary">
            {header.userName}
          </Typography>
          <LcIcon iconKey="chevron-down" size="sm" />
        </Box>
      </Box>
    </Box>
  );
};
