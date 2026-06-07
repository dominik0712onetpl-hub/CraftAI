export type Lang = "en" | "pl" | "de" | "no";

export const PRICING: Record<Lang, {
  currency: string;
  symbol: string;
  symbolAfter: boolean;
  standard: number;
  pro: number;
}> = {
  pl: { currency: "pln", symbol: "zł", symbolAfter: true,  standard: 399,  pro: 529  },
  en: { currency: "eur", symbol: "€",  symbolAfter: false, standard: 89,   pro: 119  },
  de: { currency: "eur", symbol: "€",  symbolAfter: false, standard: 89,   pro: 119  },
  no: { currency: "nok", symbol: "kr", symbolAfter: true,  standard: 999,  pro: 1299 },
};

export function formatPrice(amount: number, lang: Lang): string {
  const { symbol, symbolAfter } = PRICING[lang];
  return symbolAfter ? `${amount} ${symbol}` : `${symbol}${amount}`;
}

export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const l = navigator.language.toLowerCase();
  if (l.startsWith("pl")) return "pl";
  if (l.startsWith("de")) return "de";
  if (l.startsWith("nb") || l.startsWith("nn") || l.startsWith("no")) return "no";
  return "en";
}

const en = {
  nav: { brand: "vorn", buy: "Order now" },
  hero: {
    tag: "Real-time translation",
    h1: "Hear the world\nin your language.",
    sub: "Wireless earbuds with instant AI translation across 40+ languages. Built for travel, business, and life.",
    cta: "Order now",
    scroll: "Scroll",
  },
  scenes: [
    {
      tag: "< 0.5 s latency",
      h2: "Translation faster\nthan thought.",
      body: "Vorn processes speech in real time — before the sentence ends, you already understand.",
    },
    {
      tag: "40+ languages",
      h2: "Every language.\nOne pair of earbuds.",
      body: "Business meetings in Tokyo. Street directions in Lisbon. Family calls across borders. All instant.",
    },
    {
      tag: "ANC · 6 h battery",
      h2: "Focused.\nAll day long.",
      body: "Active noise cancellation at −35 dB. Crystal-clear calls. Music and podcasts between translations.",
    },
  ],
  how: {
    title: "How it works",
    steps: [
      { n: "01", t: "Capture", b: "Dual beamforming mics isolate the speaker's voice from ambient noise in real time." },
      { n: "02", t: "Translate", b: "The on-device Vorn AI v2 chip processes and translates speech in under 0.5 s." },
      { n: "03", t: "Deliver", b: "The translation plays directly in your ear — natural, fluid, with tone preserved." },
    ],
  },
  specs: {
    title: "Technical specifications",
    rows: [
      ["Translation latency", "< 0.5 s"],
      ["Languages", "40+ (offline: 12)"],
      ["Driver", "11 mm dynamic"],
      ["Freq. response", "20 Hz – 20 kHz"],
      ["ANC", "−35 dB hybrid"],
      ["Battery — earbuds", "6 h (ANC on) / 8 h off"],
      ["Battery — case", "24 h total"],
      ["Connectivity", "Bluetooth 5.3, multipoint"],
      ["Water resistance", "IPX5"],
      ["Weight per earbud", "5.5 g"],
      ["Processor", "Vorn AI v2 (4 TOPS)"],
      ["App", "iOS 16+ · Android 10+"],
    ],
  },
  purchase: {
    title: "Order Vorn",
    sub: "Free worldwide shipping · 30-day returns",
    variants: [
      { id: "standard", name: "Standard", desc: "40 languages · 6 h battery · ANC · Charging case" },
      { id: "pro", name: "Pro", desc: "40+ languages · 8 h battery · ANC Pro · Premium leather case · Priority support" },
    ],
    colors: [
      { id: "midnight", name: "Midnight Black", hex: "#181818" },
      { id: "pearl", name: "Pearl White", hex: "#EDE9E3" },
      { id: "sage", name: "Sage", hex: "#7D9980" },
    ],
    qty: "Quantity",
    total: "Total",
    buy: "Order now",
    success: {
      h: "Order received!",
      b: "In production you'd receive an order confirmation by e-mail. Thank you for trying Vorn.",
      again: "Place another order",
    },
  },
  footer: { copy: "© 2026 Vorn. All rights reserved." },
};

