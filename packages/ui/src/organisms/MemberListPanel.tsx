"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import type { MemberListPanelProps } from "@contracts/pages/dashboard";
import { LcSectionTitle } from "@ui/atoms/LcSectionTitle";
import { MemberListItem } from "@ui/molecules/MemberListItem";

export const MemberListPanel = ({
  title,
  members,
  isLoading = false,
  error,
}: MemberListPanelProps) => {
  if (error) {
    return (
      <Box>
        <LcSectionTitle title={title} />
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box>
        <LcSectionTitle title={title} />
        <Box className="flex justify-center py-8">
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (members.length === 0) {
    return (
      <Box>
        <LcSectionTitle title={title} />
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", py: 4, textAlign: "center" }}
        >
          メンバーがいません
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <LcSectionTitle title={title} />
      <Box className="grid grid-cols-4 gap-4">
        {members.map((member) => (
          <MemberListItem key={member.id} item={member} />
        ))}
      </Box>
    </Box>
  );
};
