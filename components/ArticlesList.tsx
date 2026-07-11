"use client";

import Link from "next/link";
import ArticleListItem from "./ArticlesListItem";
import { motion, Variants } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useWikiPagination } from "@/hooks/useWikiPagination";

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

function ArticlesList({
  initialArticles = [],
  initialOffset = 0,
  query = "",
}: I_ArticlesListProps) {
  const { articles, offset, isLoading, loadMore } = useWikiPagination(
    initialArticles,
    initialOffset,
    query,
  );

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto pb-12 mt-8">
      {articles.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full flex flex-col gap-6"
        >
          {articles.map((articleListItem, i) => (
            <motion.div key={`${articleListItem.pageid}-${i}`} variants={item}>
              <ArticleListItem
                articleListItem={articleListItem}
                query={query}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {offset > 0 && (
        <div className="mt-8">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="px-8 py-3 rounded-full bg-brand-primary/10 text-brand-primary font-medium hover:bg-brand-primary/20 transition-all focus:ring-2 focus:ring-brand-primary flex items-center justify-center border border-brand-primary/20"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}

      <div className="mt-12">
        <Link
          href={"/"}
          className="px-8 py-3 rounded-full bg-neutral-900 text-white font-medium hover:opacity-80 transition-all focus:ring-2 focus:ring-neutral-500 flex items-center justify-center shadow-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default ArticlesList;
