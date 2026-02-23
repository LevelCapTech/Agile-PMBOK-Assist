"use client";

import { Card, CardContent, styled, alpha } from "@mui/material";
import type { ProjectListItemProps } from "../../types/dashboard";
import { LcStatusChip } from "../../atoms/LcStatusChip";
import { LcAvatar } from "../../atoms/LcAvatar";
import { LcIcon } from "../../atoms/LcIcon";

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  transition: "all 0.2s ease",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
    transform: "translateY(-4px)",
  },
}));

const ProjectName = styled("h2")(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: 0,
}));

const CodeBadge = styled("div")(({ theme }) => ({
  display: "inline-block",
  padding: theme.spacing(0.5, 1.5),
  backgroundColor: alpha(theme.palette.primary.main, 0.06),
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: 600,
  color: theme.palette.primary.main,
}));

const SectionLabel = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  fontSize: "10px",
  color: theme.palette.text.secondary,
}));

const AvatarGroup = styled("div")({
  display: "flex",
  alignItems: "center",
  "& > *:not(:first-of-type)": {
    marginLeft: "-8px",
  },
});

const MoreMembersChip = styled("div")(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  border: `2px solid ${theme.palette.background.paper}`,
  marginLeft: "-8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  fontWeight: 600,
  color: theme.palette.common.white,
}));

const MemberCount = styled("span")(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.text.primary,
}));

const DateInfo = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  fontSize: "12px",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const DateLabel = styled("span")(({ theme }) => ({
  fontSize: "10px",
  fontWeight: 400,
  color: theme.palette.text.secondary,
}));

export const ProjectListItem = ({ item, onSelect }: ProjectListItemProps) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(item.id);
    }
  };

  const visibleMembers = item.members.slice(0, 4);
  const remainingCount = Math.max(0, item.members.length - 4);

  return (
    <StyledCard onClick={handleClick}>
      <CardContent className="p-6">
        <ProjectName className="mb-2">{item.name}</ProjectName>

        <div className="flex items-center gap-2 mb-6">
          <CodeBadge>{item.code}</CodeBadge>
          <LcStatusChip status={item.status} tone="primary" />
        </div>

        <div className="mb-4">
          <SectionLabel className="mb-2">
            <LcIcon iconKey="users" size="sm" />
            プロジェクトメンバー
          </SectionLabel>
          <div className="flex items-center">
            <AvatarGroup>
              {visibleMembers.map((member, idx) => (
                <LcAvatar
                  key={idx}
                  src={member.avatarUrl}
                  alt={member.name}
                  size="sm"
                />
              ))}
              {remainingCount > 0 && (
                <MoreMembersChip>+{remainingCount}</MoreMembersChip>
              )}
            </AvatarGroup>
            <MemberCount className="ml-3">{item.members.length}名</MemberCount>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center gap-2">
            <LcIcon iconKey="calendar" size="sm" />
            <DateLabel>開始日:</DateLabel>
            <DateInfo>{item.startDate}</DateInfo>
          </div>
        </div>
      </CardContent>
    </StyledCard>
  );
};
