import { z } from "zod";

const phoneRegex = /^(\+380\d{9}|0\d{9})$/;

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Введіть, будь ласка, ваше ім'я")
    .max(100),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Введіть номер у форматі +380XXXXXXXXX"),
  comment: z.string().trim().max(1000).optional().or(z.literal("")),
  serviceType: z.string().max(200).optional().or(z.literal("")),
  // anti-spam: must stay empty
  company: z.string().max(0, "").optional().or(z.literal("")),
  // anti-spam: form must be visible for at least ~2s before submit
  startedAt: z.number(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export function normalizePhone(phone: string) {
  return phone.startsWith("0") ? `+38${phone}` : phone;
}
