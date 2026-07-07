"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ServiceCategory } from "@/content/services";

type LeadModalState = {
  isOpen: boolean;
  category?: ServiceCategory;
  serviceType?: string;
};

type LeadModalContextValue = {
  state: LeadModalState;
  open: (category?: ServiceCategory, serviceType?: string) => void;
  close: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LeadModalState>({ isOpen: false });

  const open = useCallback((category?: ServiceCategory, serviceType?: string) => {
    setState({ isOpen: true, category, serviceType });
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  const value = useMemo(() => ({ state, open, close }), [state, open, close]);

  return <LeadModalContext.Provider value={value}>{children}</LeadModalContext.Provider>;
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used within LeadModalStateProvider");
  }
  return ctx;
}
