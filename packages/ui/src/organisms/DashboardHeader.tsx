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
      sx={{
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        gap: 3,
        justifyContent: "space-between",
        paddingX: 3,
        paddingY: 2,
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
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
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LcIcon iconKey="search" size="sm" />
              </InputAdornment>
            ),
          }}
          inputProps={{ "aria-label": "プロジェクトを検索" }}
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
      <Box sx={{ alignItems: "center", display: "flex", gap: 1.5 }}>
        <IconButton aria-label="通知">
          <LcIcon iconKey="bell" size="md" />
        </IconButton>
        <Box sx={{ alignItems: "center", display: "flex", gap: 1 }}>
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
