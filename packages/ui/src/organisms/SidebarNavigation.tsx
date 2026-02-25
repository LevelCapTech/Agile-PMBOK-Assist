"use client";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { SidebarNavigationProps } from "@contracts/pages/dashboard";

import { LcIcon } from "../atoms/LcIcon";
import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { SidebarToggleButton } from "../molecules/SidebarToggleButton";

export const SidebarNavigation = ({
  sidebar,
  variant = "expanded",
  onNavigate,
  onToggleSidebarVariant,
}: SidebarNavigationProps) => {
  const theme = useTheme();
  const isRail = variant === "rail";

  return (
    <Box
      aria-label="サイドナビゲーション"
      component="nav"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        gap: isRail ? 2 : 3,
        height: "100%",
        paddingX: isRail ? 1 : 2,
        paddingY: 3,
        width: isRail ? 72 : 256,
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: isRail ? "center" : "space-between",
        }}
      >
        {isRail ? null : <LcSectionTitle title={sidebar.title} />}
        <SidebarToggleButton onToggle={onToggleSidebarVariant} variant={variant} />
      </Box>
      <List
        disablePadding
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
        {sidebar.items.map((item) => {
          const isLink = Boolean(item.href) && !item.disabled;
          const button = (
            <ListItemButton
              aria-current={item.active ? "page" : undefined}
              aria-label={item.label}
              component={isLink ? "a" : "button"}
              disabled={item.disabled}
              href={isLink ? item.href : undefined}
              key={item.id}
              onClick={
                item.disabled ? undefined : () => onNavigate?.(item.id)
              }
              selected={item.active}
              sx={{
                borderRadius: 2,
                gap: isRail ? 0 : 1.5,
                justifyContent: isRail ? "center" : "flex-start",
                minHeight: 44,
                paddingX: isRail ? 1 : 1.5,
                paddingY: 1,
                "&.Mui-selected": {
                  backgroundColor: theme.palette.action.selected,
                },
                "&:focus-visible": {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2,
                },
              }}
            >
              <LcIcon iconKey={item.iconKey} size={isRail ? "lg" : "md"} />
              {isRail ? null : (
                <Typography component="span" variant="body2" fontWeight={600}>
                  {item.label}
                </Typography>
              )}
            </ListItemButton>
          );

          if (!isRail) {
            return button;
          }

          return (
            <Tooltip key={item.id} placement="right" title={item.label}>
              <Box component="span" sx={{ display: "inline-flex" }}>
                {button}
              </Box>
            </Tooltip>
          );
        })}
      </List>
    </Box>
  );
};
