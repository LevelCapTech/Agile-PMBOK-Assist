"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { MemberListPanelProps } from "@contracts/pages/dashboard";

import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { MemberListItem } from "../molecules/MemberListItem";

export const MemberListPanel = ({
  title,
  members,
  isLoading,
  error,
}: MemberListPanelProps) => {
  const theme = useTheme();

  const renderContent = () => {
    if (isLoading) {
      return (
        <Typography component="p" variant="body2">
          読み込み中...
        </Typography>
      );
    }

    if (error) {
      return (
        <Typography
          component="p"
          variant="body2"
          sx={{ color: theme.palette.error.main }}
        >
          {error.message}
        </Typography>
      );
    }

    if (members.length === 0) {
      return (
        <Typography
          component="p"
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          メンバーがいません
        </Typography>
      );
    }

    return (
      <Box className="grid grid-cols-4 gap-4">
        {members.map((member) => (
          <MemberListItem key={member.id} item={member} />
        ))}
      </Box>
    );
  };

  return (
    <Box className="flex flex-col gap-4">
      <LcSectionTitle title={title} />
      {renderContent()}
    </Box>
  );
};
