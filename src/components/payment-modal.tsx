"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice, type Lang, type T } from "@/lib/translations";
import type { StripeElementLocale } from "@stripe/stripe-js";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

/* loadStripe only when a valid publishable key was inlined at build time.
   Otherwise stay null so we can show a clear message instead of failing silently. */
const stripePromise =
  PUBLISHABLE_KEY && PUBLISHABLE_KEY.startsWith("pk_")
    ? loadStripe(PUBLISHABLE_KEY)
    : null;

const STRIPE_LOCALE: Record<Lang, StripeElementLocale> = {
  en: "en",
  pl: "pl",
  de: "de",
  no: "no",
};

function CheckoutForm({
  t,
  total,
  lang,
  onSuccess,
}: {
  t: T;
  total: number;
  lang: Lang;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setError(error.message ?? t.modal.error);
      setSubmitting(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AddressElement
        options={{
          mode: "shipping",
          fields: { phone: "always" },
          validation: { phone: { required: "always" } },
        }}
      />
      <PaymentElement
        options={{
          layout: "tabs",
          fields: { billingDetails: { name: "auto" } },
        }}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      <motion.button
        type="submit"
        disabled={!stripe || submitting}
        whileTap={{ scale: 0.97 }}
        className="w-full h-13 bg-black text-white rounded-2xl font-semibold text-sm relative overflow-hidden hover:bg-zinc-800 transition-colors disabled:opacity-60 py-4"
      >
        <AnimatePresence mode="wait">
          {submitting ? (
            <motion.span
              key="spin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
              />
              {t.modal.processing}
            </motion.span>
          ) : (
            <motion.span
              key="label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {t.modal.pay} — {formatPrice(total, lang)}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
}

interface PaymentModalProps {
  clientSecret: string;
  total: number;
  lang: Lang;
  t: T;
  deliveryLabel?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function PaymentModal({
  clientSecret,
  total,
  lang,
  t,
  deliveryLabel,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const elementsOptions = {
    clientSecret,
    locale: STRIPE_LOCALE[lang],
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: "#000000",
        colorBackground: "#ffffff",
        colorText: "#111111",
        colorDanger: "#e53e3e",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        borderRadius: "12px",
        spacingUnit: "4px",
        fontSizeBase: "14px",
      },
      rules: {
        ".Input": {
          border: "1px solid rgba(0,0,0,0.12)",
          boxShadow: "none",
          padding: "12px 14px",
        },
        ".Input:focus": {
          border: "1px solid #000",
          boxShadow: "none",
          outline: "none",
        },
        ".Label": {
          fontWeight: "500",
          fontSize: "11px",
          color: "#71717a",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: "6px",
        },
        ".Tab": {
          border: "1px solid rgba(0,0,0,0.1)",
          boxShadow: "none",
        },
        ".Tab--selected": {
          border: "1px solid #000",
          boxShadow: "none",
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
    >
      {/* backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="relative bg-[#f9f8f6] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-8 shadow-2xl max-h-[95vh] overflow-y-auto"
      >
        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-black/6 hover:bg-black/10 transition-colors text-zinc-400 hover:text-zinc-700 text-sm font-medium"
        >
          ✕
        </button>

        {/* header */}
        <div className="mb-7">
          <p className="text-[10px] tracking-[0.2em] uppercase text-black/30 mb-1">Vorn</p>
          <h3 className="text-2xl font-black mb-0.5">{t.modal.title}</h3>
          <p className="text-sm text-zinc-400 font-medium">{formatPrice(total, lang)}</p>
          {deliveryLabel && (
            <p className="text-xs text-zinc-400 mt-1">{deliveryLabel}</p>
          )}
        </div>

        {stripePromise ? (
          <Elements stripe={stripePromise} options={elementsOptions}>
            <CheckoutForm t={t} total={total} lang={lang} onSuccess={onSuccess} />
          </Elements>
        ) : (
          <p className="text-sm text-red-500 leading-relaxed">
            Brak NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY w buildzie. Ustaw klucz pk_ w Vercel
            (Production + Preview) i wykonaj nowy deploy.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
