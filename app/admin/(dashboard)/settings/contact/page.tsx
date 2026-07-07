import { getSiteSetting } from "@/lib/settings";
import { ContactSettingsForm } from "@/components/admin/ContactSettingsForm";
import type { ContactSettings } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminContactSettingsPage() {
  const value = await getSiteSetting<ContactSettings>("contact");

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Контакти</h1>
      <p className="mt-1 text-sm text-slate">Ці дані показуються в шапці, футері та CTA-блоках сайту</p>
      <div className="mt-6 max-w-2xl">
        {value ? (
          <ContactSettingsForm initialValue={value} />
        ) : (
          <p className="text-sm text-red-600">Не вдалося завантажити налаштування.</p>
        )}
      </div>
    </div>
  );
}
