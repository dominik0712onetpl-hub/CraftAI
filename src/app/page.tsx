"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-[#f9f9f7] text-black overflow-x-hidden">

      {/* ── NAV ── */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-7 py-4 bg-[#f9f9f7]/80 backdrop-blur-md"
      >
        <span className="text-[13px] font-semibold tracking-[0.08em] uppercase">vorn</span>
        <div className="flex items-center gap-2">
          <button className="text-[11px] font-medium border border-black/15 rounded-full px-4 py-[7px] hover:bg-black hover:text-white transition-all duration-200 tracking-wide">
            Talk with Vorn ↗
          </button>
          <button className="text-[11px] font-medium bg-black text-white rounded-full px-4 py-[7px] hover:bg-zinc-700 transition-all duration-200 tracking-wide">
            Menu
          </button>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">

        {/* ambient glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-[-10%] right-[-8%] w-[55vw] h-[55vw] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(180,180,255,0.18) 0%, rgba(220,220,255,0.07) 50%, transparent 70%)",
          }}
        />

        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative">

          {/* oversized brand name */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.95, ease }}
              className="font-black leading-[0.82] tracking-[-0.04em] whitespace-nowrap pl-7 select-none"
              style={{ fontSize: "clamp(72px, 21vw, 300px)" }}
            >
              vorn
            </motion.h1>
          </div>

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease }}
            className="pl-8 mt-5 text-[1.25rem] font-medium leading-[1.4] text-zinc-600 max-w-[260px]"
          >
            Your craft becomes<br />our intelligence.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6, ease }}
            className="pl-8 mt-9 flex items-center gap-4"
          >
            <button className="text-[13px] font-semibold bg-black text-white rounded-full px-7 py-3 hover:bg-zinc-800 transition-colors">
              Get started
            </button>
            <button className="text-[13px] font-medium text-black/60 hover:text-black transition-colors flex items-center gap-1.5">
              See how it works
              <span className="text-[10px]">→</span>
            </button>
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-[1px] h-10 bg-black/20"
          />
          <span className="text-[10px] tracking-[0.15em] uppercase text-black/30">Scroll</span>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="px-7 py-28 border-t border-black/8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10"
        >
          {[
            { value: "10×", label: "faster iteration" },
            { value: "99.9%", label: "uptime" },
            { value: "<50ms", label: "response time" },
            { value: "∞", label: "creativity" },
          ].map(({ value, label }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              <p className="text-4xl font-black tracking-tight">{value}</p>
              <p className="text-sm text-zinc-500 mt-1">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-7 py-24 bg-black text-white overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid md:grid-cols-3 gap-px bg-white/10"
        >
          {[
            {
              tag: "01 / Craft",
              title: "Design without limits",
              body: "An AI that understands creative intent — not just commands.",
            },
            {
              tag: "02 / Build",
              title: "Ship at the speed of thought",
              body: "From idea to production in a single, fluid workflow.",
            },
            {
              tag: "03 / Evolve",
              title: "It learns as you create",
              body: "Vorn adapts to your style, your stack, your voice.",
            },
          ].map(({ tag, title, body }) => (
            <motion.div
              key={tag}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
              }}
              className="p-10 bg-black hover:bg-zinc-900 transition-colors"
            >
              <p className="text-[11px] tracking-[0.14em] uppercase text-zinc-500 mb-6">{tag}</p>
              <h3 className="text-2xl font-bold leading-snug mb-3">{title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="px-7 py-36 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[11px] tracking-[0.15em] uppercase text-black/40 mb-5">Ready?</p>
          <h2
            className="font-black leading-[0.9] tracking-tight mb-10"
            style={{ fontSize: "clamp(48px, 10vw, 140px)" }}
          >
            Start crafting.
          </h2>
          <button className="text-[13px] font-semibold bg-black text-white rounded-full px-8 py-3.5 hover:bg-zinc-800 transition-colors">
            Create free account →
          </button>
        </motion.div>
      </section>

      {/* ── FOOTER BAR ── */}
      <div className="px-7 py-5 border-t border-black/8 flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-[0.1em] uppercase">vorn</span>
        <span className="text-[11px] text-zinc-400">© 2026 Vorn</span>
      </div>

    </div>
  );
}
