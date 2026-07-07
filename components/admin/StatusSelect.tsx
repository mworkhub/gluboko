"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/lib/actions/leads";
import { STATUS_LABELS } from "./StatusBadge";
import type { ServiceCategory } from "@/content/services";

const STATUSES = ["new", "in_progress", "done", "rejected"] as const;

export function StatusSelect({
  category,
  leadId,
  status,
}: {
  category: ServiceCategory;
  leadId: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as (typeof STATUSES)[number];
        startTransition(() => {
          updateLeadStatus(category, leadId, next);
        });
      }}
      className="rounded-lg border border-ink/15 bg-white px-2.5 py-1.5 text-xs font-medium text-ink outline-none focus:border-gold disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
