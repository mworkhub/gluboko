"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteService } from "@/lib/actions/services";
import type { DbServiceCategory } from "@/lib/service-category";

export function DeleteServiceButton({ id, category, title }: { id: string; category: DbServiceCategory; title: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      aria-label={`Видалити «${title}»`}
      onClick={() => {
        if (!window.confirm(`Видалити послугу «${title}»? Цю дію не можна скасувати.`)) return;
        startTransition(async () => {
          await deleteService(id, category);
        });
      }}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  );
}
