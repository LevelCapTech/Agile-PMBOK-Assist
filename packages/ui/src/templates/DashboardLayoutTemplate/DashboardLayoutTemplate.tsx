"use client";

import { Box, styled } from "@mui/material";
import type { DashboardLayoutTemplateProps } from "../../types/dashboard";

const LayoutRoot = styled(Box)({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
});

const SidebarWrapper = styled(Box)(({ theme }) => ({
  width: 256,
  flexShrink: 0,
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const MainWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minWidth: 0,
});

const HeaderWrapper = styled(Box)(({ theme }) => ({
  height: 64,
  flexShrink: 0,
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  backgroundColor: theme.palette.background.default,
}));

export const DashboardLayoutTemplate = ({
  header,
  sidebar,
  main,
}: DashboardLayoutTemplateProps) => {
  return (
    <LayoutRoot>
      <SidebarWrapper>{sidebar}</SidebarWrapper>
      <MainWrapper>
        <HeaderWrapper>{header}</HeaderWrapper>
        <ContentWrapper>{main}</ContentWrapper>
      </MainWrapper>
    </LayoutRoot>
  );
};
