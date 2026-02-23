"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import type { IconResolver } from "../types/dashboard";

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

export const useIconResolver = () => {
  return useContext(IconResolverContext);
};
