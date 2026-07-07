import { z } from "zod";

export const SERVICE_ICON_OPTIONS = [
  "home",
  "car",
  "briefcase",
  "bed-double",
  "package",
  "sofa",
  "layout-grid",
  "baby",
  "bed-single",
  "armchair",
  "sparkles",
  "bed",
  "blinds",
  "car-front",
  "flame",
  "droplets",
  "shield-alert",
  "cigarette",
  "paw-print",
  "spray-can",
  "bug",
  "utensils",
  "tag",
  "wind",
] as const;

export const serviceFormSchema = z.object({
  category: z.enum(["ozone", "dry_cleaning"]),
  slug: z
    .string()
    .trim()
    .min(1, "Обов'язкове поле")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Лише латиниця, цифри та дефіс, напр. kvartyry-ta-budynky"),
  title: z.string().trim().min(1, "Обов'язкове поле"),
  description: z.string().trim().min(1, "Обов'язкове поле"),
  meta: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : null)),
  price_from: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? Number(v) : null))
    .refine((v) => v === null || (Number.isFinite(v) && v >= 0), "Ціна має бути невід'ємним числом"),
  icon: z.string().trim().min(1, "Обов'язкове поле"),
  sort_order: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? Number(v) : 0)),
});

export type ServiceFormValues = z.input<typeof serviceFormSchema>;
