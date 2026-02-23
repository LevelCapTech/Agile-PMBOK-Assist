"use client";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import type { SidebarNavigationProps } from "@contracts/pages/dashboard";
import { LcIcon } from "@ui/atoms/LcIcon";

export const SidebarNavigation = ({
  sidebar,
}: SidebarNavigationProps) => {
  const theme = useTheme();

  return (
    <Box
      component="nav"
      sx={{
        width: 240,
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        height: "100%",
      }}
    >
      <Box
        className="flex items-center gap-2 px-4"
        sx={{
          height: 64,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <LcIcon iconKey="menu" size="md" />
        <Typography
          variant="subtitle2"
          sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
        >
          {sidebar.title}
        </Typography>
      </Box>
      <List className="p-2">
        {sidebar.items.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={item.active}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.main + "0F",
                  color: theme.palette.primary.main,
                },
              }}
            >
              <Box className="mr-2">
                <LcIcon iconKey={item.iconKey} size="sm" />
              </Box>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  variant: "body2",
                  fontWeight: item.active ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
