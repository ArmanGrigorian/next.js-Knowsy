"use client";

import Link from "next/link";
import SearchPanel from "@/components/SearchPanel";
import { BookOpen, Library as LibraryIcon } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 px-4 py-3 md:py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <h1 className="text-3xl font-extrabold tracking-tight group flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-brand-primary group-hover:text-brand-secondary transition-colors duration-500" />
          <Link
            href="/"
            className="text-gradient hover:opacity-80 transition-opacity"
          >
            Knowsy
          </Link>
        </h1>
        <div className="w-full md:w-auto flex-1 max-w-xl md:ml-8 flex items-center gap-2">
          <SearchPanel />
          <Link
            href="/library"
            className="p-3 ml-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-brand-secondary hover:text-white shrink-0"
            title="Your Library"
          >
            <LibraryIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
