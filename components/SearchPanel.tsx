"use client";

import { ChangeEvent } from "react";
import useSearchPanel from "../hooks/useSearchPanel";
import { Search, History, Loader2, BookOpen, X, Dices } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SearchPanel() {
  const {
    handleSubmit,
    searchValue,
    setSearchValue,
    isFocused,
    setIsFocused,
    liveResults,
    isLoading,
    recentSearches,
    activeIndex,
    setActiveIndex,
    containerRef,
    inputRef,
    isRandomizing,
    handleKeyDown,
    handleSurpriseMe,
    clearSearch,
  } = useSearchPanel();

  return (
    <search className="w-full relative z-50" ref={containerRef}>
      <form
        className="w-full flex items-center gap-2 relative group"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Search className="absolute left-4 w-5 h-5 text-neutral-400 group-hover:text-brand-primary transition-colors" />
        <input
          ref={inputRef}
          type="search"
          value={searchValue}
          onFocus={() => setIsFocused(true)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
            setIsFocused(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder="What do you want to learn today? (Ctrl+K to focus)"
          className="w-full pl-12 pr-48 py-3 rounded-full bg-white border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 hover:bg-neutral-50 focus:bg-white transition-all shadow-sm "
        />

        {/* Clear Button */}
        {searchValue && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-42.5 p-1 text-neutral-400 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="absolute right-2 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleSurpriseMe}
            disabled={isRandomizing}
            title="Surprise Me (Random Article)"
            className="p-2 text-brand-secondary hover:bg-brand-secondary/20 rounded-full transition-colors flex items-center justify-center disabled:opacity-50"
          >
            {isRandomizing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Dices className="w-5 h-5" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-1.5 bg-brand-primary text-white font-medium rounded-full shadow-lg shadow-brand-secondary/20 hover:shadow-brand-primary/40 transition-shadow"
          >
            Search
          </motion.button>
        </div>
      </form>

      <AnimatePresence>
        {isFocused && (searchValue.trim() || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden z-50 flex flex-col"
          >
            {isLoading && searchValue.trim() ? (
              <div className="flex items-center justify-center p-6 text-neutral-400">
                <Loader2 className="w-6 h-6 animate-spin text-brand-primary" />
              </div>
            ) : !searchValue.trim() && recentSearches.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Recent Searches
                </div>
                {recentSearches.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSubmit(undefined, item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                      activeIndex === index
                        ? "bg-neutral-100 "
                        : "hover:bg-neutral-50 "
                    }`}
                  >
                    <History className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-700 ">{item}</span>
                  </div>
                ))}
              </div>
            ) : liveResults.length > 0 ? (
              <div className="py-2">
                {liveResults.map((item, index) => (
                  <div
                    key={item.pageid}
                    className={`px-4 py-3 cursor-pointer flex items-center gap-3 border-l-2 transition-colors ${
                      activeIndex === index
                        ? "bg-neutral-100 border-brand-primary"
                        : "border-transparent hover:bg-neutral-50 "
                    }`}
                    onClick={() => handleSubmit(undefined, item.title)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <div className="w-8 h-8 rounded-full bg-neutral-200 shrink-0 flex items-center justify-center overflow-hidden border border-neutral-300 ">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail.source}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <BookOpen className="w-4 h-4 text-neutral-400 " />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-neutral-900 font-medium truncate">
                        {item.title}
                      </span>
                      <span className="text-neutral-500 text-sm truncate">
                        {item.extract?.substring(0, 50) || "Read more..."}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchValue.trim() ? (
              <div className="p-4 text-center text-neutral-500 text-sm">
                No results found for "{searchValue}"
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </search>
  );
}

export default SearchPanel;
