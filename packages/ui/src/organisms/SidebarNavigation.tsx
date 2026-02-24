"use client";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { SidebarNavigationProps } from "@contracts/pages/dashboard";

import { LcIcon } from "../atoms/LcIcon";
import { LcSectionTitle } from "../atoms/LcSectionTitle";

export const SidebarNavigation = ({ sidebar }: SidebarNavigationProps) => {
  const theme = useTheme();

  return (
    <Box
      className="flex h-full w-64 flex-col gap-6 px-4 py-6"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <LcSectionTitle title={sidebar.title} />
      <List className="flex flex-col gap-1" disablePadding>
        {sidebar.items.map((item) => (
          <ListItemButton
            key={item.id}
            selected={item.active}
            sx={{
              borderRadius: 2,
              gap: 1.5,
              paddingX: 1.5,
              paddingY: 1,
              "&.Mui-selected": {
                backgroundColor: theme.palette.action.selected,
              },
            }}
          >
            <LcIcon iconKey={item.iconKey} size="sm" />
            <Typography component="span" variant="body2" fontWeight={600}>
              {item.label}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
