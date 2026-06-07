"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold tracking-tight mb-4">CraftAI</h1>
        <p className="text-lg text-gray-500">AI-powered creative platform</p>
      </motion.div>
    </main>
  );
}
