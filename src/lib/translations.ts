export type Lang = "en" | "pl" | "de" | "no";

export const PRICING: Record<Lang, {
  currency: string;
  symbol: string;
  symbolAfter: boolean;
  price: number;
}> = {
  pl: { currency: "pln", symbol: "zł", symbolAfter: true,  price: 399 },
  en: { currency: "eur", symbol: "€",  symbolAfter: false, price: 89  },
  de: { currency: "eur", symbol: "€",  symbolAfter: false, price: 89  },
  no: { currency: "nok", symbol: "kr", symbolAfter: true,  price: 999 },
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
    tag: "Real-time voice translation",
    h1: "Hear the world\nin your language.",
    sub: "Wireless earbuds that translate speech in real time — under 0.5 s, 40+ languages. Built for travel, business, and life.",
    cta: "Order now",
    scroll: "Scroll",
  },
  scenes: [
    {
      tag: "< 0.5 s latency",
      h2: "Translation faster\nthan thought.",
      body: "Vorn processes speech in real time — before the sentence ends, you already understand. No pausing. No repeating.",
    },
    {
      tag: "40+ languages",
      h2: "Every language.\nOne pair of earbuds.",
      body: "Business meetings in Tokyo. Street directions in Lisbon. Family calls across borders. All instant, all natural.",
    },
    {
      tag: "ANC · USB-C · IPX5",
      h2: "Ready.\nWherever you are.",
      body: "Active noise cancellation, up to 5 h battery, IPX5 water resistance, and USB-C fast charging — built for the real world.",
    },
  ],
  how: {
    title: "How it works",
    steps: [
      { n: "01", t: "Capture", b: "Dual beamforming mics isolate the speaker's voice from ambient noise in real time." },
      { n: "02", t: "Translate", b: "Cloud AI translates speech in under 0.5 s, streaming the result directly to your ears." },
      { n: "03", t: "Deliver", b: "The translation plays in your ear — natural, fluid, with tone and context preserved." },
    ],
  },
  specs: {
    title: "Technical specifications",
    rows: [
      ["Translation latency", "< 0.5 s (via cloud AI)"],
      ["Languages", "40+ (internet required)"],
      ["Driver", "Dynamic, Hi-Fi"],
      ["Freq. response", "20 Hz – 20 kHz"],
      ["ANC", "Active Noise Cancellation"],
      ["Battery", "3–5 h"],
      ["Charging", "1–3 h via USB-C"],
      ["Bluetooth", "5.4 · 30 ms wireless delay"],
      ["Water resistance", "IPX5"],
      ["Control", "Touch"],
      ["Compatibility", "iOS 16+ · Android 10+"],
      ["Weight", "~10 g per earbud"],
    ] as [string, string][],
  },
  testimonials: {
    title: "Trusted by travellers and professionals",
    items: [
      {
        text: "I had a two-hour negotiation with a Korean supplier — both of us wearing Vorn. We closed the deal without a single interpreter. Remarkable.",
        name: "Thomas B.",
        role: "CEO · London",
        stars: 5,
      },
      {
        text: "Backpacking through 8 countries in 3 months. Vorn was the only language tool I needed. Markets, hostels, buses — everything just worked.",
        name: "Elena V.",
        role: "Travel writer · Vienna",
        stars: 5,
      },
      {
        text: "My mother-in-law speaks only Russian. For the first time at Christmas dinner I actually knew what she was saying. My wife cried.",
        name: "Michael H.",
        role: "Engineer · Berlin",
        stars: 5,
      },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "How accurate is the translation?",
        a: "Vorn uses state-of-the-art cloud AI for real-time translation. Accuracy is high for major language pairs (EN, PL, DE, ES, FR, ZH, JA, KO and more) in clear speech conditions — typically above 90% in business and travel contexts.",
      },
      {
        q: "Does Vorn require an internet connection?",
        a: "Yes. Translation is powered by cloud AI, so an active internet connection (4G/5G or Wi-Fi) is required. The free companion app for iOS and Android manages the connection and language settings.",
      },
      {
        q: "How long does the battery last?",
        a: "Up to 5 hours of continuous use. Charging takes 1–3 hours via the included USB-C cable. An LED indicator shows battery status.",
      },
      {
        q: "What is your return policy?",
        a: "You have 30 days from delivery to return Vorn for any reason, no questions asked. We cover return shipping within the EU. Refunds are processed within 5 business days.",
      },
      {
        q: "When will my order arrive?",
        a: "Orders to Poland ship via InPost Paczkomat — typically 1–2 business days. EU orders ship via tracked courier — 3–5 business days. All orders include free shipping.",
      },
      {
        q: "Which phones are compatible?",
        a: "Vorn connects via Bluetooth 5.4 to any iOS 16+ or Android 10+ smartphone. The free Vorn companion app is available on the App Store and Google Play.",
      },
    ],
  },
  delivery: {
    title: "Delivery method",
    free: "Free",
    pointLabel: "Paczkomat® code",
    pointPlaceholder: "e.g. WAW01M",
    pointHelp: "Find nearest Paczkomat ↗",
    pointHelpUrl: "https://inpost.pl/znajdz-paczkomat",
    pointMissing: "Please enter your Paczkomat® code.",
    options: [
      { id: "courier", name: "Tracked courier", eta: "3–5 business days", requiresPoint: false },
    ],
  },
  purchase: {
    title: "Order Vorn",
    sub: "Free worldwide shipping · 30-day returns · 2-year warranty",
    colors: [
      { id: "midnight", name: "Midnight Black", hex: "#181818" },
      { id: "pearl",    name: "Pearl White",    hex: "#EDE9E3" },
      { id: "sage",     name: "Sage",           hex: "#7D9980" },
    ],
    qty: "Quantity",
    total: "Total",
    buy: "Order now",
    trust: {
      returns: "30-day returns",
      warranty: "2-year warranty",
      shipping: "Free shipping",
      secure: "Secure checkout",
    },
    legal: {
      agree: "By ordering you agree to our",
      terms: "Terms of Service",
      and: "and",
      privacy: "Privacy Policy",
    },
    success: {
      h: "Order received!",
      b: "You'll receive a confirmation email shortly. Thank you for choosing Vorn.",
      again: "Place another order",
    },
  },
  modal: {
    title: "Complete order",
    pay: "Pay",
    processing: "Processing…",
    error: "Payment failed. Please try again.",
  },
  footer: {
    copy: "© 2026 Vorn. All rights reserved.",
    terms: "Terms",
    privacy: "Privacy",
    contact: "Contact",
  },
};

