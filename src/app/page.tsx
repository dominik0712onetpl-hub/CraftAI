"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";

// ─── NAV ────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/5">
      <a href="/" className="text-white font-black text-lg tracking-tight">
        falinski<span className="text-white/35">.dev</span>
      </a>
      <div className="hidden md:flex items-center gap-8">
        <a href="#uslugi" className="text-white/50 hover:text-white text-sm transition-colors duration-200">Usługi</a>
        <a href="#realizacje" className="text-white/50 hover:text-white text-sm transition-colors duration-200">Realizacje</a>
        <a href="#kontakt" className="text-white/50 hover:text-white text-sm transition-colors duration-200">Kontakt</a>
      </div>
      <a
        href="#kontakt"
        className="text-sm font-semibold bg-white text-[#0A0A0A] px-5 py-2.5 hover:bg-white/85 transition-colors duration-200"
      >
        Napisz do mnie
      </a>
    </nav>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────

function SceneWrapper({
  opacity,
  children,
}: {
  opacity: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-28"
      style={{ opacity }}
    >
      {children}
    </motion.div>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scene opacities — crossfade between scenes
  const s0opacity = useTransform(scrollYProgress, [0, 0.02, 0.18, 0.26], [1, 1, 1, 0]);
  const s1opacity = useTransform(scrollYProgress, [0.22, 0.28, 0.42, 0.50], [0, 1, 1, 0]);
  const s2opacity = useTransform(scrollYProgress, [0.47, 0.53, 0.65, 0.72], [0, 1, 1, 0]);
  const s3opacity = useTransform(scrollYProgress, [0.70, 0.77, 1.0, 1.0], [0, 1, 1, 1]);

  // Scene 1 — staggered service lines
  const s1o1 = useTransform(scrollYProgress, [0.24, 0.32], [0, 1]);
  const s1y1 = useTransform(scrollYProgress, [0.24, 0.32], [36, 0]);
  const s1o2 = useTransform(scrollYProgress, [0.28, 0.36], [0, 1]);
  const s1y2 = useTransform(scrollYProgress, [0.28, 0.36], [36, 0]);
  const s1o3 = useTransform(scrollYProgress, [0.32, 0.40], [0, 1]);
  const s1y3 = useTransform(scrollYProgress, [0.32, 0.40], [36, 0]);

  // Scene 2 — staggered stats
  const s2o1 = useTransform(scrollYProgress, [0.50, 0.58], [0, 1]);
  const s2y1 = useTransform(scrollYProgress, [0.50, 0.58], [36, 0]);
  const s2o2 = useTransform(scrollYProgress, [0.55, 0.63], [0, 1]);
  const s2y2 = useTransform(scrollYProgress, [0.55, 0.63], [36, 0]);

  // Scene 3 — CTA
  const s3y = useTransform(scrollYProgress, [0.72, 0.80], [40, 0]);
  const s3btnO = useTransform(scrollYProgress, [0.76, 0.84], [0, 1]);

  // Scroll hint fades out early
  const scrollHintO = useTransform(scrollYProgress, [0, 0.04, 0.10], [1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0A0A]">

        {/* Scene 0 — Main headline */}
        <SceneWrapper opacity={s0opacity}>
          <p className="text-white/35 text-[11px] mb-6 tracking-[0.3em] uppercase">
            Dominik Falinski · Web Developer
          </p>
          <h1 className="text-[clamp(3.5rem,10vw,9.5rem)] font-black leading-[0.92] text-white">
            Strony.<br />
            Które<br />
            sprzedają.
          </h1>
        </SceneWrapper>

        {/* Scene 1 — Services */}
        <SceneWrapper opacity={s1opacity}>
          <p className="text-white/35 text-[11px] mb-8 tracking-[0.3em] uppercase">Co buduję</p>
          <div className="flex flex-col gap-2">
            <motion.p
              className="text-[clamp(2.2rem,7vw,7rem)] font-black text-white leading-none"
              style={{ opacity: s1o1, y: s1y1 }}
            >
              Landing pages.
            </motion.p>
            <motion.p
              className="text-[clamp(2.2rem,7vw,7rem)] font-black text-white leading-none"
              style={{ opacity: s1o2, y: s1y2 }}
            >
              Sklepy online.
            </motion.p>
            <motion.p
              className="text-[clamp(2.2rem,7vw,7rem)] font-black text-white leading-none"
              style={{ opacity: s1o3, y: s1y3 }}
            >
              Strony firmowe.
            </motion.p>
          </div>
        </SceneWrapper>

        {/* Scene 2 — Numbers */}
        <SceneWrapper opacity={s2opacity}>
          <p className="text-white/35 text-[11px] mb-10 tracking-[0.3em] uppercase">Konkretnie</p>
          <div className="flex flex-col gap-8">
            <motion.div style={{ opacity: s2o1, y: s2y1 }}>
              <p className="text-[clamp(2.5rem,8vw,8rem)] font-black text-white leading-none">
                2–4 tygodnie.
              </p>
              <p className="text-white/45 text-base mt-2 ml-0.5">Czas realizacji projektu</p>
            </motion.div>
            <motion.div style={{ opacity: s2o2, y: s2y2 }}>
              <p className="text-[clamp(2.5rem,8vw,8rem)] font-black text-white leading-none">
                Od 1 500 zł.
              </p>
              <p className="text-white/45 text-base mt-2 ml-0.5">Cena za landing page</p>
            </motion.div>
          </div>
        </SceneWrapper>

        {/* Scene 3 — CTA */}
        <SceneWrapper opacity={s3opacity}>
          <motion.h2
            className="text-[clamp(4rem,12vw,12rem)] font-black text-white leading-[0.9]"
            style={{ y: s3y }}
          >
            Zacznijmy.
          </motion.h2>
          <motion.a
            href="#kontakt"
            className="mt-10 inline-flex items-center gap-3 bg-white text-[#0A0A0A] font-bold text-lg px-8 py-4 w-fit hover:gap-5 transition-[gap] duration-300"
            style={{ opacity: s3btnO }}
          >
            Napisz do mnie <span aria-hidden="true">→</span>
          </motion.a>
        </SceneWrapper>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: scrollHintO }}
        >
          <span className="text-white/25 text-[9px] tracking-[0.35em] uppercase">Scroll</span>
          <div className="relative h-10 w-px overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-white/25"
              style={{ height: "60%" }}
              animate={{ y: ["0%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── SERVICES ───────────────────────────────────────────────────────────────

const services = [
  {
    num: "01",
    title: "Landing page",
    desc: "Strona stworzona z jednym celem — zamienić odwiedzających w klientów. Idealna dla firm usługowych, restauracji, specjalistów i marek osobistych.",
    features: ["Nowoczesny design", "Optymalizacja SEO", "Mobile-first", "Szybka realizacja"],
    price: "Od 1 500 zł",
  },
  {
    num: "02",
    title: "Sklep internetowy",
    desc: "Sklep gotowy do sprzedaży od pierwszego dnia. Integracja z płatnościami, zarządzanie produktami, panel administracyjny.",
    features: [
      "Płatności online (Stripe / Przelewy24)",
      "Katalog produktów",
      "Panel zamówień",
      "Dostosowanie do marki",
    ],
    price: "Od 3 000 zł",
  },
];

function ServicesSection() {
  return (
    <section id="uslugi" className="bg-[#F5F0E8] py-28 px-6 md:px-16 lg:px-28">
      <AnimatedSection>
        <p className="text-black/35 text-[11px] tracking-[0.3em] uppercase mb-4">Usługi</p>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-black mb-16 leading-tight">
          Co możemy<br />zbudować razem.
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-5">
        {services.map((s, i) => (
          <AnimatedSection key={s.num} delay={i * 0.1}>
            <div className="border border-black/10 p-8 hover:border-black/40 transition-colors duration-300 h-full flex flex-col">
              <span className="text-black/25 text-xs tracking-widest">{s.num}</span>
              <h3 className="text-2xl font-black text-black mt-4 mb-3">{s.title}</h3>
              <p className="text-black/55 leading-relaxed mb-7 flex-1">{s.desc}</p>
              <ul className="space-y-2 mb-8">
                {s.features.map((f) => (
                  <li key={f} className="text-black/55 text-sm flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-black/35 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-black font-black text-xl">{s.price}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

// ─── PORTFOLIO ──────────────────────────────────────────────────────────────

const projects = [
  {
    id: "01",
    name: "Vorn",
    category: "E-commerce",
    desc: "Landing page i sklep online dla marki słuchawek z tłumaczeniem AI. Integracja Stripe, wielojęzyczność (EN/PL/DE/NO), animacje scroll.",
    tags: ["Next.js", "Stripe", "Framer Motion", "i18n"],
  },
  {
    id: "02",
    name: "Zielony Talerz",
    category: "Strona firmowa",
    desc: "Strona restauracji z rezerwacjami online, galerią i menu. Optymalizacja pod lokalne wyszukiwania Google.",
    tags: ["Next.js", "SEO", "Rezerwacje", "Mobile"],
  },
  {
    id: "03",
    name: "Atelier Biżuteria",
    category: "Sklep online",
    desc: "Elegancki sklep z biżuterią hand-made. Galeria produktów, koszyk, płatności online, panel dla właściciela.",
    tags: ["E-commerce", "Stripe", "CMS", "Design"],
  },
];

function PortfolioSection() {
  return (
    <section id="realizacje" className="bg-[#0A0A0A] py-28 px-6 md:px-16 lg:px-28">
      <AnimatedSection>
        <p className="text-white/35 text-[11px] tracking-[0.3em] uppercase mb-4">Realizacje</p>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-white mb-16 leading-tight">
          Ostatnie<br />projekty.
        </h2>
      </AnimatedSection>

      <div className="flex flex-col gap-4">
        {projects.map((p, i) => (
          <AnimatedSection key={p.id} delay={i * 0.1}>
            <div className="border border-white/8 p-8 hover:border-white/25 transition-colors duration-300 group">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="text-white/25 text-xs tracking-widest">{p.id}</span>
                  <h3 className="text-2xl font-black text-white mt-1">{p.name}</h3>
                  <span className="text-white/40 text-sm">{p.category}</span>
                </div>
                <span className="text-white/20 group-hover:text-white/50 transition-colors text-2xl">
                  →
                </span>
              </div>
              <p className="text-white/45 leading-relaxed mb-6 max-w-2xl">{p.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-white/35 border border-white/8 px-3 py-1 tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

// ─── PROCESS ────────────────────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    title: "Brief",
    desc: "Krótka rozmowa (15–30 min) — ustalamy cel strony, grupę docelową i zakres projektu. Bezpłatna konsultacja.",
  },
  {
    num: "02",
    title: "Projekt i budowa",
    desc: "Projektuję i buduję stronę. Regularnie pokazuję postępy i wprowadzam poprawki na bieżąco.",
  },
  {
    num: "03",
    title: "Launch",
    desc: "Strona trafia na serwer. Wdrożenie, krótkie szkolenie z obsługi, wsparcie po starcie.",
  },
];

function ProcessSection() {
  return (
    <section className="bg-[#F5F0E8] py-28 px-6 md:px-16 lg:px-28">
      <AnimatedSection>
        <p className="text-black/35 text-[11px] tracking-[0.3em] uppercase mb-4">Jak pracuję</p>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-black mb-16 leading-tight">
          Prosty<br />proces.
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-10 md:gap-6">
        {steps.map((step, i) => (
          <AnimatedSection key={step.num} delay={i * 0.12}>
            <div>
              <span className="text-black/18 text-5xl font-black leading-none">{step.num}</span>
              <h3 className="text-xl font-black text-black mt-5 mb-3">{step.title}</h3>
              <p className="text-black/55 leading-relaxed">{step.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="kontakt" className="bg-[#0A0A0A] py-28 px-6 md:px-16 lg:px-28">
      <AnimatedSection>
        <p className="text-white/35 text-[11px] tracking-[0.3em] uppercase mb-4">Kontakt</p>
        <h2 className="text-[clamp(3rem,9vw,9rem)] font-black text-white leading-[0.92] mb-10">
          Zacznijmy<br />razem.
        </h2>
        <p className="text-white/45 text-lg max-w-md mb-10 leading-relaxed">
          Masz projekt? Chcesz pogadać o stronie lub sklepie?
          Napisz — odpowiem tego samego dnia.
        </p>
        <a
          href="mailto:kontakt@falinski.dev"
          className="inline-flex items-center gap-3 text-white border border-white/20 px-8 py-5 text-base font-semibold hover:bg-white hover:text-[#0A0A0A] transition-all duration-300 group"
        >
          kontakt@falinski.dev
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </a>
      </AnimatedSection>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/8 px-6 md:px-16 lg:px-28 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <span className="text-white/25 text-sm">
          © {new Date().getFullYear()} Falinski.dev
        </span>
        <span className="text-white/15 text-sm">
          Strony internetowe · Sklepy online · Polska i świat
        </span>
      </div>
    </footer>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
