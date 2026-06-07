"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { T } from "@/lib/translations";

type State = "idle" | "submitting" | "success";

export function PurchasePanel({ t }: { t: T }) {
  const p = t.purchase;
  const [variantId, setVariantId] = useState(p.variants[0].id);
  const [colorId, setColorId] = useState(p.colors[0].id);
  const [qty, setQty] = useState(1);
  const [state, setState] = useState<State>("idle");

  const variant = p.variants.find((v) => v.id === variantId)!;
  const color = p.colors.find((c) => c.id === colorId)!;
  const total = variant.price * qty;

  const handleOrder = async () => {
    setState("submitting");
    await new Promise((r) => setTimeout(r, 1800));
    setState("success");
  };

  return (
    <section id="order" className="bg-[#f2efe9] py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {state === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
                className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-3xl font-black mb-3">{p.success.h}</h3>
              <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed mb-8">{p.success.b}</p>
              <button
                onClick={() => { setState("idle"); setQty(1); }}
                className="text-sm font-medium text-black/50 hover:text-black transition-colors underline underline-offset-4"
              >
                {p.success.again}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12 items-start"
            >
              {/* Left: product summary */}
              <div>
                <p className="text-[11px] tracking-[0.18em] uppercase text-black/35 mb-3">Vorn</p>
                <h2 className="text-4xl font-black mb-1">{p.title}</h2>
                <p className="text-sm text-zinc-500 mb-8">{p.sub}</p>

                {/* Variant */}
                <div className="space-y-3 mb-8">
                  {p.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVariantId(v.id)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 ${
                        variantId === v.id
                          ? "border-black bg-white"
                          : "border-transparent bg-white/60 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{v.name}</span>
                        <span className="font-black text-base">€{v.price}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">{v.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Color */}
                <div className="mb-6">
                  <p className="text-xs font-medium text-zinc-500 mb-3">{color.name}</p>
                  <div className="flex gap-3">
                    {p.colors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setColorId(c.id)}
                        title={c.name}
                        className="relative w-8 h-8 rounded-full transition-transform duration-150 hover:scale-110"
                        style={{ backgroundColor: c.hex, border: c.hex === "#EDE9E3" ? "1px solid #d0ccc6" : "none" }}
                      >
                        {colorId === c.id && (
                          <span className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-offset-[#f2efe9] ring-black" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: qty + buy */}
              <div className="md:pt-14">
                {/* Quantity */}
                <div className="mb-8">
                  <p className="text-xs font-medium text-zinc-500 mb-3">{p.qty}</p>
                  <div className="inline-flex items-center gap-0 bg-white rounded-full border border-black/10 overflow-hidden">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-lg font-light hover:bg-black/5 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-semibold select-none">{qty}</span>
                    <button
                      onClick={() => setQty((q) => Math.min(9, q + 1))}
                      className="w-10 h-10 flex items-center justify-center text-lg font-light hover:bg-black/5 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-sm text-zinc-500">{p.total}</span>
                  <motion.span
                    key={total}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-black"
                  >
                    €{total}
                  </motion.span>
                </div>

                {/* Buy button */}
                <motion.button
                  onClick={handleOrder}
                  disabled={state === "submitting"}
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-14 bg-black text-white rounded-2xl font-semibold text-sm relative overflow-hidden hover:bg-zinc-800 transition-colors disabled:opacity-60"
                >
                  <AnimatePresence mode="wait">
                    {state === "submitting" ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center gap-2"
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                      </motion.span>
                    ) : (
                      <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {p.buy} — €{total}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <p className="text-center text-[10px] text-black/30 mt-3 tracking-wide">{p.demo}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
