"use client";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import type { SidebarNavigationProps } from "../../types/dashboard";
import { LcSectionTitle } from "../../atoms/LcSectionTitle";
import { LcIcon } from "../../atoms/LcIcon";

const DRAWER_WIDTH = 280;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: DRAWER_WIDTH,
    boxSizing: "border-box",
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
  },
}));

const DrawerContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "$active",
})<{ $active?: boolean }>(({ theme, $active }) => {
  const activeStyles = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.contrastText,
    },
  };

  return {
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1.5, 2),
    ...($active ? activeStyles : {}),
  };
});

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 40,
  color: theme.palette.text.secondary,
}));

export const SidebarNavigation = ({ sidebar }: SidebarNavigationProps) => {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <DrawerContent>
        <div className="mb-6">
          <LcSectionTitle title={sidebar.title} />
        </div>
        <List>
          {sidebar.items.map((item) => (
            <StyledListItemButton key={item.id} $active={item.active}>
              <StyledListItemIcon>
                <LcIcon iconKey={item.iconKey} size="md" />
              </StyledListItemIcon>
              <ListItemText primary={item.label} />
            </StyledListItemButton>
          ))}
        </List>
      </DrawerContent>
    </StyledDrawer>
  );
};
