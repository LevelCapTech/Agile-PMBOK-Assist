"use client";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { SidebarNavigationProps } from "../types/dashboard";
import { LcIcon } from "../atoms/LcIcon";
import { LcSectionTitle } from "../atoms/LcSectionTitle";

export const SidebarNavigation = ({ sidebar }: SidebarNavigationProps) => {
  const theme = useTheme();

  return (
    <Box
      className="flex flex-col gap-4"
      sx={{
        width: 240,
        padding: theme.spacing(3, 2),
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <LcSectionTitle title={sidebar.title} />
      <List className="flex flex-col gap-1">
        {sidebar.items.map((item) => (
          <ListItemButton
            key={item.id}
            selected={item.active}
            sx={{
              borderRadius: 2,
              color: theme.palette.text.primary,
              "&.Mui-selected": {
                backgroundColor: theme.palette.action.selected,
                color: theme.palette.primary.main,
              },
            }}
            aria-current={item.active ? "page" : undefined}
          >
            <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
              <LcIcon iconKey={item.iconKey} size="sm" />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
