import Link from "next/link";
import { LogoMark } from "@/components/shared/LogoMark";
import { MessengerIcons, SocialIcons } from "@/components/shared/BrandIcons";
import type { ContactSettings } from "@/lib/types";
import { Reveal } from "./Reveal";

const NAV_LINKS = [
  { href: "/", label: "Головна" },
  { href: "/pro-nas", label: "Про нас" },
  { href: "/ozonuvannya", label: "Послуги" },
  { href: "/#advantages", label: "Переваги" },
  { href: "/#reviews", label: "Відгуки" },
  { href: "/kontakty", label: "Контакти" },
  { href: "/zamovyty-poslugu", label: "Замовити послугу" },
];

const SERVICE_LINKS = [
  { href: "/ozonuvannya", label: "Озонування приміщень" },
  { href: "/himchistka-mebliv", label: "Хімчистка меблів" },
  { href: "/himchistka-mebliv", label: "Хімчистка килимів" },
  { href: "/himchistka-mebliv", label: "Хімчистка авто" },
  { href: "/ozonuvannya", label: "Дезінфекція" },
];

export function Footer({ contact }: { contact: ContactSettings }) {
  return (
    <footer className="bg-mocha text-cream/70">
      <Reveal className="px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark size="sm" />
              <span className="font-logo text-base tracking-[0.12em] text-cream">ГЛИБОКО</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Професійне озонування та хімчистка для дому, офісу та авто. Повертаємо чистоту та свіжість вашому
              простору.
            </p>
            <SocialIcons contact={contact} size="sm" className="mt-5" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cream">Навігація</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className="transition-colors hover:text-cream">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cream">Послуги</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm">
              {SERVICE_LINKS.map((link, i) => (
                <Link key={i} href={link.href} className="transition-colors hover:text-cream">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cream">Контакти</p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a href={contact.phoneHref} className="font-semibold text-cream transition-colors hover:text-gold">
                {contact.phoneDisplay}
              </a>
              <MessengerIcons contact={contact} size="sm" />
              <p>{contact.hours}</p>
              <p>{contact.city}</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 items-center gap-5 border-t border-cream/10 pt-6 text-xs sm:grid-cols-[1fr_auto_1fr]">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} ГЛИБОКО — озонування та хімчистка меблів на виїзд
          </p>
          <a
            href="https://steck.top/"
            target="_blank"
            rel="noreferrer"
            className="order-first flex flex-col items-center leading-tight text-cream/50 transition-colors hover:text-cream sm:order-none"
          >
            <span className="text-[9px] uppercase tracking-widest">Розробили сайт</span>
            <span className="text-base font-bold text-cream">СТЕК.</span>
          </a>
          <p className="text-center sm:text-right">Політика конфіденційності</p>
        </div>
      </Reveal>
    </footer>
  );
}
