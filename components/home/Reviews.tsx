"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Олена К.",
    text: "Замовляли озонування квартири після ремонту — запах будівельних матеріалів зник повністю за один виїзд. Дуже акуратні та пунктуальні майстри.",
  },
  {
    name: "Андрій М.",
    text: "Хімчистка дивана перевершила очікування: плями, яким кілька років, майже непомітні. Приємно, що використовують гіпоалергенні засоби — вдома маленька дитина.",
  },
  {
    name: "Марина Т.",
    text: "Озонуємо офіс регулярно перед прийомом клієнтів. Зручно узгоджувати виїзд, завжди на зв'язку.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 px-5 pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Відгуки</p>
          <h2 className="mt-3 font-display text-2xl text-ink lg:text-3xl">Що кажуть наші клієнти</h2>
        </motion.div>

        <div className="mt-12 grid gap-6 [perspective:1200px] md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              whileHover={{ y: -6, rotateX: 2, scale: 1.015 }}
              className="rounded-2xl border border-ink/8 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, s) => (
                  <motion.span
                    key={s}
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 14, delay: i * 0.12 + s * 0.05 + 0.2 }}
                  >
                    <Star className="h-4 w-4 fill-current" />
                  </motion.span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate">{r.text}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink">{r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
