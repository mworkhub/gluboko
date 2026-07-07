"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { updateAboutSettings } from "@/lib/actions/settings";
import { aboutSettingsSchema } from "@/lib/validation/settings";
import type { AboutSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const ICON_OPTIONS = ["award", "shield-check", "calendar-check", "heart-handshake", "star", "badge-check"];

export function AboutSettingsForm({ initialValue }: { initialValue: AboutSettings }) {
  const [saved, setSaved] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AboutSettings>({
    resolver: zodResolver(aboutSettingsSchema),
    defaultValues: initialValue,
  });

  const { fields, append, remove } = useFieldArray({ control, name: "trust_badges" });

  const onSubmit = async (data: AboutSettings) => {
    setSaved(false);
    await updateAboutSettings(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Про нас — цитата</CardTitle>
          <CardDescription>Показується в секції «Про нас» на головній сторінці.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Label htmlFor="quote">Текст цитати</Label>
            <Textarea id="quote" rows={3} {...register("quote")} />
            {errors.quote && <p className="mt-1 text-xs text-red-600">{errors.quote.message}</p>}
          </div>
          <div>
            <Label htmlFor="signature">Підпис</Label>
            <Input id="signature" placeholder="команда ГЛИБОКО" {...register("signature")} />
            {errors.signature && <p className="mt-1 text-xs text-red-600">{errors.signature.message}</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Бейджі довіри</CardTitle>
          <CardDescription>4 короткі пункти під цитатою («Професіонали своєї справи» тощо).</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {fields.map((field, index) => (
            <div key={field.id}>
              {index > 0 && <Separator className="mb-6" />}
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate/70">
                  Бейдж {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-slate hover:text-red-600"
                  aria-label="Видалити бейдж"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_160px]">
                <div>
                  <Label>Текст</Label>
                  <Input {...register(`trust_badges.${index}.title`)} />
                  {errors.trust_badges?.[index]?.title && (
                    <p className="mt-1 text-xs text-red-600">{errors.trust_badges[index]?.title?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Іконка</Label>
                  <select
                    {...register(`trust_badges.${index}.icon`)}
                    className="h-12 w-full rounded-lg border border-ink/15 bg-white px-3 text-sm text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                  >
                    {ICON_OPTIONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit"
            onClick={() => append({ title: "", icon: "award" })}
          >
            + Додати бейдж
          </Button>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Зберегти"}
          </Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" /> Збережено
            </span>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
