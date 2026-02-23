"use client";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { SidebarNavigationProps } from "@contracts/pages/dashboard";

import { LcIcon } from "../atoms/LcIcon";

export const SidebarNavigation = ({ sidebar }: SidebarNavigationProps) => {
  const theme = useTheme();

  return (
    <Box
      component="nav"
      sx={{
        width: 256,
        borderRight: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        minHeight: "100vh",
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
        <Box className="flex items-center gap-2">
          <LcIcon iconKey="menu" size="sm" />
          <Typography variant="caption" fontWeight="bold">
            {sidebar.title}
          </Typography>
        </Box>
        <LcIcon iconKey="x" size="sm" />
      </Box>
      <List className="p-4">
        {sidebar.items.map((item) => (
          <ListItemButton
            key={item.id}
            selected={item.active}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              "&.Mui-selected": {
                bgcolor: `${theme.palette.primary.main}0F`,
                color: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: `${theme.palette.primary.main}1A`,
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <LcIcon iconKey={item.iconKey} size="sm" />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                variant: "caption",
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
