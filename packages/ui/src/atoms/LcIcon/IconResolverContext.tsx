"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { IconResolver } from "../../types/dashboard";

export const IconResolverContext = createContext<IconResolver | null>(null);

export const useIconResolver = (): IconResolver => {
  const resolver = useContext(IconResolverContext);
  if (!resolver) {
    throw new Error("useIconResolver must be used within IconResolverProvider");
  }
  return resolver;
};

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
