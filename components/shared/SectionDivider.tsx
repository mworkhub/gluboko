import { cn } from "@/lib/utils";

export function SectionDivider({ className, lineClassName }: { className?: string; lineClassName?: string }) {
  return (
    <div className={cn("flex items-center gap-3 text-gold", className)}>
      <span className={cn("h-px w-20 bg-gold/40", lineClassName)} />
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
      <span className={cn("h-px w-20 bg-gold/40", lineClassName)} />
    </div>
  );
}
