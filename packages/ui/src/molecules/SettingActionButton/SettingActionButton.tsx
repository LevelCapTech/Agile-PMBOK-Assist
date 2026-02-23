"use client";

import { Card, CardActionArea, styled, alpha } from "@mui/material";
import type { SettingActionButtonProps } from "../../types/dashboard";
import { LcIcon } from "../../atoms/LcIcon";

const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.2s ease",
  "&:hover": {
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
    transform: "translateY(-4px)",
  },
}));

const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "left",
  "&.Mui-disabled": {
    opacity: 0.6,
  },
}));

const IconContainer = styled("div")(({ theme }) => ({
  width: 48,
  height: 48,
  backgroundColor: alpha(theme.palette.primary.main, 0.06),
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

const ActionLabel = styled("h3")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: 0,
  marginBottom: theme.spacing(1),
}));

const ActionDescription = styled("p")(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.secondary,
  margin: 0,
}));

export const SettingActionButton = ({
  action,
  disabled = false,
  onClick,
}: SettingActionButtonProps) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(action.id);
    }
  };

  return (
    <StyledCard>
      <StyledCardActionArea
        onClick={handleClick}
        disabled={disabled || action.disabled}
      >
        <IconContainer>
          <LcIcon iconKey={action.iconKey} size="lg" />
        </IconContainer>
        <ActionLabel>{action.label}</ActionLabel>
        <ActionDescription>{action.description}</ActionDescription>
      </StyledCardActionArea>
    </StyledCard>
  );
};
