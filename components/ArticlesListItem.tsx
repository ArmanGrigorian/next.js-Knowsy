"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Volume2,
  VolumeX,
  Share2,
  Check,
  Bookmark,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HighlightText } from "./ui/HighlightText";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useClipboard } from "@/hooks/useClipboard";
import { useBookmarks } from "@/hooks/useBookmarks";

function ArticleListItem({ articleListItem, query }: I_ArticlesListItemProps) {
  const { copied, copyToClipboard } = useClipboard();
  const { isPlaying, toggleSpeech } = useTextToSpeech(articleListItem.extract);
  const { isBookmarked, toggleBookmark, mounted } = useBookmarks();

  const [isExpanded, setIsExpanded] = useState(false);
  const isSaved = isBookmarked(articleListItem.pageid);

  const info: T_Info = { source: "" };
  if (articleListItem.thumbnail) {
    Object.entries(articleListItem.thumbnail).forEach((val) => {
      if (val[0] === "source") info.source = val[1] as string;
    });
  }

  const handleShare = () => {
    const url = `https://en.wikipedia.org/?curid=${articleListItem.pageid}`;
    copyToClipboard(url);
  };

  return (
    <article className="w-full glass-panel rounded-2xl p-6 transition-all duration-300 hover:bg-neutral-50 hover:-translate-y-1 hover:shadow-lg flex flex-col sm:flex-row justify-between items-start gap-6 group">
      <div className="flex-1 space-y-3 relative w-full">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold pr-24">
            <Link
              href={`https://en.wikipedia.org/?curid=${articleListItem.pageid}`}
              target="_blank"
              className="text-neutral-900 decoration-brand-primary/30 underline-offset-4 hover:text-brand-primary hover:underline transition-colors"
            >
              <HighlightText text={articleListItem.title} highlight={query} />
            </Link>
          </h3>

          <div className="flex items-center gap-1 absolute right-0 top-0">
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleBookmark(articleListItem)}
                title={isSaved ? "Remove Bookmark" : "Save for Later"}
                className={`p-2 rounded-full transition-colors ${isSaved ? "bg-brand-secondary/20 text-brand-secondary" : "bg-neutral-200/50 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-300 "}`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isSaved ? "fill-brand-secondary" : ""}`}
                />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSpeech}
              title={isPlaying ? "Stop Reading" : "Read Aloud"}
              className={`p-2 rounded-full transition-colors ${isPlaying ? "bg-brand-primary/20 text-brand-primary animate-pulse" : "bg-neutral-200/50 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-300 "}`}
            >
              {isPlaying ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              title="Copy Link"
              className={`p-2 rounded-full transition-colors ${copied ? "bg-green-500/20 text-green-600 " : "bg-neutral-200/50 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-300 "}`}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </div>

        <div className="text-neutral-700 leading-relaxed max-w-3xl">
          <AnimatePresence initial={false}>
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : "4.5rem" }}
              className="overflow-hidden relative"
            >
              <p className={`${!isExpanded ? "line-clamp-3" : ""}`}>
                <HighlightText
                  text={articleListItem.extract}
                  highlight={query}
                />
              </p>
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-white to-transparent pointer-events-none" />
              )}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-sm font-medium text-brand-primary hover:text-brand-secondary transition-colors flex items-center gap-1"
          >
            {isExpanded ? "Show Less" : "Quick View"}
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </div>
      </div>

      {articleListItem.thumbnail && (
        <div className="shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 mt-4 sm:mt-0 w-20 h-20">
          <Image
            src={info.source}
            alt={articleListItem.title}
            width={80}
            height={80}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            unoptimized={true}
          />
        </div>
      )}
    </article>
  );
}

export default ArticleListItem;
