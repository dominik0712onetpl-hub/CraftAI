"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

/* ─── scroll-driven section ─── */
function Scene({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  children: React.ReactNode;
}) {
  const [i0, i1, o0, o1] = range;
  const opacity = useTransform(progress, [i0, i1, o0, o1], [0, 1, 1, 0]);
  const y = useTransform(progress, [i0, Math.min(i1, o0)], [48, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center px-8 pointer-events-none"
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });

  /* drive video currentTime with scroll */
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !v.duration || isNaN(v.duration)) return;
    v.currentTime = p * v.duration;
  });

  /* progress bar width */
  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /* scroll hint fade */
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <div ref={containerRef} style={{ height: "600vh" }} className="relative">

      {/* ── FIXED VIDEO BACKGROUND ── */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
        {/* layered overlay: solid top + bottom vignette */}
        <div className="absolute inset-0 bg-black/55" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      {/* ── NAV ── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-5"
      >
        <span className="text-white text-[13px] font-semibold tracking-[0.1em] uppercase select-none">
          vorn
        </span>
        <button className="text-[11px] font-medium text-white border border-white/25 rounded-full px-5 py-2 hover:bg-white hover:text-black transition-all duration-200 tracking-wide">
          Get started
        </button>
      </motion.nav>

      {/* ── SCENES ── */}
      <div className="fixed inset-0 z-10">

        {/* 0 — Hero */}
        <Scene progress={scrollYProgress} range={[0, 0.01, 0.17, 0.23]}>
          <div className="text-center text-white">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-[11px] tracking-[0.22em] uppercase text-white/40 mb-5"
            >
              Introducing
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-black leading-[0.83] tracking-[-0.04em] select-none"
              style={{ fontSize: "clamp(88px, 19vw, 260px)" }}
            >
              vorn
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-6 text-[1.1rem] font-light text-white/55 tracking-wide"
            >
              Your craft becomes our intelligence.
            </motion.p>
          </div>
        </Scene>

        {/* 1 — Craft */}
        <Scene progress={scrollYProgress} range={[0.22, 0.28, 0.42, 0.48]}>
          <div className="max-w-xl text-white">
            <p className="text-[10px] tracking-[0.22em] uppercase text-white/35 mb-4">01 / Craft</p>
            <h2 className="text-[clamp(36px,6vw,72px)] font-black leading-[1.0] tracking-tight">
              Design<br />without limits.
            </h2>
            <p className="mt-5 text-[1.05rem] text-white/55 font-light leading-relaxed max-w-sm">
              An AI that understands creative intent — not just commands.
            </p>
          </div>
        </Scene>

        {/* 2 — Build */}
        <Scene progress={scrollYProgress} range={[0.47, 0.53, 0.65, 0.71]}>
          <div className="max-w-xl text-white">
            <p className="text-[10px] tracking-[0.22em] uppercase text-white/35 mb-4">02 / Build</p>
            <h2 className="text-[clamp(36px,6vw,72px)] font-black leading-[1.0] tracking-tight">
              Ship at the<br />speed of thought.
            </h2>
            <p className="mt-5 text-[1.05rem] text-white/55 font-light leading-relaxed max-w-sm">
              From idea to production in a single, fluid workflow.
            </p>
          </div>
        </Scene>

        {/* 3 — Evolve */}
        <Scene progress={scrollYProgress} range={[0.70, 0.76, 0.88, 0.93]}>
          <div className="max-w-xl text-white">
            <p className="text-[10px] tracking-[0.22em] uppercase text-white/35 mb-4">03 / Evolve</p>
            <h2 className="text-[clamp(36px,6vw,72px)] font-black leading-[1.0] tracking-tight">
              It learns<br />as you create.
            </h2>
            <p className="mt-5 text-[1.05rem] text-white/55 font-light leading-relaxed max-w-sm">
              Vorn adapts to your style, your stack, your voice.
            </p>
          </div>
        </Scene>

        {/* 4 — CTA */}
        <Scene progress={scrollYProgress} range={[0.93, 0.97, 1, 1]}>
          <div className="text-center text-white">
            <h2
              className="font-black leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(52px, 10vw, 140px)" }}
            >
              Start<br />crafting.
            </h2>
            <p className="mt-5 text-white/50 text-[1rem] font-light">
              Join thousands of builders on Vorn.
            </p>
            <button className="pointer-events-auto mt-9 text-[13px] font-semibold bg-white text-black rounded-full px-9 py-3.5 hover:bg-white/90 transition-colors">
              Create free account →
            </button>
          </div>
        </Scene>
      </div>

      {/* ── SCROLL HINT ── */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
          className="w-[1px] h-9 bg-white/25"
        />
        <span className="text-[9px] tracking-[0.18em] uppercase text-white/25">Scroll</span>
      </motion.div>

      {/* ── PROGRESS BAR ── */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-[1.5px] bg-white/50 z-50 origin-left"
        style={{ scaleX: barScaleX }}
      />
    </div>
  );
}
