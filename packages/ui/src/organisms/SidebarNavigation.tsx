"use client";

import { List, ListItemButton, ListItemText, Paper, Stack } from "@mui/material";

import type { SidebarNavigationProps } from "@contracts/pages/dashboard";

import { LcIcon } from "../atoms/LcIcon";
import { LcSectionTitle } from "../atoms/LcSectionTitle";

export const SidebarNavigation = ({ sidebar }: SidebarNavigationProps) => {
  return (
    <Paper sx={{ borderRadius: 0, height: "100%" }} variant="outlined">
      <Stack spacing={1}>
        <LcSectionTitle description="" title={sidebar.title} />
        <List disablePadding>
          {sidebar.items.map((item) => (
            <ListItemButton key={item.id} selected={item.active}>
              <Stack alignItems="center" direction="row" spacing={1}>
                <LcIcon iconKey={item.iconKey} size="sm" />
                <ListItemText primary={item.label} />
              </Stack>
            </ListItemButton>
          ))}
        </List>
      </Stack>
    </Paper>
  );
};
