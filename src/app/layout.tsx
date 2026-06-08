import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Falinski.dev — Strony internetowe i sklepy online",
  description:
    "Buduję landing pages i sklepy internetowe, które zdobywają klientów. Szybko, pięknie, skutecznie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${geist.variable} h-full`}>
      <body className="antialiased bg-[#0A0A0A] text-white">{children}</body>
    </html>
  );
}
