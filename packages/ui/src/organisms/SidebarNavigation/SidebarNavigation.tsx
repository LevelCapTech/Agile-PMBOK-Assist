"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { SidebarNavigationProps } from "@contracts/pages/dashboard";
import { LcIcon } from "../../atoms/LcIcon/LcIcon";

export const SidebarNavigation = ({ sidebar }: SidebarNavigationProps) => {
  const theme = useTheme();

  return (
    <Box
      component="nav"
      sx={{
        width: 256,
        bgcolor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LcIcon iconKey="menu" size="sm" />
          <Typography
            variant="caption"
            sx={{ fontWeight: 600, color: theme.palette.text.primary }}
          >
            {sidebar.title}
          </Typography>
        </Box>
        <LcIcon iconKey="close" size="sm" />
      </Box>

      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {sidebar.items.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 1,
              py: 1,
              borderRadius: 1,
              bgcolor: item.active
                ? `${theme.palette.primary.main}0f`
                : "transparent",
              "&:hover": {
                bgcolor: `${theme.palette.primary.main}0f`,
              },
              cursor: "pointer",
            }}
          >
            {item.active ? (
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: theme.palette.primary.main,
                  borderRadius: "2px",
                  flexShrink: 0,
                }}
              />
            ) : (
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  border: `1px solid ${theme.palette.text.secondary}`,
                  borderRadius: "2px",
                  flexShrink: 0,
                }}
              />
            )}
            <Typography
              variant="caption"
              sx={{
                color: item.active
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
                fontWeight: item.active ? 600 : 400,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
