import { FaFacebook, FaFacebookMessenger, FaInstagram, FaTelegram, FaTiktok, FaViber, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import type { ContactSettings } from "@/lib/types";
import { cn } from "@/lib/utils";

const MESSENGERS = [
  { key: "whatsappHref", Icon: FaWhatsapp, bg: "#25D366", label: "WhatsApp" },
  { key: "telegramHref", Icon: FaTelegram, bg: "#26A5E4", label: "Telegram" },
  { key: "viberHref", Icon: FaViber, bg: "#7360F2", label: "Viber" },
  { key: "messengerHref", Icon: FaFacebookMessenger, bg: "#00B2FF", label: "Messenger" },
] as const satisfies { key: keyof ContactSettings; Icon: typeof FaWhatsapp; bg: string; label: string }[];

const SOCIALS = [
  { key: "instagramHref", Icon: FaInstagram, bg: "#E1306C", label: "Instagram" },
  { key: "facebookHref", Icon: FaFacebook, bg: "#1877F2", label: "Facebook" },
  { key: "youtubeHref", Icon: FaYoutube, bg: "#FF0000", label: "YouTube" },
  { key: "tiktokHref", Icon: FaTiktok, bg: "#000000", label: "TikTok" },
] as const satisfies { key: keyof ContactSettings; Icon: typeof FaInstagram; bg: string; label: string }[];

function IconRow({
  items,
  contact,
  size,
  variant,
  className,
}: {
  items: readonly { key: keyof ContactSettings; Icon: React.ComponentType<{ className?: string }>; bg: string; label: string }[];
  contact: ContactSettings;
  size: "sm" | "md";
  variant: "solid" | "ghost";
  className?: string;
}) {
  const dimension = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const iconSize = size === "sm" ? "h-4 w-4" : "h-4 w-4";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {items.map(({ key, Icon, bg, label }) => {
        const href = contact[key];
        const style = variant === "solid" ? { backgroundColor: bg } : { borderColor: `${bg}66`, color: bg };
        const iconClassName = cn(
          "flex shrink-0 items-center justify-center rounded-full shadow-sm transition-transform",
          href && "hover:scale-110",
          variant === "solid" ? "text-white-warm" : "border bg-transparent",
          dimension
        );

        // No link configured yet in admin settings — show the icon as a
        // non-clickable placeholder instead of hiding it; once the admin
        // adds a real URL it becomes a live link automatically.
        if (!href) {
          return (
            <span key={key} aria-label={label} aria-disabled="true" style={style} className={cn(iconClassName, "cursor-default")}>
              <Icon className={iconSize} />
            </span>
          );
        }

        return (
          <a key={key} href={href} target="_blank" rel="noreferrer" aria-label={label} style={style} className={iconClassName}>
            <Icon className={iconSize} />
          </a>
        );
      })}
    </div>
  );
}

export function MessengerIcons({
  contact,
  size = "md",
  variant = "solid",
  className,
}: {
  contact: ContactSettings;
  size?: "sm" | "md";
  variant?: "solid" | "ghost";
  className?: string;
}) {
  return <IconRow items={MESSENGERS} contact={contact} size={size} variant={variant} className={className} />;
}

export function SocialIcons({
  contact,
  size = "md",
  variant = "solid",
  className,
}: {
  contact: ContactSettings;
  size?: "sm" | "md";
  variant?: "solid" | "ghost";
  className?: string;
}) {
  return <IconRow items={SOCIALS} contact={contact} size={size} variant={variant} className={className} />;
}
