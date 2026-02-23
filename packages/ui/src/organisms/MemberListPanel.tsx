"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { MemberListPanelProps } from "../types/dashboard";
import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { MemberListItem } from "../molecules/MemberListItem";

export const MemberListPanel = ({
  title,
  members,
  isLoading,
  error,
}: MemberListPanelProps) => {
  const theme = useTheme();

  return (
    <Box className="flex flex-col gap-4">
      <LcSectionTitle title={title} />
      {isLoading ? (
        <Box
          className="flex items-center gap-2"
          sx={{ color: theme.palette.text.secondary }}
        >
          <CircularProgress size={20} />
          <Typography variant="body2">読み込み中...</Typography>
        </Box>
      ) : error ? (
        <Typography variant="body2" color="error">
          {error.message}
        </Typography>
      ) : members.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          メンバーがいません
        </Typography>
      ) : (
        <Box className="grid grid-cols-4 gap-4">
          {members.map((member) => (
            <MemberListItem key={member.id} item={member} />
          ))}
        </Box>
      )}
    </Box>
  );
};
