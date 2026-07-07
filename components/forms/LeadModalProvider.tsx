"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect } from "react";
import { LeadModalStateProvider, useLeadModal } from "./lead-modal-context";
import { LeadForm } from "./LeadForm";
import type { ServiceCategory } from "@/content/services";
import type { ServiceOption } from "@/lib/types";

function LeadModalRoot({
  servicesByCategory,
}: {
  servicesByCategory: Record<ServiceCategory, ServiceOption[]>;
}) {
  const { state, close } = useLeadModal();

  useEffect(() => {
    if (!state.isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [state.isOpen, close]);

  return (
    <AnimatePresence>
      {state.isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative my-auto max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl bg-cream p-7 shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <button
              onClick={close}
              aria-label="Закрити"
              className="absolute right-5 top-5 text-slate transition-colors hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Заявка</p>
            <h2 className="mb-5 mt-1 font-display text-2xl text-ink">Замовити послугу</h2>

            <LeadForm
              key={`${state.category ?? "any"}-${state.serviceType ?? ""}`}
              initialCategory={state.category}
              initialServiceType={state.serviceType}
              servicesByCategory={servicesByCategory}
              onSuccess={() => setTimeout(close, 1800)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function LeadModalProvider({
  children,
  servicesByCategory,
}: {
  children: React.ReactNode;
  servicesByCategory: Record<ServiceCategory, ServiceOption[]>;
}) {
  return (
    <LeadModalStateProvider>
      {children}
      <LeadModalRoot servicesByCategory={servicesByCategory} />
    </LeadModalStateProvider>
  );
}
