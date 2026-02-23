"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";

import type { IconResolver } from "@contracts/pages/dashboard";

const fallbackResolver: IconResolver = () => null;

const IconResolverContext = createContext<IconResolver>(fallbackResolver);

type IconResolverProviderProps = {
  resolver: IconResolver;
  children: ReactNode;
};

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

export const useIcon = (iconKey: string) => {
  const resolveIcon = useContext(IconResolverContext);
  return resolveIcon(iconKey);
};