const pl: typeof en = {
  nav: { brand: "vorn", buy: "Zamów teraz" },
  hero: {
    tag: "Tłumaczenie w czasie rzeczywistym",
    h1: "Usłysz świat\nwe własnym języku.",
    sub: "Bezprzewodowe słuchawki z błyskawicznym tłumaczeniem AI w ponad 40 językach. Stworzone do podróży, biznesu i życia.",
    cta: "Zamów teraz",
    scroll: "Przewiń",
  },
  scenes: [
    {
      tag: "< 0,5 s opóźnienia",
      h2: "Tłumaczenie\nszybsze niż myśl.",
      body: "Vorn przetwarza mowę w czasie rzeczywistym — zanim zdanie się skończy, już rozumiesz.",
    },
    {
      tag: "40+ języków",
      h2: "Każdy język.\nJedna para słuchawek.",
      body: "Spotkania biznesowe w Tokio. Wskazówki na ulicach Lizbony. Rozmowy rodzinne ponad granicami. Wszystko natychmiastowo.",
    },
    {
      tag: "ANC · 6 h bateria",
      h2: "Skupiony.\nCały dzień.",
      body: "Aktywna redukcja hałasu do −35 dB. Krystalicznie czyste rozmowy. Muzyka i podcasty między tłumaczeniami.",
    },
  ],
  how: {
    title: "Jak to działa",
    steps: [
      { n: "01", t: "Przechwyt", b: "Podwójne mikrofony beamforming izolują głos rozmówcy od szumu otoczenia w czasie rzeczywistym." },
      { n: "02", t: "Tłumaczenie", b: "Chip Vorn AI v2 przetwarza i tłumaczy mowę w mniej niż 0,5 s bezpośrednio na urządzeniu." },
      { n: "03", t: "Odtwarzanie", b: "Tłumaczenie brzmi bezpośrednio w uchu — naturalnie, płynnie, z zachowaniem tonu głosu." },
    ],
  },
  specs: {
    title: "Specyfikacja techniczna",
    rows: [
      ["Opóźnienie tłumaczenia", "< 0,5 s"],
      ["Języki", "40+ (offline: 12)"],
      ["Przetwornik", "11 mm dynamiczny"],
      ["Pasmo przenoszenia", "20 Hz – 20 kHz"],
      ["ANC", "−35 dB hybrydowy"],
      ["Bateria — słuchawki", "6 h (ANC wł.) / 8 h wył."],
      ["Bateria — etui", "24 h łącznie"],
      ["Łączność", "Bluetooth 5.3, multipoint"],
      ["Wodoodporność", "IPX5"],
      ["Waga (każda)", "5,5 g"],
      ["Procesor", "Vorn AI v2 (4 TOPS)"],
      ["Aplikacja", "iOS 16+ · Android 10+"],
    ],
  },
  purchase: {
    title: "Zamów Vorn",
    sub: "Bezpłatna wysyłka na cały świat · 30 dni na zwrot",
    variants: [
      { id: "standard", name: "Standard", desc: "40 języków · 6 h bateria · ANC · Etui ładujące" },
      { id: "pro", name: "Pro", desc: "40+ języków · 8 h bateria · ANC Pro · Skórzane etui premium · Wsparcie priorytetowe" },
    ],
    colors: [
      { id: "midnight", name: "Czarna północ", hex: "#181818" },
      { id: "pearl", name: "Perłowa biel", hex: "#EDE9E3" },
      { id: "sage", name: "Szałwia", hex: "#7D9980" },
    ],
    qty: "Ilość",
    total: "Łącznie",
    buy: "Zamów teraz",
    success: {
      h: "Zamówienie przyjęte!",
      b: "W wersji produkcyjnej otrzymasz potwierdzenie zamówienia e-mailem. Dziękujemy za wypróbowanie Vorn.",
      again: "Złóż kolejne zamówienie",
    },
  },
  footer: { copy: "© 2026 Vorn. Wszelkie prawa zastrzeżone." },
};

