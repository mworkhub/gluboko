import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { LeadModalProvider } from "@/components/forms/LeadModalProvider";
import { getServicesByCategory } from "@/lib/services";
import { FALLBACK_CONTACT, getSiteSetting } from "@/lib/settings";
import type { ContactSettings } from "@/lib/types";

// This layout wraps every public page, and several of them (lead form modal,
// footer, home/service pages) read admin-editable content straight from
// Supabase on each request — so the whole (site) route group renders
// dynamically rather than being statically cached.
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [ozone, dryCleaning, contact] = await Promise.all([
    getServicesByCategory("ozone"),
    getServicesByCategory("dry_cleaning"),
    getSiteSetting<ContactSettings>("contact"),
  ]);

  const servicesByCategory = {
    ozone: ozone.map((s) => ({ slug: s.slug, title: s.title })),
    dry_cleaning: dryCleaning.map((s) => ({ slug: s.slug, title: s.title })),
  };
  const resolvedContact = contact ?? FALLBACK_CONTACT;

  return (
    <LeadModalProvider servicesByCategory={servicesByCategory}>
      <ScrollProgressBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer contact={resolvedContact} />
    </LeadModalProvider>
  );
}
