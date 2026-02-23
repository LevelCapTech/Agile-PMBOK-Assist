"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import type { MemberListPanelProps } from "@contracts/dashboard/types";

import { LcSectionTitle } from "@ui/atoms/LcSectionTitle";
import { MemberListItem } from "@ui/molecules/MemberListItem";

export const MemberListPanel = ({
  title,
  members,
  isLoading = false,
  error,
}: MemberListPanelProps) => {
  return (
    <Box component="section">
      <LcSectionTitle
        title={title}
        description="チームメンバーの稼働状況を確認"
      />

      {isLoading && (
        <Box className="flex justify-center py-8">
          <CircularProgress />
        </Box>
      )}

      {!isLoading && error && (
        <Alert severity="error">
          {error.message}
        </Alert>
      )}

      {!isLoading && !error && members.length === 0 && (
        <Typography variant="body2" sx={{ color: "text.secondary" }} className="py-8 text-center">
          メンバーがいません
        </Typography>
      )}

      {!isLoading && !error && members.length > 0 && (
        <Box className="grid grid-cols-4 gap-4">
          {members.map((member) => (
            <MemberListItem key={member.id} item={member} />
          ))}
        </Box>
      )}
    </Box>
  );
};
