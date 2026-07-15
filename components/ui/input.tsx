import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-lg border border-ink/15 bg-white-warm px-4 text-sm text-ink placeholder:text-slate/60 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-ink/15 bg-white-warm px-4 py-3 text-sm text-ink placeholder:text-slate/60 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

const Label = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Input, Textarea, Label };