const pl: typeof en = {
  nav: { brand: "vorn", buy: "Zamów teraz" },
  hero: {
    tag: "Tłumaczenie głosowe w czasie rzeczywistym",
    h1: "Usłysz świat\nwe własnym języku.",
    sub: "Słuchawki bezprzewodowe tłumaczące mowę w czasie rzeczywistym — poniżej 0,5 s, 40+ języków. Stworzone do podróży, biznesu i życia.",
    cta: "Zamów teraz",
    scroll: "Przewiń",
  },
  scenes: [
    {
      tag: "< 0,5 s opóźnienia",
      h2: "Tłumaczenie\nszybsze niż myśl.",
      body: "Vorn przetwarza mowę w czasie rzeczywistym — zanim zdanie się skończy, już rozumiesz. Bez pauz. Bez powtarzania.",
    },
    {
      tag: "40+ języków",
      h2: "Każdy język.\nJedna para słuchawek.",
      body: "Spotkania biznesowe w Tokio. Wskazówki na ulicach Lizbony. Rozmowy rodzinne ponad granicami. Wszystko natychmiastowo.",
    },
    {
      tag: "ANC · USB-C · IPX5",
      h2: "Gotowy.\nGdziekolwiek jesteś.",
      body: "Aktywna redukcja hałasu, do 5 h baterii, wodoodporność IPX5 i szybkie ładowanie USB-C — stworzony do realnego świata.",
    },
  ],
  how: {
    title: "Jak to działa",
    steps: [
      { n: "01", t: "Przechwyt", b: "Podwójne mikrofony beamforming izolują głos rozmówcy od hałasu otoczenia." },
      { n: "02", t: "Tłumaczenie", b: "Sztuczna inteligencja chmurowa tłumaczy mowę w mniej niż 0,5 s i strumieniuje wynik bezpośrednio do uszu." },
      { n: "03", t: "Odtwarzanie", b: "Tłumaczenie brzmi w Twoim uchu — naturalnie, płynnie, z zachowanym tonem i kontekstem." },
    ],
  },
  specs: {
    title: "Specyfikacja techniczna",
    rows: [
      ["Opóźnienie tłumaczenia", "< 0,5 s (przez AI chmurowe)"],
      ["Języki", "40+ (wymagany internet)"],
      ["Przetwornik", "Dynamiczny, Hi-Fi"],
      ["Pasmo przenoszenia", "20 Hz – 20 kHz"],
      ["ANC", "Aktywna redukcja hałasu"],
      ["Bateria", "3–5 h"],
      ["Ładowanie", "1–3 h przez USB-C"],
      ["Bluetooth", "5.4 · 30 ms opóźnienie"],
      ["Wodoodporność", "IPX5"],
      ["Sterowanie", "Dotykowe"],
      ["Kompatybilność", "iOS 16+ · Android 10+"],
      ["Waga", "~10 g / słuchawka"],
    ] as [string, string][],
  },
  testimonials: {
    title: "Zaufali nam podróżnicy i profesjonaliści",
    items: [
      {
        text: "Dwugodzinna negocjacja z koreańskim dostawcą — oboje w słuchawkach Vorn. Zamknęliśmy kontrakt bez tłumacza. Niesamowite.",
        name: "Tomasz B.",
        role: "CEO · Warszawa",
        stars: 5,
      },
      {
        text: "Backpacking przez 8 krajów w 3 miesiące. Vorn był jedynym narzędziem językowym, jakiego potrzebowałam. Targi, hostele, autobusy — wszystko działało.",
        name: "Elena V.",
        role: "Blogerka podróżnicza · Wiedeń",
        stars: 5,
      },
      {
        text: "Moja teściowa mówi tylko po rosyjsku. Po raz pierwszy na Wigilii wiedziałam, o czym rozmawiamy. Mąż się wzruszył.",
        name: "Magda H.",
        role: "Specjalistka IT · Wrocław",
        stars: 5,
      },
    ],
  },
  faq: {
    title: "Najczęściej zadawane pytania",
    items: [
      {
        q: "Jak dokładne jest tłumaczenie?",
        a: "Vorn używa najnowocześniejszej chmurowej sztucznej inteligencji. Dokładność przekracza 90% dla głównych par językowych (PL, EN, DE, ES, FR, ZH, JA, KO i inne) przy wyraźnej mowie.",
      },
      {
        q: "Czy Vorn wymaga połączenia z internetem?",
        a: "Tak. Tłumaczenie działa przez AI chmurowe, więc wymagane jest aktywne połączenie (4G/5G lub Wi-Fi). Bezpłatna aplikacja na iOS i Android zarządza połączeniem i ustawieniami językowych.",
      },
      {
        q: "Ile wytrzymuje bateria?",
        a: "Do 5 godzin nieprzerwanego użytkowania. Ładowanie kablem USB-C zajmuje 1–3 godziny. Dioda LED wskazuje poziom naładowania.",
      },
      {
        q: "Jaka jest polityka zwrotów?",
        a: "Masz 30 dni od dostawy na zwrot Vorn z dowolnego powodu, bez pytań. Pokrywamy koszty zwrotu w Polsce i UE. Zwrot środków realizujemy w ciągu 5 dni roboczych.",
      },
      {
        q: "Kiedy otrzymam zamówienie?",
        a: "Zamówienia w Polsce wysyłamy przez InPost Paczkomat — zazwyczaj 1–2 dni robocze. Zamówienia do UE wysyłamy kurierem z śledzeniem — 3–5 dni roboczych. Wysyłka bezpłatna.",
      },
      {
        q: "Z jakimi telefonami jest kompatybilny?",
        a: "Vorn łączy się przez Bluetooth 5.4 z każdym smartfonem iOS 16+ lub Android 10+. Bezpłatna aplikacja Vorn dostępna jest w App Store i Google Play.",
      },
    ],
  },
  delivery: {
    title: "Sposób dostawy",
    free: "Gratis",
    pointLabel: "Kod Paczkomatu®",
    pointPlaceholder: "np. WAW01M",
    pointHelp: "Znajdź najbliższy Paczkomat ↗",
    pointHelpUrl: "https://inpost.pl/znajdz-paczkomat",
    pointMissing: "Podaj kod Paczkomatu®.",
    options: [
      { id: "inpost_paczkomat", name: "InPost Paczkomat®", eta: "1–2 dni robocze", requiresPoint: true },
      { id: "inpost_kurier", name: "Kurier InPost", eta: "1–2 dni robocze", requiresPoint: false },
    ],
  },
  purchase: {
    title: "Zamów Vorn",
    sub: "Bezpłatna wysyłka · Zwrot w 30 dni · 2 lata gwarancji",
    colors: [
      { id: "midnight", name: "Czarna północ", hex: "#181818" },
      { id: "pearl",    name: "Perłowa biel",  hex: "#EDE9E3" },
      { id: "sage",     name: "Szałwia",        hex: "#7D9980" },
    ],
    qty: "Ilość",
    total: "Łącznie",
    buy: "Zamów teraz",
    trust: {
      returns: "Zwrot 30 dni",
      warranty: "2 lata gwarancji",
      shipping: "Bezpłatna wysyłka",
      secure: "Bezpieczna płatność",
    },
    legal: {
      agree: "Składając zamówienie akceptujesz",
      terms: "Regulamin",
      and: "i",
      privacy: "Politykę prywatności",
    },
    success: {
      h: "Zamówienie przyjęte!",
      b: "Potwierdzenie wysyłamy na Twój adres e-mail. Dziękujemy za wybór Vorn.",
      again: "Złóż kolejne zamówienie",
    },
  },
  modal: {
    title: "Finalizuj zamówienie",
    pay: "Zapłać",
    processing: "Przetwarzanie…",
    error: "Płatność nie powiodła się. Spróbuj ponownie.",
  },
  footer: {
    copy: "© 2026 Vorn. Wszelkie prawa zastrzeżone.",
    terms: "Regulamin",
    privacy: "Prywatność",
    contact: "Kontakt",
  },
};

