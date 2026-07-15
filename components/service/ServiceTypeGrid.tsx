import { getServicesByCategory } from "@/lib/services";
import { SectionDivider } from "@/components/shared/SectionDivider";
import type { ServiceCategory } from "@/content/services";
import { ServiceTypeCard } from "./ServiceTypeCard";

export async function ServiceTypeGrid({ category }: { category: ServiceCategory }) {
  const services = await getServicesByCategory(category);

  return (
    <section className="px-5 pb-16 pt-2 lg:px-8 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-display text-3xl font-bold text-ink lg:text-5xl">
          {category === "ozone" ? "Види озонування" : "Послуги хімчистки"}
        </h2>
        <SectionDivider className="mx-auto my-5 justify-center" lineClassName="w-40" />

        <div className="mt-6 flex flex-col gap-3 sm:mt-10 sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceTypeCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
