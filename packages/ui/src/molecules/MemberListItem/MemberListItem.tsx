"use client";

import { Card, CardContent, styled } from "@mui/material";
import type { MemberListItemProps } from "../../types/dashboard";
import { LcAvatar } from "../../atoms/LcAvatar";
import { LcStatusChip } from "../../atoms/LcStatusChip";
import { LcIcon } from "../../atoms/LcIcon";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "all 0.2s ease",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
    transform: "translateY(-4px)",
  },
}));

const MemberInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const MemberName = styled("h3")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: 0,
}));

const MemberRole = styled("p")(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.secondary,
  margin: 0,
}));

const ProjectCountInfo = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
}));

const ProjectCountLabel = styled("span")(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.secondary,
}));

const ProjectCountValue = styled("span")(({ theme }) => ({
  fontSize: "12px",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const getStatusTone = (
  status: string
): "primary" | "success" | "warning" | "error" | "neutral" => {
  switch (status) {
    case "稼働中":
      return "success";
    case "待機中":
      return "warning";
    case "休暇中":
      return "neutral";
    default:
      return "primary";
  }
};

export const MemberListItem = ({ item }: MemberListItemProps) => {
  return (
    <StyledCard>
      <CardContent className="p-6">
        <MemberInfo className="mb-4">
          <div className="mb-3">
            <LcAvatar src={item.avatarUrl} alt={item.displayName} size="lg" />
          </div>
          <MemberName className="mb-1">{item.displayName}</MemberName>
          <MemberRole className="mb-3">{item.role}</MemberRole>
          <LcStatusChip status={item.status} tone={getStatusTone(item.status)} />
        </MemberInfo>

        <div className="border-t pt-4">
          <ProjectCountInfo>
            <LcIcon iconKey="users" size="sm" />
            <ProjectCountLabel>担当プロジェクト:</ProjectCountLabel>
            <ProjectCountValue>{item.projectCount}件</ProjectCountValue>
          </ProjectCountInfo>
        </div>
      </CardContent>
    </StyledCard>
  );
};
