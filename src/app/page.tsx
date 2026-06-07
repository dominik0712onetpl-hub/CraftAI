"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { translations, detectLang, type Lang, type T } from "@/lib/translations";
import { PurchasePanel } from "@/components/purchase-panel";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── scroll-driven scene ─── */
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
  const y = useTransform(progress, [i0, i1, o0, o1], [52, 0, 0, -28]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center px-8 pointer-events-none"
    >
      {children}
    </motion.div>
  );
}

/* ─── language switcher ─── */
const LANGS: { id: Lang; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "pl", label: "PL" },
  { id: "de", label: "DE" },
  { id: "no", label: "NO" },
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("vorn-lang") as Lang | null;
    setLang(saved ?? detectLang());
    setMounted(true);
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("vorn-lang", l);
  };

  const t: T = translations[lang];

  /* scroll-driven video */
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Unlock video for programmatic seeking — browsers block currentTime
     until the video has been started at least once.                    */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const unlock = () => {
      v.play()
        .then(() => { v.pause(); v.currentTime = 0; })
        .catch(() => {});
    };
    if (v.readyState >= 2) {
      unlock();
    } else {
      v.addEventListener("loadeddata", unlock, { once: true });
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !v.duration || isNaN(v.duration)) return;
    v.currentTime = p * v.duration;
  });

  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);

  if (!mounted) return null;

  return (
    <div className="bg-[#f2efe9] text-black">

      {/* ── NAV ── */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-7 py-4"
      >
        <span className="text-white text-[13px] font-bold tracking-[0.1em] uppercase select-none drop-shadow-sm">
          vorn
        </span>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-1 py-1 gap-0.5">
            {LANGS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => changeLang(id)}
                className={`text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full transition-all duration-200 ${
                  lang === id
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <a
            href="#order"
            className="text-[11px] font-semibold text-white border border-white/30 rounded-full px-5 py-2 hover:bg-white hover:text-black transition-all duration-200 tracking-wide"
          >
            {t.nav.buy}
          </a>
        </div>
      </motion.nav>

      {/* ── VIDEO SECTION (scroll-driven) ── */}
      <div ref={sectionRef} style={{ height: "400vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* video */}
          <video
            ref={videoRef}
            src="/hero.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* overlays */}
          <div className="absolute inset-0 bg-black/52" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom,rgba(0,0,0,.5) 0%,transparent 25%,transparent 75%,rgba(0,0,0,.65) 100%)",
            }}
          />

          {/* ── SCENE 0 — Hero ── */}
          <Scene progress={scrollYProgress} range={[0, 0.01, 0.18, 0.24]}>
            <div className="text-center text-white max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[11px] tracking-[0.22em] uppercase text-white/45 mb-5"
              >
                {t.hero.tag}
              </motion.p>
              <div className="overflow-hidden pb-[0.6em]">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.95, ease }}
                  className="font-black leading-[0.95] tracking-[-0.03em] whitespace-pre-line"
                  style={{ fontSize: "clamp(52px, 10vw, 130px)" }}
                >
                  {t.hero.h1}
                </motion.h1>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-6 text-[1rem] text-white/55 font-light leading-relaxed max-w-md mx-auto"
              >
                {t.hero.sub}
              </motion.p>
              <motion.a
                href="#order"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="inline-block mt-8 bg-white text-black text-[13px] font-semibold rounded-full px-8 py-3.5 hover:bg-white/90 transition-colors pointer-events-auto"
              >
                {t.hero.cta} →
              </motion.a>
            </div>
          </Scene>

          {/* ── SCENES 1–3 ── */}
          {t.scenes.map((s, i) => {
            const ranges: [number, number, number, number][] = [
              [0.23, 0.30, 0.44, 0.50],
              [0.49, 0.56, 0.70, 0.76],
              [0.75, 0.82, 0.91, 0.96],
            ];
            return (
              <Scene key={i} progress={scrollYProgress} range={ranges[i]}>
                <div className="max-w-xl text-white">
                  <p className="text-[10px] tracking-[0.22em] uppercase text-white/35 mb-4 font-medium">
                    {s.tag}
                  </p>
                  <h2
                    className="font-black leading-[1.0] tracking-tight whitespace-pre-line"
                    style={{ fontSize: "clamp(36px, 6vw, 80px)" }}
                  >
                    {s.h2}
                  </h2>
                  <p className="mt-5 text-[1.05rem] text-white/55 font-light leading-relaxed max-w-sm">
                    {s.body}
                  </p>
                </div>
              </Scene>
            );
          })}

          {/* scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-[1px] h-9 bg-white/25"
            />
            <span className="text-[9px] tracking-[0.18em] uppercase text-white/25">{t.hero.scroll}</span>
          </motion.div>

          {/* progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/40 origin-left"
            style={{ scaleX: barScaleX }}
          />
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 px-7 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-[11px] tracking-[0.2em] uppercase text-black/30 mb-3"
          >
            {t.how.title}
          </motion.p>

          <div className="grid md:grid-cols-3 gap-10 mt-10">
            {t.how.steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease }}
              >
                <span className="text-[11px] font-bold tracking-[0.15em] text-black/25">{step.n}</span>
                <h3 className="text-2xl font-black mt-3 mb-2">{step.t}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECS ── */}
      <section className="py-24 px-7 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-3xl font-black mb-10"
          >
            {t.specs.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-0 border-t border-white/10"
          >
            {t.specs.rows.map(([label, value], i) => (
              <div
                key={label}
                className={`flex items-center justify-between py-4 px-1 border-b border-white/8 ${
                  i % 2 === 0 ? "sm:pr-10" : "sm:pl-10 sm:border-l sm:border-white/8"
                }`}
              >
                <span className="text-sm text-white/45">{label}</span>
                <span className="text-sm font-semibold">{value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PURCHASE ── */}
      <PurchasePanel t={t} lang={lang} />

      {/* ── FOOTER ── */}
      <footer className="px-7 py-6 border-t border-black/8 flex items-center justify-between">
        <span className="text-[12px] font-bold tracking-[0.1em] uppercase">vorn</span>
        <span className="text-[11px] text-black/30">{t.footer.copy}</span>
      </footer>

    </div>
  );
}
