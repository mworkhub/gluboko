"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateContactSettings } from "@/lib/actions/settings";
import { contactSettingsSchema } from "@/lib/validation/settings";
import type { ContactSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";

export function ContactSettingsForm({ initialValue }: { initialValue: ContactSettings }) {
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactSettings>({
    resolver: zodResolver(contactSettingsSchema),
    defaultValues: initialValue,
  });

  const onSubmit = async (data: ContactSettings) => {
    setSaved(false);
    await updateContactSettings(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Контакти</CardTitle>
          <CardDescription>Телефон, соцмережі та місто — показуються в шапці, футері та CTA-блоках.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="phoneDisplay">Телефон (як показувати)</Label>
            <Input id="phoneDisplay" placeholder="+38 (0__) ___-__-__" {...register("phoneDisplay")} />
            {errors.phoneDisplay && <p className="mt-1 text-xs text-red-600">{errors.phoneDisplay.message}</p>}
          </div>
          <div>
            <Label htmlFor="phoneHref">Телефон (посилання tel:)</Label>
            <Input id="phoneHref" placeholder="tel:+380000000000" {...register("phoneHref")} />
            {errors.phoneHref && <p className="mt-1 text-xs text-red-600">{errors.phoneHref.message}</p>}
          </div>
          <div>
            <Label htmlFor="whatsappHref">WhatsApp</Label>
            <Input id="whatsappHref" placeholder="https://wa.me/380000000000" {...register("whatsappHref")} />
            {errors.whatsappHref && <p className="mt-1 text-xs text-red-600">{errors.whatsappHref.message}</p>}
          </div>
          <div>
            <Label htmlFor="instagramHref">Instagram</Label>
            <Input id="instagramHref" placeholder="https://instagram.com/..." {...register("instagramHref")} />
            {errors.instagramHref && <p className="mt-1 text-xs text-red-600">{errors.instagramHref.message}</p>}
          </div>
          <div>
            <Label htmlFor="telegramHref">Telegram</Label>
            <Input id="telegramHref" placeholder="https://t.me/..." {...register("telegramHref")} />
            {errors.telegramHref && <p className="mt-1 text-xs text-red-600">{errors.telegramHref.message}</p>}
          </div>
          <div>
            <Label htmlFor="viberHref">Viber</Label>
            <Input id="viberHref" placeholder="viber://chat?number=%2B380..." {...register("viberHref")} />
            {errors.viberHref && <p className="mt-1 text-xs text-red-600">{errors.viberHref.message}</p>}
          </div>
          <div>
            <Label htmlFor="messengerHref">Messenger</Label>
            <Input id="messengerHref" placeholder="https://m.me/..." {...register("messengerHref")} />
            {errors.messengerHref && <p className="mt-1 text-xs text-red-600">{errors.messengerHref.message}</p>}
          </div>
          <div>
            <Label htmlFor="facebookHref">Facebook</Label>
            <Input id="facebookHref" placeholder="https://facebook.com/..." {...register("facebookHref")} />
            {errors.facebookHref && <p className="mt-1 text-xs text-red-600">{errors.facebookHref.message}</p>}
          </div>
          <div>
            <Label htmlFor="youtubeHref">YouTube</Label>
            <Input id="youtubeHref" placeholder="https://youtube.com/@..." {...register("youtubeHref")} />
            {errors.youtubeHref && <p className="mt-1 text-xs text-red-600">{errors.youtubeHref.message}</p>}
          </div>
          <div>
            <Label htmlFor="tiktokHref">TikTok</Label>
            <Input id="tiktokHref" placeholder="https://tiktok.com/@..." {...register("tiktokHref")} />
            {errors.tiktokHref && <p className="mt-1 text-xs text-red-600">{errors.tiktokHref.message}</p>}
          </div>
          <div>
            <Label htmlFor="city">Місто / зона обслуговування</Label>
            <Input id="city" placeholder="Київ та Київська область" {...register("city")} />
            {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>}
          </div>
          <div>
            <Label htmlFor="hours">Графік роботи</Label>
            <Input id="hours" placeholder="Щодня 8:00 – 20:00" {...register("hours")} />
            {errors.hours && <p className="mt-1 text-xs text-red-600">{errors.hours.message}</p>}
          </div>
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
