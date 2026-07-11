import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect, useRef } from "react";
import { useDebounce } from "./useDebounce";
import { getWikiResults } from "@/services/wikipedia";
import { getRandomArticleTitle } from "@/services/wikipedia";

export default function useSearchPanel() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [liveResults, setLiveResults] = useState<T_Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isRandomizing, setIsRandomizing] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue, 300);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("knowsy_recent_searches");
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const lower = term.toLowerCase();
    const filtered = recentSearches.filter((s) => s.toLowerCase() !== lower);
    const updated = [term, ...filtered].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem("knowsy_recent_searches", JSON.stringify(updated));
    } catch (e) {}
  };

  useEffect(() => {
    if (!debouncedSearchValue.trim()) {
      setLiveResults([]);
      return;
    }
    let isMounted = true;
    setIsLoading(true);
    getWikiResults(debouncedSearchValue)
      .then((data) => {
        if (!isMounted) return;
        if (data?.query?.pages) {
          setLiveResults(
            (Object.values(data.query.pages) as T_Article[]).slice(0, 5),
          );
        } else {
          setLiveResults([]);
        }
        setIsLoading(false);
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [debouncedSearchValue]);

  const handleSubmit = (
    e?: FormEvent<HTMLFormElement>,
    overrideValue?: string,
  ) => {
    if (e) e.preventDefault();
    const query = overrideValue ?? searchValue;
    if (!query.trim()) return;

    saveRecentSearch(query.trim());
    router.push(`/${encodeURIComponent(query.trim())}/`);
    setSearchValue("");
    setIsFocused(false);
  };

  // Keyboard and outside click handlers
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const items = searchValue.trim() ? liveResults : recentSearches;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isFocused) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < items.length) {
        e.preventDefault();
        const selected = items[activeIndex];
        const val = typeof selected === "string" ? selected : selected.title;
        setSearchValue(val);
        handleSubmit(undefined, val);
      }
    } else if (e.key === "Escape") {
      setIsFocused(false);
    }
  };

  const handleSurpriseMe = async () => {
    setIsRandomizing(true);
    const title = await getRandomArticleTitle();
    if (title) {
      setSearchValue(title);
      handleSubmit(undefined, title);
    }
    setIsRandomizing(false);
  };

  const clearSearch = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };

  return {
    searchValue,
    setSearchValue,
    handleSubmit,
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
  };
}
