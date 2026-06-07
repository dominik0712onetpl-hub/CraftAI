"use client";

import { motion } from "framer-motion";
import { type T } from "@/lib/translations";

const ease = [0.16, 1, 0.3, 1] as const;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-[3px] mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 fill-black" viewBox="0 0 16 16">
          <path d="M8 1l1.854 3.756 4.146.603-3 2.924.708 4.131L8 10.25l-3.708 1.164.708-4.131-3-2.924 4.146-.603z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection({ t }: { t: T }) {
  const { testimonials } = t;

  return (
    <section className="py-24 px-7 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] tracking-[0.2em] uppercase text-black/30 mb-12"
        >
          {testimonials.title}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
              className="bg-[#f9f8f6] rounded-2xl p-6 flex flex-col"
            >
              <Stars count={item.stars} />
              <p className="text-sm leading-relaxed text-black/80 flex-1 mb-5">
                &ldquo;{item.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
