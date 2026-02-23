"use client";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import type { SidebarNavigationProps } from "@contracts/pages/dashboard";

import { LcIcon } from "../atoms/LcIcon";
import { LcSectionTitle } from "../atoms/LcSectionTitle";

export const SidebarNavigation = ({ sidebar }: SidebarNavigationProps) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        height: "100%",
      })}
    >
      <div className="p-4">
        <LcSectionTitle title={sidebar.title} />
      </div>
      <List className="space-y-1 px-2 pb-4">
        {sidebar.items.map((item) => (
          <ListItemButton
            key={item.id}
            sx={(theme) => ({
              borderRadius: theme.spacing(1.5),
              paddingY: theme.spacing(1),
              paddingX: theme.spacing(1.5),
              ...(item.active
                ? {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.15),
                    },
                  }
                : {}),
            })}
          >
            <ListItemIcon
              sx={(theme) => ({
                minWidth: 32,
                color: item.active
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
              })}
            >
              <LcIcon iconKey={item.iconKey} size="sm" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  component="span"
                  color={item.active ? "primary" : "text.primary"}
                >
                  {item.label}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
