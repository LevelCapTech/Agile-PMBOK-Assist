"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { DashboardHeaderProps } from "@contracts/pages/dashboard";

import { LcIcon } from "../atoms/LcIcon";
import { LcIconButton } from "../atoms/LcIconButton";
import { LcAvatar } from "../atoms/LcAvatar";

export const DashboardHeader = ({
  header,
  searchQuery,
  onSearchChange,
}: DashboardHeaderProps) => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Toolbar className="grid grid-cols-3 items-center">
        <Box>
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
            sx={{
              width: 240,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Box>
        <Box className="flex justify-center">
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: `4px solid ${theme.palette.primary.main}`,
            }}
          />
        </Box>
        <Box className="flex items-center justify-end gap-2">
          <LcIconButton iconKey="bell" label="通知" />
          <Box className="flex items-center gap-2">
            <LcAvatar
              src={header.userAvatarUrl}
              alt={header.userName}
              size="sm"
            />
            <Typography variant="body2">{header.userName}</Typography>
            <LcIcon iconKey="chevron-down" size="sm" />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
