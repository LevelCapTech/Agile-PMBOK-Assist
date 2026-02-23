"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import type { IconResolver } from "@contracts/pages/dashboard";

export const IconResolverContext = createContext<IconResolver | null>(null);

export const IconResolverProvider = ({
  resolver,
  children,
}: {
  resolver: IconResolver;
  children: ReactNode;
}) => (
  <IconResolverContext.Provider value={resolver}>
    {children}
  </IconResolverContext.Provider>
);

export const useIcon = (iconKey: string): ReactNode => {
  const resolver = useContext(IconResolverContext);
  if (!resolver) {
    throw new Error(
      `useIcon: IconResolverProvider が見つかりません。iconKey="${iconKey}"`
    );
  }
  return resolver(iconKey);
};
