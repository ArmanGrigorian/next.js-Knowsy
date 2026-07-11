"use client";

import { useBookmarks } from "@/hooks/useBookmarks";
import { BookOpen, Library as LibraryIcon, Search } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LibraryPage() {
  const { bookmarks, mounted } = useBookmarks();

  if (!mounted) return null;

  return (
    <main className="w-full flex flex-col pt-8 relative max-w-4xl mx-auto">
      <div className="mb-10 flex items-center gap-3 border-b border-neutral-200 pb-6">
        <div className="p-3 bg-brand-secondary/10 text-brand-secondary rounded-full">
          <LibraryIcon className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 ">
            Your Library
          </h2>
          <p className="text-neutral-500 ">Articles you've saved for later.</p>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center glass-panel rounded-3xl border-dashed">
          <BookOpen className="w-16 h-16 text-neutral-400 mb-4" />
          <h3 className="text-xl font-bold text-neutral-700 mb-2">
            Your library is empty
          </h3>
          <p className="text-neutral-500 max-w-sm mb-8">
            When you see an interesting article, click the bookmark icon to save
            it here.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors rounded-full flex items-center gap-2 font-medium border border-brand-primary/20"
          >
            <Search className="w-4 h-4" />
            Start Searching
          </Link>
        </div>
      ) : (
        <div className="w-full space-y-12 pb-12">
          {/* Bookshelf Layout */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          >
            {bookmarks.map((article, i) => (
              <motion.div
                key={`${article.pageid}-${i}`}
                variants={item}
                className="relative group perspective-1000"
              >
                <Link
                  href={`https://en.wikipedia.org/?curid=${article.pageid}`}
                  target="_blank"
                >
                  <div className="w-full aspect-2/3 rounded-r-lg rounded-l-sm bg-linear-to-br from-amber-900 to-amber-950 shadow-[5px_5px_15px_rgba(0,0,0,0.5)] border-l-4 border-amber-800 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:rotate-y-[-10deg] relative overflow-hidden flex flex-col p-4">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-r from-amber-950 to-transparent opacity-50 pointer-events-none" />

                    {article.thumbnail ? (
                      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                        <img
                          src={article.thumbnail.source}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                    ) : null}

                    <div className="relative z-10 flex-1 flex flex-col justify-center text-center">
                      <div className="w-full h-px bg-amber-700/50 mb-4" />
                      <h3 className="text-amber-50 font-bold text-lg sm:text-xl leading-tight line-clamp-4 drop-shadow-md">
                        {article.title}
                      </h3>
                      <div className="w-full h-px bg-amber-700/50 mt-4" />
                    </div>

                    <div className="relative z-10 text-center mt-auto">
                      <span className="text-[10px] text-amber-500/80 uppercase tracking-widest font-bold">
                        Knowsy
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="absolute -bottom-2 -left-2 -right-2 h-2 bg-linear-to-b from-amber-900 to-black rounded-sm shadow-xl pointer-events-none -z-10" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </main>
  );
}
