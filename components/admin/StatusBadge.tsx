import { Badge, type BadgeProps } from "@/components/ui/badge";

const STATUS_LABELS: Record<string, string> = {
  new: "Нова",
  in_progress: "В роботі",
  done: "Виконано",
  rejected: "Відхилено",
};

const STATUS_VARIANTS: Record<string, BadgeProps["variant"]> = {
  new: "blue",
  in_progress: "amber",
  done: "emerald",
  rejected: "zinc",
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge variant={STATUS_VARIANTS[status] ?? "blue"}>{STATUS_LABELS[status] ?? status}</Badge>;
}

export { STATUS_LABELS };
