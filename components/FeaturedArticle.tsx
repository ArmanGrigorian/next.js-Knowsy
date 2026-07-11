import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedArticle } from "@/services/wikipedia";

export default async function FeaturedArticle() {
  const article = await getFeaturedArticle();

  if (!article) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 text-left animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-brand-secondary fill-brand-secondary/20" />
        <h2 className="text-xl font-bold text-neutral-900 ">
          Featured Article
        </h2>
      </div>

      <article className="relative w-full glass-panel rounded-3xl overflow-hidden group">
        <div className="flex flex-col md:flex-row">
          {article.thumbnail && (
            <div className="w-full md:w-1/3 h-48 md:h-auto relative bg-black/40 overflow-hidden shrink-0">
              <Image
                src={article.thumbnail.source}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized={true}
              />
            </div>
          )}
          <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-brand-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-neutral-700 leading-relaxed line-clamp-4 md:line-clamp-6">
                {article.extract}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <Link
                href={article.content_urls.desktop.page}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-secondary transition-colors"
              >
                Read full article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
