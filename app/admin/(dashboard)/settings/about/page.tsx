import { getSiteSetting } from "@/lib/settings";
import { AboutSettingsForm } from "@/components/admin/AboutSettingsForm";
import type { AboutSettings } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminAboutSettingsPage() {
  const value = await getSiteSetting<AboutSettings>("about");

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Про нас</h1>
      <p className="mt-1 text-sm text-slate">Цитата та бейджі довіри на головній сторінці</p>
      <div className="mt-6 max-w-2xl">
        {value ? (
          <AboutSettingsForm initialValue={value} />
        ) : (
          <p className="text-sm text-red-600">Не вдалося завантажити налаштування.</p>
        )}
      </div>
    </div>
  );
}