const de: typeof en = {
  nav: { brand: "vorn", buy: "Jetzt bestellen" },
  hero: {
    tag: "Echtzeit-Sprachübersetzung",
    h1: "Hör die Welt\nin deiner Sprache.",
    sub: "Kabellose Ohrhörer mit Echtzeit-Sprachübersetzung — unter 0,5 s, 40+ Sprachen. Für Reisen, Business und Alltag.",
    cta: "Jetzt bestellen",
    scroll: "Scrollen",
  },
  scenes: [
    {
      tag: "< 0,5 s Latenz",
      h2: "Übersetzung\nschneller als Gedanken.",
      body: "Vorn verarbeitet Sprache in Echtzeit — bevor der Satz endet, hast du bereits verstanden. Kein Stoppen. Kein Wiederholen.",
    },
    {
      tag: "40+ Sprachen",
      h2: "Jede Sprache.\nEin Paar Ohrhörer.",
      body: "Geschäftsmeetings in Tokio. Wegbeschreibungen in Lissabon. Familiengespräche über Grenzen. Alles sofort, alles natürlich.",
    },
    {
      tag: "ANC · USB-C · IPX5",
      h2: "Bereit.\nWo immer du bist.",
      body: "Aktive Geräuschunterdrückung, bis zu 5 h Akku, IPX5-Wasserbeständigkeit und USB-C-Schnellladung — für die reale Welt.",
    },
  ],
  how: {
    title: "So funktioniert es",
    steps: [
      { n: "01", t: "Erfassen", b: "Duale Beamforming-Mikrofone isolieren die Stimme des Sprechers in Echtzeit vom Umgebungsgeräusch." },
      { n: "02", t: "Übersetzen", b: "Cloud-KI übersetzt Sprache in unter 0,5 s und streamt das Ergebnis direkt in deine Ohren." },
      { n: "03", t: "Wiedergeben", b: "Die Übersetzung klingt in deinem Ohr — natürlich, flüssig, mit erhaltenem Ton und Kontext." },
    ],
  },
  specs: {
    title: "Technische Daten",
    rows: [
      ["Übersetzungslatenz", "< 0,5 s (via Cloud-KI)"],
      ["Sprachen", "40+ (Internet erforderlich)"],
      ["Treiber", "Dynamisch, Hi-Fi"],
      ["Frequenzgang", "20 Hz – 20 kHz"],
      ["ANC", "Aktive Geräuschunterdrückung"],
      ["Akku", "3–5 h"],
      ["Laden", "1–3 h via USB-C"],
      ["Bluetooth", "5.4 · 30 ms Wireless-Delay"],
      ["Wasserschutz", "IPX5"],
      ["Steuerung", "Touch"],
      ["Kompatibilität", "iOS 16+ · Android 10+"],
      ["Gewicht", "~10 g pro Ohrhörer"],
    ] as [string, string][],
  },
  testimonials: {
    title: "Vertraut von Reisenden und Profis",
    items: [
      {
        text: "Zweistündige Verhandlung mit einem koreanischen Lieferanten — beide mit Vorn. Wir haben den Deal ohne Dolmetscher abgeschlossen. Bemerkenswert.",
        name: "Thomas B.",
        role: "Geschäftsführer · München",
        stars: 5,
      },
      {
        text: "Backpacking durch 8 Länder in 3 Monaten. Vorn war das einzige Sprachenwerkzeug, das ich brauchte. Märkte, Hostels, Busse — alles funktionierte.",
        name: "Elena V.",
        role: "Reisebloggerin · Wien",
        stars: 5,
      },
      {
        text: "Meine Schwiegermutter spricht nur Russisch. Zum ersten Mal beim Weihnachtsessen verstand ich, was sie sagte. Meine Frau hat geweint.",
        name: "Michael H.",
        role: "Ingenieur · Berlin",
        stars: 5,
      },
    ],
  },
  faq: {
    title: "Häufig gestellte Fragen",
    items: [
      {
        q: "Wie genau ist die Übersetzung?",
        a: "Vorn nutzt modernste Cloud-KI. Die Genauigkeit liegt für wichtige Sprachpaare (DE, EN, PL, ES, FR, ZH, JA, KO u.a.) bei klarer Sprache typischerweise über 90 %.",
      },
      {
        q: "Benötigt Vorn eine Internetverbindung?",
        a: "Ja. Die Übersetzung wird von Cloud-KI betrieben und erfordert eine aktive Verbindung (4G/5G oder WLAN). Die kostenlose App für iOS und Android verwaltet Verbindung und Spracheinstellungen.",
      },
      {
        q: "Wie lange hält der Akku?",
        a: "Bis zu 5 Stunden Dauerbetrieb. Das Laden per USB-C dauert 1–3 Stunden. Eine LED-Anzeige zeigt den Ladestand.",
      },
      {
        q: "Wie läuft eine Rückgabe ab?",
        a: "Du hast 30 Tage ab Lieferung Zeit, Vorn aus beliebigem Grund zurückzugeben. Wir übernehmen die Rücksendekosten innerhalb der EU. Erstattungen erfolgen innerhalb von 5 Werktagen.",
      },
      {
        q: "Wann kommt meine Bestellung an?",
        a: "Bestellungen nach Deutschland versenden wir per DHL — in der Regel 1–3 Werktage. EU-Bestellungen 3–5 Werktage. Kostenloser Versand inklusive.",
      },
      {
        q: "Mit welchen Smartphones ist Vorn kompatibel?",
        a: "Vorn verbindet sich per Bluetooth 5.4 mit jedem iOS-16+- oder Android-10+-Smartphone. Die kostenlose Vorn-App ist im App Store und Google Play erhältlich.",
      },
    ],
  },
  delivery: {
    title: "Versandart",
    free: "Kostenlos",
    pointLabel: "Paczkomat®-Code",
    pointPlaceholder: "z. B. WAW01M",
    pointHelp: "Nächsten Paczkomat finden ↗",
    pointHelpUrl: "https://inpost.pl/znajdz-paczkomat",
    pointMissing: "Bitte gib deinen Paczkomat®-Code ein.",
    options: [
      { id: "dhl", name: "DHL Paket", eta: "1–3 Werktage", requiresPoint: false },
    ],
  },
  purchase: {
    title: "Vorn bestellen",
    sub: "Kostenloser Versand · 30 Tage Rückgabe · 2 Jahre Garantie",
    colors: [
      { id: "midnight", name: "Mitternachtsschwarz", hex: "#181818" },
      { id: "pearl",    name: "Perlweiß",            hex: "#EDE9E3" },
      { id: "sage",     name: "Salbei",              hex: "#7D9980" },
    ],
    qty: "Menge",
    total: "Gesamt",
    buy: "Jetzt bestellen",
    trust: {
      returns: "30 Tage Rückgabe",
      warranty: "2 Jahre Garantie",
      shipping: "Kostenloser Versand",
      secure: "Sicherer Checkout",
    },
    legal: {
      agree: "Mit der Bestellung stimmst du unseren",
      terms: "AGB",
      and: "und der",
      privacy: "Datenschutzerklärung",
    },
    success: {
      h: "Bestellung eingegangen!",
      b: "Du erhältst in Kürze eine Bestätigungs-E-Mail. Danke, dass du dich für Vorn entschieden hast.",
      again: "Weitere Bestellung aufgeben",
    },
  },
  modal: {
    title: "Bestellung abschließen",
    pay: "Bezahlen",
    processing: "Verarbeitung…",
    error: "Zahlung fehlgeschlagen. Bitte erneut versuchen.",
  },
  footer: {
    copy: "© 2026 Vorn. Alle Rechte vorbehalten.",
    terms: "AGB",
    privacy: "Datenschutz",
    contact: "Kontakt",
  },
};

