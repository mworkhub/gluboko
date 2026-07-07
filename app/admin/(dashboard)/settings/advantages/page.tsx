import { getSiteSetting } from "@/lib/settings";
import { AdvantagesSettingsForm } from "@/components/admin/AdvantagesSettingsForm";
import type { AdvantagesSettings } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminAdvantagesSettingsPage() {
  const value = await getSiteSetting<AdvantagesSettings>("advantages");

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Переваги</h1>
      <p className="mt-1 text-sm text-slate">4 картки переваг на головній сторінці</p>
      <div className="mt-6 max-w-2xl">
        {value ? (
          <AdvantagesSettingsForm initialValue={value} />
        ) : (
          <p className="text-sm text-red-600">Не вдалося завантажити налаштування.</p>
        )}
      </div>
    </div>
  );
}
