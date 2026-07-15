import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: "h-11 w-11",
  md: "h-14 w-14",
  lg: "h-20 w-20",
} as const;

export function LogoMark({ size = "md", className }: { size?: keyof typeof SIZES; className?: string }) {
  return (
    <span className={cn("relative inline-flex shrink-0 items-center justify-center", SIZES[size], className)}>
      <Image src="/images/logo.png" alt="ГЛИБОКО" fill sizes="80px" className="object-contain" priority />
    </span>
  );
}
