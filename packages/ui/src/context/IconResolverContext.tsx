"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { IconResolver } from "@contracts/pages/dashboard";

const IconResolverContext = createContext<IconResolver | null>(null);

export const useIcon = (iconKey: string): ReactNode => {
  const resolver = useContext(IconResolverContext);
  if (!resolver) {
    return null;
  }
  return resolver(iconKey);
};

interface IconResolverProviderProps {
  resolver: IconResolver;
  children: ReactNode;
}

export const IconResolverProvider = ({
  resolver,
  children,
}: IconResolverProviderProps) => {
  return (
    <IconResolverContext.Provider value={resolver}>
      {children}
    </IconResolverContext.Provider>
  );
};
