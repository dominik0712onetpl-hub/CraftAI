"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type T } from "@/lib/translations";

const ease = [0.16, 1, 0.3, 1] as const;

export function FaqSection({ t }: { t: T }) {
  const { faq } = t;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-7 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] tracking-[0.2em] uppercase text-black/30 mb-10"
        >
          {faq.title}
        </motion.p>

        <div className="divide-y divide-black/8">
          {faq.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between py-5 text-left gap-6 group"
              >
                <span className="text-sm font-semibold leading-snug">{item.q}</span>
                <span className="mt-0.5 w-4 h-4 shrink-0 flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="block w-3 h-3 relative"
                  >
                    <span className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2 bg-black" />
                    <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-black" />
                  </motion.span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-zinc-500 leading-relaxed pb-5 pr-8">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
