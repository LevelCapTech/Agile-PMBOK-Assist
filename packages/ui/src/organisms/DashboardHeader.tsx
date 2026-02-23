"use client";

import { Box, InputAdornment, TextField, Typography } from "@mui/material";

import type { DashboardHeaderProps } from "@contracts/pages/dashboard";

import { LcAvatar } from "../atoms/LcAvatar";
import { LcIcon } from "../atoms/LcIcon";

export const DashboardHeader = ({
  header,
  searchQuery,
  onSearchChange,
}: DashboardHeaderProps) => {
  return (
    <Box
      className="flex items-center justify-between gap-6"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(2, 3),
      })}
    >
      <div className="flex flex-col gap-1">
        <Typography variant="subtitle1" component="h1" color="text.primary">
          {header.title}
        </Typography>
        <Typography variant="body2" component="p" color="text.secondary">
          {header.subtitle}
        </Typography>
      </div>

      <TextField
        size="small"
        variant="outlined"
        value={searchQuery}
        placeholder={header.searchPlaceholder}
        onChange={(event) => onSearchChange(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box sx={{ color: "text.secondary" }}>
                <LcIcon iconKey="search" size="sm" />
              </Box>
            </InputAdornment>
          ),
        }}
        sx={(theme) => ({
          minWidth: 260,
          backgroundColor: theme.palette.background.paper,
          "& .MuiOutlinedInput-root": {
            fontSize: theme.typography.body2.fontSize,
            color: theme.palette.text.secondary,
          },
        })}
      />

      <div className="flex items-center gap-4">
        <Box sx={{ color: "text.secondary" }}>
          <LcIcon iconKey="bell" size="md" />
        </Box>
        <div className="flex items-center gap-2">
          <LcAvatar
            src={header.userAvatarUrl}
            alt={header.userName}
            size="md"
          />
          <Typography variant="body2" component="span" color="text.primary">
            {header.userName}
          </Typography>
          <Box sx={{ color: "text.secondary" }}>
            <LcIcon iconKey="chevron-down" size="sm" />
          </Box>
        </div>
      </div>
    </Box>
  );
};