const no: typeof en = {
  nav: { brand: "vorn", buy: "Bestill nå" },
  hero: {
    tag: "Sanntids stemmeoversettelse",
    h1: "Hør verden\npå ditt språk.",
    sub: "Trådløse ørepropper med stemmeoversettelse i sanntid — under 0,5 s, 40+ språk. Laget for reise, næringsliv og hverdagsliv.",
    cta: "Bestill nå",
    scroll: "Rull ned",
  },
  scenes: [
    {
      tag: "< 0,5 s forsinkelse",
      h2: "Oversettelse\nraskere enn tanken.",
      body: "Vorn behandler tale i sanntid — før setningen er ferdig, forstår du allerede. Ingen pauser. Ingen gjentagelser.",
    },
    {
      tag: "40+ språk",
      h2: "Alle språk.\nEtt par ørepropper.",
      body: "Forretningsmøter i Tokyo. Veibeskrivelser i Lisboa. Familiesamtaler på tvers av grenser. Alt øyeblikkelig, alt naturlig.",
    },
    {
      tag: "ANC · USB-C · IPX5",
      h2: "Klar.\nHvor enn du er.",
      body: "Aktiv støyreduksjon, opptil 5 t batteri, IPX5 vanntetthet og USB-C hurtiglading — bygget for den virkelige verden.",
    },
  ],
  how: {
    title: "Slik fungerer det",
    steps: [
      { n: "01", t: "Fange opp", b: "Doble beamforming-mikrofoner isolerer talerens stemme fra omgivelsesstøy i sanntid." },
      { n: "02", t: "Oversette", b: "Sky-AI oversetter tale på under 0,5 s og strømmer resultatet direkte til ørene dine." },
      { n: "03", t: "Levere", b: "Oversettelsen spilles i øret ditt — naturlig, flytende, med bevart tone og kontekst." },
    ],
  },
  specs: {
    title: "Tekniske spesifikasjoner",
    rows: [
      ["Oversettelsesforsinkelse", "< 0,5 s (via sky-AI)"],
      ["Språk", "40+ (internett påkrevd)"],
      ["Driver", "Dynamisk, Hi-Fi"],
      ["Frekvensgang", "20 Hz – 20 kHz"],
      ["ANC", "Aktiv støyreduksjon"],
      ["Batteri", "3–5 t"],
      ["Lading", "1–3 t via USB-C"],
      ["Bluetooth", "5.4 · 30 ms trådløs forsinkelse"],
      ["Vanntetthet", "IPX5"],
      ["Kontroll", "Touch"],
      ["Kompatibilitet", "iOS 16+ · Android 10+"],
      ["Vekt", "~10 g per ørepropp"],
    ] as [string, string][],
  },
  testimonials: {
    title: "Anbefalt av reisende og fagfolk",
    items: [
      {
        text: "To timers forhandling med en koreansk leverandør — begge med Vorn. Vi inngikk avtalen uten tolk. Bemerkelsesverdig.",
        name: "Thomas B.",
        role: "Daglig leder · Oslo",
        stars: 5,
      },
      {
        text: "Ryggsekkreise gjennom 8 land på 3 måneder. Vorn var det eneste språkverktøyet jeg trengte. Markeder, hosteller, busser — alt fungerte.",
        name: "Elena V.",
        role: "Reiseblogger · Wien",
        stars: 5,
      },
      {
        text: "Svigermoren min snakker bare russisk. For første gang på julaften forsto jeg hva hun sa. Kona mi gråt.",
        name: "Michael H.",
        role: "Ingeniør · Berlin",
        stars: 5,
      },
    ],
  },
  faq: {
    title: "Vanlige spørsmål",
    items: [
      {
        q: "Hvor nøyaktig er oversettelsen?",
        a: "Vorn bruker toppmoderne sky-AI. Nøyaktigheten overstiger vanligvis 90 % for viktige språkpar (NO, EN, DE, ES, FR, ZH, JA, KO m.fl.) ved tydelig tale.",
      },
      {
        q: "Trenger Vorn internettforbindelse?",
        a: "Ja. Oversettelsen drives av sky-AI og krever aktiv internettforbindelse (4G/5G eller Wi-Fi). Den gratis appen for iOS og Android administrerer tilkobling og språkinnstillinger.",
      },
      {
        q: "Hvor lenge varer batteriet?",
        a: "Opptil 5 timers sammenhengende bruk. Lading via USB-C tar 1–3 timer. En LED-indikator viser batteristatus.",
      },
      {
        q: "Hva er returpolicyen?",
        a: "Du har 30 dager fra levering til å returnere Vorn av en hvilken som helst grunn. Vi dekker returfrakten. Refusjoner behandles innen 5 virkedager.",
      },
      {
        q: "Når kommer bestillingen min?",
        a: "Bestillinger til Norge sendes med Bring/Posten — vanligvis 2–4 virkedager. EU-bestillinger sendes med sporet frakt — 3–5 virkedager. Gratis frakt inkludert.",
      },
      {
        q: "Hvilke telefoner er kompatible?",
        a: "Vorn kobler seg til via Bluetooth 5.4 til alle iOS 16+- eller Android 10+-smarttelefoner. Den gratis Vorn-appen er tilgjengelig i App Store og Google Play.",
      },
    ],
  },
  delivery: {
    title: "Leveringsmetode",
    free: "Gratis",
    pointLabel: "Paczkomat®-kode",
    pointPlaceholder: "f.eks. WAW01M",
    pointHelp: "Finn nærmeste Paczkomat ↗",
    pointHelpUrl: "https://inpost.pl/znajdz-paczkomat",
    pointMissing: "Skriv inn Paczkomat®-koden din.",
    options: [
      { id: "bring", name: "Bring / Posten", eta: "2–4 virkedager", requiresPoint: false },
    ],
  },
  purchase: {
    title: "Bestill Vorn",
    sub: "Gratis frakt · 30 dagers retur · 2 års garanti",
    colors: [
      { id: "midnight", name: "Midnattssvart", hex: "#181818" },
      { id: "pearl",    name: "Perlevit",      hex: "#EDE9E3" },
      { id: "sage",     name: "Salvie",        hex: "#7D9980" },
    ],
    qty: "Antall",
    total: "Totalt",
    buy: "Bestill nå",
    trust: {
      returns: "30 dagers retur",
      warranty: "2 års garanti",
      shipping: "Gratis frakt",
      secure: "Sikker betaling",
    },
    legal: {
      agree: "Ved å bestille godtar du våre",
      terms: "Vilkår",
      and: "og",
      privacy: "Personvernerklæring",
    },
    success: {
      h: "Bestilling mottatt!",
      b: "Du mottar en bekreftelse på e-post. Takk for at du valgte Vorn.",
      again: "Legg inn en ny bestilling",
    },
  },
  modal: {
    title: "Fullfør bestilling",
    pay: "Betal",
    processing: "Behandler…",
    error: "Betaling mislyktes. Prøv igjen.",
  },
  footer: {
    copy: "© 2026 Vorn. Alle rettigheter forbeholdt.",
    terms: "Vilkår",
    privacy: "Personvern",
    contact: "Kontakt",
  },
};

export type T = typeof en;
export const translations: Record<Lang, T> = { en, pl, de, no };
