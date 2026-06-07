"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SuccessPage() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(true), []);

  return (
    <div className="min-h-screen bg-[#f2efe9] flex items-center justify-center px-6">
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.15 }}
            className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-black mb-3">Order confirmed!</h1>
          <p className="text-zinc-500 leading-relaxed mb-8">
            Thank you for your purchase. You&apos;ll receive a confirmation email shortly.
          </p>
          <Link
            href="/"
            className="text-sm font-semibold bg-black text-white rounded-full px-8 py-3 hover:bg-zinc-800 transition-colors"
          >
            Back to home
          </Link>
        </motion.div>
      )}
    </div>
  );
}
