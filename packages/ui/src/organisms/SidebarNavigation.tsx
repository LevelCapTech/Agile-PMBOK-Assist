"use client";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import type { SidebarNavigationProps } from "@contracts/dashboard/types";

import { LcIcon } from "@ui/atoms/LcIcon";

export const SidebarNavigation = ({ sidebar }: SidebarNavigationProps) => {
  return (
    <Box
      component="nav"
      sx={{
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        height: "100%",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: "text.primary", fontWeight: "bold" }}
        >
          {sidebar.title}
        </Typography>
      </Box>
      <List disablePadding>
        {sidebar.items.map((item) => (
          <ListItemButton
            key={item.id}
            selected={item.active}
            sx={{
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                "&:hover": { bgcolor: "primary.dark" },
                "& .MuiListItemIcon-root": {
                  color: "primary.contrastText",
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LcIcon iconKey={item.iconKey} size="sm" />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