const de: typeof en = {
  nav: { brand: "vorn", buy: "Jetzt bestellen" },
  hero: {
    tag: "Echtzeit-Übersetzung",
    h1: "Hör die Welt\nin deiner Sprache.",
    sub: "Kabellose Ohrhörer mit sofortiger KI-Übersetzung in über 40 Sprachen. Entwickelt für Reisen, Business und Alltag.",
    cta: "Jetzt bestellen",
    scroll: "Scrollen",
  },
  scenes: [
    {
      tag: "< 0,5 s Latenz",
      h2: "Übersetzung\nschneller als Gedanken.",
      body: "Vorn verarbeitet Sprache in Echtzeit — bevor der Satz endet, hast du bereits verstanden.",
    },
    {
      tag: "40+ Sprachen",
      h2: "Jede Sprache.\nEin Paar Ohrhörer.",
      body: "Geschäftsmeetings in Tokio. Wegbeschreibungen in Lissabon. Familiengespräche über Grenzen. Alles sofort.",
    },
    {
      tag: "ANC · 6 h Akku",
      h2: "Konzentriert.\nDen ganzen Tag.",
      body: "Aktive Geräuschunterdrückung bis −35 dB. Kristallklare Anrufe. Musik und Podcasts zwischen Übersetzungen.",
    },
  ],
  how: {
    title: "So funktioniert es",
    steps: [
      { n: "01", t: "Erfassen", b: "Duale Beamforming-Mikrofone isolieren die Stimme des Sprechers in Echtzeit vom Umgebungsgeräusch." },
      { n: "02", t: "Übersetzen", b: "Der Vorn AI v2-Chip verarbeitet und übersetzt Sprache in unter 0,5 s direkt auf dem Gerät." },
      { n: "03", t: "Wiedergeben", b: "Die Übersetzung klingt direkt in deinem Ohr — natürlich, flüssig, mit erhaltenem Tonfall." },
    ],
  },
  specs: {
    title: "Technische Daten",
    rows: [
      ["Übersetzungslatenz", "< 0,5 s"],
      ["Sprachen", "40+ (offline: 12)"],
      ["Treiber", "11 mm dynamisch"],
      ["Frequenzgang", "20 Hz – 20 kHz"],
      ["ANC", "−35 dB hybrid"],
      ["Akku — Ohrhörer", "6 h (ANC ein) / 8 h aus"],
      ["Akku — Ladecase", "24 h gesamt"],
      ["Konnektivität", "Bluetooth 5.3, Multipoint"],
      ["Wasserschutz", "IPX5"],
      ["Gewicht je Ohrhörer", "5,5 g"],
      ["Prozessor", "Vorn AI v2 (4 TOPS)"],
      ["App", "iOS 16+ · Android 10+"],
    ],
  },
  purchase: {
    title: "Vorn bestellen",
    sub: "Kostenloser weltweiter Versand · 30 Tage Rückgabe",
    variants: [
      { id: "standard", name: "Standard", desc: "40 Sprachen · 6 h Akku · ANC · Ladecase" },
      { id: "pro", name: "Pro", desc: "40+ Sprachen · 8 h Akku · ANC Pro · Premium-Ledercase · Priority-Support" },
    ],
    colors: [
      { id: "midnight", name: "Mitternachtsschwarz", hex: "#181818" },
      { id: "pearl", name: "Perlweiß", hex: "#EDE9E3" },
      { id: "sage", name: "Salbei", hex: "#7D9980" },
    ],
    qty: "Menge",
    total: "Gesamt",
    buy: "Jetzt bestellen",
    success: {
      h: "Bestellung eingegangen!",
      b: "In der Produktion würdest du eine Bestellbestätigung per E-Mail erhalten. Danke, dass du Vorn ausprobierst.",
      again: "Weitere Bestellung aufgeben",
    },
  },
  footer: { copy: "© 2026 Vorn. Alle Rechte vorbehalten." },
};

