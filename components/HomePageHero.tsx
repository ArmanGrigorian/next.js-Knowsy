"use client";

import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function HomePageHero() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="text-center max-w-2xl px-4"
    >
      <motion.div
        variants={item}
        className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-brand-primary/10 text-brand-primary"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>

      <motion.h2
        variants={item}
        className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-neutral-900 "
      >
        Explore the world with{" "}
        <span className="text-brand-primary">Knowsy</span>
      </motion.h2>

      <motion.p
        variants={item}
        className="text-lg md:text-xl text-neutral-600 mb-10 leading-relaxed font-serif"
      >
        Your portal to infinite knowledge. Search through millions of Wikipedia
        articles instantly, presented in a beautiful distraction-free interface.
      </motion.p>

      <motion.div
        variants={item}
        className="hidden md:flex justify-center gap-4 text-sm font-medium text-neutral-600 "
      >
        <span className="px-4 py-2 rounded-full border border-neutral-300 bg-neutral-200/50 shadow-sm ">
          Fast
        </span>
        <span className="px-4 py-2 rounded-full border border-neutral-300 bg-neutral-200/50 shadow-sm ">
          Clean
        </span>
        <span className="px-4 py-2 rounded-full border border-neutral-300 bg-neutral-200/50 shadow-sm ">
          Knowledge
        </span>
      </motion.div>
    </motion.div>
  );
}
