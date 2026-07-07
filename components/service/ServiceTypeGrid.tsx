import { getServicesByCategory } from "@/lib/services";
import type { ServiceCategory } from "@/content/services";
import { ServiceTypeCard } from "./ServiceTypeCard";

export async function ServiceTypeGrid({ category }: { category: ServiceCategory }) {
  const services = await getServicesByCategory(category);

  return (
    <section className="px-5 pb-16 pt-16 lg:px-8 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Види послуг
        </p>
        <h2 className="mt-3 text-center font-display text-2xl text-ink lg:text-3xl">
          {category === "ozone" ? "Види озонування" : "Види хімчистки"}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceTypeCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