const no: typeof en = {
  nav: { brand: "vorn", buy: "Bestill nå" },
  hero: {
    tag: "Sanntidsoversettelse",
    h1: "Hør verden\npå ditt språk.",
    sub: "Trådløse ørepropper med øyeblikkelig AI-oversettelse på 40+ språk. Laget for reise, næringsliv og hverdagsliv.",
    cta: "Bestill nå",
    scroll: "Rull ned",
  },
  scenes: [
    {
      tag: "< 0,5 s forsinkelse",
      h2: "Oversettelse\nraskere enn tanken.",
      body: "Vorn behandler tale i sanntid — før setningen er ferdig, forstår du allerede.",
    },
    {
      tag: "40+ språk",
      h2: "Alle språk.\nEtt par ørepropper.",
      body: "Forretningsmøter i Tokyo. Veibeskrivelser i Lisboa. Familiesamtaler på tvers av grenser. Alt øyeblikkelig.",
    },
    {
      tag: "ANC · 6 t batteri",
      h2: "Fokusert.\nHele dagen.",
      body: "Aktiv støyreduksjon til −35 dB. Krystallklar lyd. Musikk og podkaster mellom oversettelsene.",
    },
  ],
  how: {
    title: "Slik fungerer det",
    steps: [
      { n: "01", t: "Fange opp", b: "Doble beamforming-mikrofoner isolerer talerens stemme fra omgivelsesstøy i sanntid." },
      { n: "02", t: "Oversette", b: "Vorn AI v2-brikken behandler og oversetter tale på under 0,5 s direkte på enheten." },
      { n: "03", t: "Levere", b: "Oversettelsen spilles direkte i øret ditt — naturlig, flytende, med bevart tonefall." },
    ],
  },
  specs: {
    title: "Tekniske spesifikasjoner",
    rows: [
      ["Oversettelsesforsinkelse", "< 0,5 s"],
      ["Språk", "40+ (offline: 12)"],
      ["Driver", "11 mm dynamisk"],
      ["Frekvensgang", "20 Hz – 20 kHz"],
      ["ANC", "−35 dB hybrid"],
      ["Batteri — ørepropper", "6 t (ANC på) / 8 t av"],
      ["Batteri — etui", "24 t totalt"],
      ["Tilkobling", "Bluetooth 5.3, multipoint"],
      ["Vanntetthet", "IPX5"],
      ["Vekt per ørepropp", "5,5 g"],
      ["Prosessor", "Vorn AI v2 (4 TOPS)"],
      ["App", "iOS 16+ · Android 10+"],
    ],
  },
  purchase: {
    title: "Bestill Vorn",
    sub: "Gratis frakt over hele verden · 30 dagers retur",
    variants: [
      { id: "standard", name: "Standard", desc: "40 språk · 6 t batteri · ANC · Ladeetui" },
      { id: "pro", name: "Pro", desc: "40+ språk · 8 t batteri · ANC Pro · Premium lær-etui · Prioritetsstøtte" },
    ],
    colors: [
      { id: "midnight", name: "Midnattssvart", hex: "#181818" },
      { id: "pearl", name: "Perlevit", hex: "#EDE9E3" },
      { id: "sage", name: "Salvie", hex: "#7D9980" },
    ],
    qty: "Antall",
    total: "Totalt",
    buy: "Bestill nå",
    success: {
      h: "Bestilling mottatt!",
      b: "I produksjon ville du mottatt en ordrebekreftelse på e-post. Takk for at du prøver Vorn.",
      again: "Legg inn en ny bestilling",
    },
  },
  footer: { copy: "© 2026 Vorn. Alle rettigheter forbeholdt." },
};

export type T = typeof en;
export const translations: Record<Lang, T> = { en, pl, de, no };
