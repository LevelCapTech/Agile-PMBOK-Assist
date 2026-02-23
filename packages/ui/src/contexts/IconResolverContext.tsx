"use client";

import { Box } from "@mui/material";
import { createContext, useContext, type ReactNode } from "react";

import type { IconResolver } from "@contracts/pages/dashboard";

const defaultIconResolver: IconResolver = (iconKey: string): ReactNode => {
  const label = iconKey.slice(0, 1).toUpperCase();
  return (
    <Box
      aria-hidden
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        border: 1,
        borderColor: "divider",
        color: "text.secondary",
        fontSize: "0.625rem",
        lineHeight: 1,
      }}
    >
      {label || "?"}
    </Box>
  );
};

const IconResolverContext = createContext<IconResolver>(defaultIconResolver);

export interface IconResolverProviderProps {
  children: ReactNode;
  resolver: IconResolver;
}

export const IconResolverProvider = ({
  children,
  resolver,
}: IconResolverProviderProps) => {
  return (
    <IconResolverContext.Provider value={resolver}>
      {children}
    </IconResolverContext.Provider>
  );
};

export const useIcon = (iconKey: string) => {
  const resolver = useContext(IconResolverContext);
  return resolver(iconKey);
};
