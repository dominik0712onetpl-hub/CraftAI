"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRICING, formatPrice, type T, type Lang } from "@/lib/translations";

export function StickyBar({ t, lang }: { t: T; lang: Lang }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const price = PRICING[lang].price;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 36 }}
          className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-black text-white px-5 pt-3.5 pb-[calc(0.875rem+env(safe-area-inset-bottom))]"
        >
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <p className="text-[10px] tracking-[0.12em] uppercase text-white/40">Vorn</p>
              <p className="text-base font-black leading-none mt-0.5">{formatPrice(price, lang)}</p>
            </div>
            <a
              href="#order"
              className="flex-1 h-11 bg-white text-black rounded-xl font-semibold text-sm flex items-center justify-center hover:bg-white/90 transition-colors"
            >
              {t.nav.buy}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
