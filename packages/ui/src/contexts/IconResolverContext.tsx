"use client";

import { createContext, useContext } from "react";

import type { ReactNode } from "react";
import type { IconResolver } from "@contracts/dashboard/types";

const fallbackResolver: IconResolver = (iconKey: string) => (
  <span>{iconKey}</span>
);

export const IconResolverContext =
  createContext<IconResolver>(fallbackResolver);

export const useIcon = (iconKey: string): ReactNode => {
  const resolver = useContext(IconResolverContext);
  return resolver(iconKey);
};
