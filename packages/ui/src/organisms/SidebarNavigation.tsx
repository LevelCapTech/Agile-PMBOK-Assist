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
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        height: "100%",
        paddingX: 2,
        paddingY: 3,
        width: 256,
      }}
    >
      <LcSectionTitle title={sidebar.title} />
      <List
        disablePadding
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
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
