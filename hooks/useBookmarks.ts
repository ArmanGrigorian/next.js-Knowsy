"use client";

import { useState, useEffect, useCallback } from "react";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<T_Article[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("knowsy_bookmarks");
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const saveBookmarks = (newBookmarks: T_Article[]) => {
    setBookmarks(newBookmarks);
    try {
      localStorage.setItem("knowsy_bookmarks", JSON.stringify(newBookmarks));
    } catch (e) {}
  };

  const toggleBookmark = useCallback((article: T_Article) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.some((b) => b.pageid === article.pageid);
      let newBookmarks;
      if (isBookmarked) {
        newBookmarks = prev.filter((b) => b.pageid !== article.pageid);
      } else {
        newBookmarks = [article, ...prev];
      }
      try {
        localStorage.setItem("knowsy_bookmarks", JSON.stringify(newBookmarks));
      } catch (e) {}
      return newBookmarks;
    });
  }, []);

  const isBookmarked = useCallback(
    (pageid: string) => {
      if (!mounted) return false;
      return bookmarks.some((b) => b.pageid === pageid);
    },
    [bookmarks, mounted],
  );

  return { bookmarks, toggleBookmark, isBookmarked, mounted };
}
