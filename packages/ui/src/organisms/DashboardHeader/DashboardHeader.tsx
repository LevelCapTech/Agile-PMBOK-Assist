"use client";

import { AppBar, Toolbar, InputBase, IconButton, styled } from "@mui/material";
import type { DashboardHeaderProps } from "../../types/dashboard";
import { LcIcon } from "../../atoms/LcIcon";
import { LcAvatar } from "../../atoms/LcAvatar";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.action.hover,
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: theme.spacing(1),
    width: "100%",
  },
}));

const UserSection = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginLeft: "auto",
}));

const UserName = styled("span")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const DashboardHeader = ({
  header,
  searchQuery,
  onSearchChange,
}: DashboardHeaderProps) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <SearchContainer>
          <SearchIconWrapper>
            <LcIcon iconKey="search" size="sm" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={header.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            inputProps={{ "aria-label": "search" }}
          />
        </SearchContainer>

        <UserSection>
          <IconButton aria-label="notifications">
            <LcIcon iconKey="bell" size="md" />
          </IconButton>
          <UserName>{header.userName}</UserName>
          <LcAvatar
            src={header.userAvatarUrl}
            alt={header.userName}
            size="md"
          />
        </UserSection>
      </Toolbar>
    </StyledAppBar>
  );
};
