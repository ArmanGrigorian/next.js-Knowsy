import { useState, useCallback } from "react";
import { getWikiResults } from "@/services/wikipedia";

export function useWikiPagination(
  initialArticles: T_Article[] = [],
  initialOffset: number = 0,
  query: string = "",
) {
  const [articles, setArticles] = useState<T_Article[]>(initialArticles);
  const [offset, setOffset] = useState(initialOffset);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (!offset || !query) return;
    setIsLoading(true);
    try {
      const data = await getWikiResults(query, offset);
      if (data && data.query && data.query.pages) {
        const newArticles = Object.values(data.query.pages) as T_Article[];
        setArticles((prev) => [...prev, ...newArticles]);
        if (data.continue?.gsroffset) {
          setOffset(data.continue.gsroffset);
        } else {
          setOffset(0);
        }
      } else {
        setOffset(0);
      }
    } catch (e) {
      console.error(e);
      setOffset(0);
    } finally {
      setIsLoading(false);
    }
  }, [offset, query]);

  return { articles, offset, isLoading, loadMore };
}
