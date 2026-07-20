"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { submitLead } from "@/lib/actions/leads";
import { leadFormSchema, type LeadFormValues } from "@/lib/validation/lead";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { LogoMark } from "@/components/shared/LogoMark";
import { CATEGORY_META, type ServiceCategory } from "@/content/services";
import { cn } from "@/lib/utils";
import type { ServiceOption } from "@/lib/types";

type LeadFormProps = {
  initialCategory?: ServiceCategory;
  initialServiceType?: string;
  servicesByCategory: Record<ServiceCategory, ServiceOption[]>;
  onSuccess?: () => void;
};

export function LeadForm({
  initialCategory,
  initialServiceType,
  servicesByCategory,
  onSuccess,
}: LeadFormProps) {
  const pathname = usePathname();
  const [category, setCategory] = useState<ServiceCategory>(initialCategory ?? "ozone");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const startedAtRef = useRef(Date.now());

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      comment: "",
      serviceType: initialServiceType ?? "",
      company: "",
      startedAt: startedAtRef.current,
    },
  });

  const onSubmit = async (values: LeadFormValues) => {
    setStatus("submitting");
    setErrorMessage(null);
    const result = await submitLead(
      category,
      { ...values, startedAt: startedAtRef.current },
      pathname
    );
    if (result.ok) {
      setStatus("success");
      reset();
      onSuccess?.();
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-10 text-center"
      >
        <CheckCircle2 className="h-14 w-14 text-gold" strokeWidth={1.5} />
        <h3 className="font-display text-xl text-ink">Заявку надіслано</h3>
        <p className="max-w-sm text-sm text-slate">
          Дякуємо! Ми зв&rsquo;яжемось із Вами найближчим часом, щоб узгодити деталі виїзду.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Label>Яка послуга Вас цікавить?</Label>
        <div className="relative grid grid-cols-2 gap-2">
          <motion.div
            aria-hidden="true"
            layout
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            className="absolute inset-y-0 z-0 w-[calc(50%-4px)] rounded-xl bg-slate"
            style={{ left: category === "ozone" ? 0 : "calc(50% + 4px)" }}
          />
          {(Object.keys(CATEGORY_META) as ServiceCategory[]).map((key) => {
            const active = category === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => {
                  setCategory(key);
                  setValue("serviceType", "");
                }}
                className={cn(
                  "relative z-10 flex flex-col items-center gap-2 rounded-xl border px-3 py-3 text-center transition-colors",
                  active ? "border-ink text-cream" : "border-ink/15 text-ink hover:border-ink/40"
                )}
              >
                <span className="flex h-9 w-9 items-center justify-center">
                  {key === "ozone" ? (
                    <LogoMark size="sm" className="h-9 w-9" />
                  ) : (
                    <span className="relative block h-9 w-9 overflow-hidden rounded-full">
                      <Image src="/images/dry-cleaning-icon.jpg" alt="" fill sizes="36px" className="object-cover" />
                    </span>
                  )}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide">
                  {CATEGORY_META[key].label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label htmlFor="serviceType">Тип послуги (необов&rsquo;язково)</Label>
        <select
          id="serviceType"
          {...register("serviceType")}
          className="h-12 w-full rounded-lg border border-ink/15 bg-white-warm px-4 text-sm text-ink outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30"
        >
          <option value="">Оберемо разом на консультації</option>
          {servicesByCategory[category].map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="name">Ім&rsquo;я</Label>
        <Input id="name" placeholder="Ваше ім'я" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="phone">Телефон</Label>
        <Input id="phone" placeholder="+380XXXXXXXXX" {...register("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
      </div>

      <div>
        <Label htmlFor="comment">Коментар (необов&rsquo;язково)</Label>
        <Textarea id="comment" rows={3} placeholder="Адреса, зручний час виїзду тощо" {...register("comment")} />
      </div>

      {/* Honeypot field — hidden from real users, catches bots that fill every input */}
      <div className="hidden" aria-hidden="true">
        <label>
          Компанія
          <input tabIndex={-1} autoComplete="off" {...register("company")} />
        </label>
      </div>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="mt-2 w-full">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Надсилаємо…
          </>
        ) : (
          "Надіслати заявку"
        )}
      </Button>
    </form>
  );
}
