import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LeadForm } from "@/components/forms/LeadForm";
import { BenefitsRow } from "@/components/shared/BenefitsRow";
import { ORDER_BENEFITS } from "@/content/pages";
import { OZONE_VISUAL } from "@/content/media";
import { getServicesByCategory } from "@/lib/services";

export const metadata: Metadata = {
  title: "Замовити послугу",
  description:
    "Залиште заявку на озонування або хімчистку меблів — ми зв'яжемось з Вами найближчим часом для уточнення деталей.",
};

export default async function ZamovytyPosluhuPage() {
  const [ozone, dryCleaning] = await Promise.all([
    getServicesByCategory("ozone"),
    getServicesByCategory("dry_cleaning"),
  ]);
  const servicesByCategory = {
    ozone: ozone.map((s) => ({ slug: s.slug, title: s.title })),
    dry_cleaning: dryCleaning.map((s) => ({ slug: s.slug, title: s.title })),
  };

  return (
    <>
      <section className="px-5 pb-14 pt-10 lg:px-8 lg:pt-14">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 flex items-center gap-1.5 text-xs text-slate">
            <Link href="/" className="hover:text-ink">
              Головна
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-ink">Замовити послугу</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
            <div>
              <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold uppercase text-ink">
                Замовити послугу
              </h1>
              <p className="mt-3 font-display text-lg italic text-gold">Швидко. Зручно. Конфіденційно.</p>
              <p className="mt-5 max-w-xl leading-relaxed text-slate">
                Залиште заявку — і ми зв&rsquo;яжемось з Вами найближчим часом для уточнення деталей та підбору
                оптимального рішення.
              </p>
            </div>

            <div className="mx-auto w-full max-w-md">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-xl">
                <Image
                  src={OZONE_VISUAL.src}
                  alt={OZONE_VISUAL.alt}
                  fill
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 lg:px-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Залиште заявку</CardTitle>
            <CardDescription>Ми зв&rsquo;яжемось з Вами найближчим часом</CardDescription>
          </CardHeader>
          <CardContent>
            <LeadForm servicesByCategory={servicesByCategory} />
          </CardContent>
        </Card>
      </section>

      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <BenefitsRow items={ORDER_BENEFITS} />
        </div>
      </section>
    </>
  );
}
