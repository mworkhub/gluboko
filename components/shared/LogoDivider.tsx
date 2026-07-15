import { cn } from "@/lib/utils";

export function LogoDivider({ className }: { className?: string }) {
  return (
    <span className={cn("relative block h-px w-full bg-gold/50", className)}>
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
    </span>
  );
}
