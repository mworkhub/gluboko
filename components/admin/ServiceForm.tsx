"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createService, updateService, type ServiceActionState } from "@/lib/actions/services";
import { SERVICE_ICON_OPTIONS } from "@/lib/validation/services";
import { SEGMENT_FROM_CATEGORY, type DbServiceCategory } from "@/lib/service-category";
import type { Service } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";

const initialState: ServiceActionState = { ok: false };

export function ServiceForm({
  category,
  service,
}: {
  category: DbServiceCategory;
  service?: Service;
}) {
  const router = useRouter();
  const action = service ? updateService.bind(null, service.id) : createService;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [preview, setPreview] = useState<string | null>(service?.image_url ?? null);
  const [fileError, setFileError] = useState<string | null>(null);

  const MAX_FILE_SIZE = 4 * 1024 * 1024;

  useEffect(() => {
    if (state.ok) {
      router.push(`/admin/services/${SEGMENT_FROM_CATEGORY[category]}`);
      router.refresh();
    }
  }, [state.ok, category, router]);

  return (
    <form action={formAction} className="max-w-2xl">
      <input type="hidden" name="category" value={category} />
      <Card>
        <CardHeader>
          <CardTitle>{service ? "Редагувати послугу" : "Нова послуга"}</CardTitle>
          <CardDescription>
            {service ? `Оновлення «${service.title}»` : "Додайте новий тип послуги до категорії"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Label htmlFor="title">Назва</Label>
            <Input id="title" name="title" required defaultValue={service?.title} />
          </div>
          <div>
            <Label htmlFor="slug">Slug (для URL, латиницею)</Label>
            <Input
              id="slug"
              name="slug"
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              defaultValue={service?.slug}
              placeholder="kvartyry-ta-budynky"
            />
          </div>
          <div>
            <Label htmlFor="description">Опис</Label>
            <Textarea id="description" name="description" rows={3} required defaultValue={service?.description} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="meta">Додатковий текст (опційно)</Label>
              <Input id="meta" name="meta" defaultValue={service?.meta ?? ""} placeholder="Площа: до 100 м²" />
            </div>
            <div>
              <Label htmlFor="price_from">Ціна від, грн (опційно)</Label>
              <Input
                id="price_from"
                name="price_from"
                type="number"
                min={0}
                defaultValue={service?.price_from ?? ""}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="icon">Іконка</Label>
              <select
                id="icon"
                name="icon"
                defaultValue={service?.icon ?? SERVICE_ICON_OPTIONS[0]}
                className="h-12 w-full rounded-lg border border-ink/15 bg-white px-3 text-sm text-ink outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
              >
                {SERVICE_ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="sort_order">Порядок сортування</Label>
              <Input id="sort_order" name="sort_order" type="number" defaultValue={service?.sort_order ?? 0} />
            </div>
          </div>
          <div>
            <Label htmlFor="image">Фото {service && "(залиште порожнім, щоб не змінювати)"}</Label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              required={!service}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                if (f.size > MAX_FILE_SIZE) {
                  setFileError("Файл завеликий (максимум 4 МБ). Стисніть фото або оберіть менше за розміром.");
                  e.target.value = "";
                  return;
                }
                setFileError(null);
                setPreview(URL.createObjectURL(f));
              }}
              className="block w-full text-sm text-slate file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-cream file:hover:bg-ink-light"
            />
            {fileError && <p className="mt-2 text-xs text-red-600">{fileError}</p>}
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="mt-3 h-40 w-full rounded-lg object-cover" />
            )}
          </div>
          {state.error && <p className="text-sm text-red-600">{state.error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Зберігаємо..." : "Зберегти"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
