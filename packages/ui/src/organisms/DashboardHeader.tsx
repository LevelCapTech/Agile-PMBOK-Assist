"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { DashboardHeaderProps } from "@contracts/pages/dashboard";

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
      className="flex w-full items-center justify-between gap-6 px-6 py-4"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box className="flex flex-col gap-1">
        <Typography component="h1" variant="h6" fontWeight={600}>
          {header.title}
        </Typography>
        <Typography
          component="p"
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          {header.subtitle}
        </Typography>
      </Box>
      <Box className="flex flex-1 items-center justify-center">
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LcIcon iconKey="search" size="sm" />
              </InputAdornment>
            ),
          }}
          placeholder={header.searchPlaceholder}
          size="small"
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 999,
            maxWidth: 360,
            width: "100%",
          }}
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </Box>
      <Box className="flex items-center gap-3">
        <IconButton aria-label="通知">
          <LcIcon iconKey="bell" size="md" />
        </IconButton>
        <Box className="flex items-center gap-2">
          <LcAvatar alt={header.userName} size="md" src={header.userAvatarUrl} />
          <Typography component="span" variant="body2" fontWeight={600}>
            {header.userName}
          </Typography>
          <LcIcon iconKey="chevron-down" size="sm" />
        </Box>
      </Box>
    </Box>
  );
};
