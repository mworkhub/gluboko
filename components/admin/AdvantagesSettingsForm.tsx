"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { updateAdvantagesSettings } from "@/lib/actions/settings";
import { advantagesSettingsSchema } from "@/lib/validation/settings";
import type { AdvantagesSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const ICON_OPTIONS = ["gem", "leaf", "clock", "lock", "shield", "sparkles", "heart", "star"];

export function AdvantagesSettingsForm({ initialValue }: { initialValue: AdvantagesSettings }) {
  const [saved, setSaved] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdvantagesSettings>({
    resolver: zodResolver(advantagesSettingsSchema),
    defaultValues: initialValue,
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const onSubmit = async (data: AdvantagesSettings) => {
    setSaved(false);
    await updateAdvantagesSettings(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Переваги</CardTitle>
          <CardDescription>4 картки переваг на головній сторінці (розділ «Переваги»).</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {fields.map((field, index) => (
            <div key={field.id}>
              {index > 0 && <Separator className="mb-6" />}
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate/70">
                  Картка {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-slate hover:text-red-600"
                  aria-label="Видалити картку"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_1fr_140px]">
                <div>
                  <Label>Заголовок</Label>
                  <Input {...register(`items.${index}.title`)} />
                  {errors.items?.[index]?.title && (
                    <p className="mt-1 text-xs text-red-600">{errors.items[index]?.title?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Опис</Label>
                  <Input {...register(`items.${index}.desc`)} />
                  {errors.items?.[index]?.desc && (
                    <p className="mt-1 text-xs text-red-600">{errors.items[index]?.desc?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Іконка</Label>
                  <select
                    {...register(`items.${index}.icon`)}
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
            onClick={() => append({ title: "", desc: "", icon: "gem" })}
          >
            + Додати картку
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
