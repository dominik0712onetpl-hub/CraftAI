"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRICING, formatPrice, type T, type Lang } from "@/lib/translations";
import { PaymentModal } from "@/components/payment-modal";

type State = "idle" | "loading" | "modal" | "success";

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <span className="text-black/40">{icon}</span>
      <span className="text-[10px] text-zinc-500 leading-tight">{label}</span>
    </div>
  );
}

const IconReturns = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
  </svg>
);
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconTruck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" /><rect x="9" y="11" width="14" height="10" rx="2" /><circle cx="12" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
  </svg>
);
const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export function PurchasePanel({ t, lang }: { t: T; lang: Lang }) {
  const p = t.purchase;
  const pricing = PRICING[lang];

  const [colorId, setColorId] = useState(p.colors[0].id);
  const [qty, setQty] = useState(1);
  const [state, setState] = useState<State>("idle");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [deliveryId, setDeliveryId] = useState("");
  const [paczkomat, setPaczkomat] = useState("");

  const total = pricing.price * qty;
  const color = p.colors.find((c) => c.id === colorId)!;

  // Fall back to the first option (delivery ids differ per language)
  const delivery =
    t.delivery.options.find((o) => o.id === deliveryId) ?? t.delivery.options[0];
  const needsPoint = delivery.requiresPoint;
  const deliveryLabel = needsPoint
    ? `${delivery.name} · ${paczkomat.toUpperCase()}`
    : delivery.name;

  const handleOrder = async () => {
    if (needsPoint && !paczkomat.trim()) {
      setApiError(t.delivery.pointMissing);
      return;
    }
    if (!agreed) {
      setApiError(p.legal.agree + " " + p.legal.terms + " " + p.legal.and + " " + p.legal.privacy + ".");
      return;
    }
    setState("loading");
    setApiError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          colorId,
          qty,
          currency: pricing.currency,
          unitAmount: pricing.price * 100,
          shippingMethod: delivery.name,
          shippingEta: delivery.eta,
          paczkomat: needsPoint ? paczkomat.trim().toUpperCase() : "",
        }),
      });
      const data = await res.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setState("modal");
      } else {
        setApiError(data.error ?? "Server error");
        setState("idle");
      }
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Connection error");
      setState("idle");
    }
  };

  return (
    <>
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
                  onClick={() => { setState("idle"); setQty(1); setAgreed(false); }}
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
                {/* Left */}
                <div>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-black/35 mb-3">Vorn</p>
                  <h2 className="text-4xl font-black mb-1">{p.title}</h2>
                  <p className="text-sm text-zinc-500 mb-8">{p.sub}</p>

                  {/* Price */}
                  <div className="bg-white rounded-2xl px-5 py-4 mb-8 flex items-center justify-between border-2 border-black">
                    <div>
                      <p className="font-semibold text-sm">Vorn</p>
                      <p className="text-xs text-zinc-400 mt-0.5">Bluetooth 5.4 · ANC · IPX5 · USB-C</p>
                    </div>
                    <p className="font-black text-xl">{formatPrice(pricing.price, lang)}</p>
                  </div>

                  {/* Color */}
                  <div>
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

                {/* Right */}
                <div className="md:pt-14">
                  {/* Delivery method */}
                  <div className="mb-8">
                    <p className="text-xs font-medium text-zinc-500 mb-3">{t.delivery.title}</p>
                    <div className="space-y-2">
                      {t.delivery.options.map((o) => (
                        <button
                          key={o.id}
                          onClick={() => setDeliveryId(o.id)}
                          className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                            delivery.id === o.id
                              ? "border-black bg-white"
                              : "border-transparent bg-white/60 hover:bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm">{o.name}</span>
                            <span className="text-xs font-semibold text-zinc-500">{t.delivery.free}</span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-0.5">{o.eta}</p>
                        </button>
                      ))}
                    </div>

                    {/* Paczkomat code (InPost only) */}
                    <AnimatePresence initial={false}>
                      {needsPoint && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3">
                            <input
                              value={paczkomat}
                              onChange={(e) => { setPaczkomat(e.target.value); setApiError(null); }}
                              placeholder={t.delivery.pointPlaceholder}
                              aria-label={t.delivery.pointLabel}
                              className="w-full bg-white rounded-xl border border-black/10 px-4 py-3 text-sm uppercase tracking-wide placeholder:normal-case placeholder:tracking-normal placeholder:text-zinc-400 focus:border-black focus:outline-none transition-colors"
                            />
                            <a
                              href={t.delivery.pointHelpUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 text-[11px] text-zinc-400 hover:text-black transition-colors underline underline-offset-2"
                            >
                              {t.delivery.pointHelp}
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Quantity */}
                  <div className="mb-8">
                    <p className="text-xs font-medium text-zinc-500 mb-3">{p.qty}</p>
                    <div className="inline-flex items-center bg-white rounded-full border border-black/10 overflow-hidden">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center text-lg font-light hover:bg-black/5 transition-colors"
                      >−</button>
                      <span className="w-10 text-center text-sm font-semibold select-none">{qty}</span>
                      <button
                        onClick={() => setQty((q) => Math.min(9, q + 1))}
                        className="w-10 h-10 flex items-center justify-center text-lg font-light hover:bg-black/5 transition-colors"
                      >+</button>
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
                      {formatPrice(total, lang)}
                    </motion.span>
                  </div>

                  {/* GDPR checkbox */}
                  <label className="flex items-start gap-3 mb-5 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => { setAgreed(e.target.checked); if (e.target.checked) setApiError(null); }}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border transition-all ${agreed ? "bg-black border-black" : "border-black/25 bg-white group-hover:border-black/50"}`}>
                        {agreed && (
                          <svg className="w-full h-full text-white p-0.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3.5 3.5L13 5" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] text-zinc-400 leading-relaxed">
                      {p.legal.agree}{" "}
                      <a href="/terms" className="underline underline-offset-2 hover:text-black transition-colors">{p.legal.terms}</a>
                      {" "}{p.legal.and}{" "}
                      <a href="/privacy" className="underline underline-offset-2 hover:text-black transition-colors">{p.legal.privacy}</a>.
                    </span>
                  </label>

                  {/* Error */}
                  <AnimatePresence>
                    {apiError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-red-500 mb-3 leading-relaxed"
                      >
                        {apiError}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Buy button */}
                  <motion.button
                    onClick={handleOrder}
                    disabled={state === "loading"}
                    whileTap={{ scale: 0.97 }}
                    className="w-full h-14 bg-black text-white rounded-2xl font-semibold text-sm relative overflow-hidden hover:bg-zinc-800 transition-colors disabled:opacity-60"
                  >
                    <AnimatePresence mode="wait">
                      {state === "loading" ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                        </motion.span>
                      ) : (
                        <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          {p.buy} — {formatPrice(total, lang)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Trust badges */}
                  <div className="grid grid-cols-4 gap-2 mt-6 pt-6 border-t border-black/8">
                    <TrustBadge icon={<IconReturns />} label={p.trust.returns} />
                    <TrustBadge icon={<IconShield />}  label={p.trust.warranty} />
                    <TrustBadge icon={<IconTruck />}   label={p.trust.shipping} />
                    <TrustBadge icon={<IconLock />}    label={p.trust.secure} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Payment modal */}
      <AnimatePresence>
        {state === "modal" && clientSecret && (
          <PaymentModal
            clientSecret={clientSecret}
            total={total}
            lang={lang}
            t={t}
            deliveryLabel={deliveryLabel}
            onClose={() => setState("idle")}
            onSuccess={() => { setClientSecret(null); setState("success"); }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
