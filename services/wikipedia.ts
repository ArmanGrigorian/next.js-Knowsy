export type FeaturedArticleType = {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  content_urls: { desktop: { page: string } };
};

export async function getFeaturedArticle(): Promise<FeaturedArticleType | null> {
  try {
    const date = new Date();
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(date.getUTCDate()).padStart(2, "0");

    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/feed/featured/${yyyy}/${mm}/${dd}`,
      {
        headers: { "Api-User-Agent": "KnowsyApp/1.0" },
        next: { revalidate: 86400 },
      },
    );

    if (res.ok) {
      const data = await res.json();
      return data?.tfa || null;
    }
  } catch (e) {
    console.error("Failed to fetch featured article", e);
  }
  return null;
}

export async function getRandomArticleTitle(): Promise<string | null> {
  try {
    const res = await fetch(
      "https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json&origin=*",
    );
    const data = await res.json();
    return data?.query?.random?.[0]?.title || null;
  } catch (e) {
    console.error("Failed to fetch random article", e);
    return null;
  }
}

export async function getWikiResults(
  searchValue: string,
  offset: number = 0,
): Promise<
  T_ArticlesList & { continue?: { gsroffset: number; continue: string } }
> {
  const searchParams = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: searchValue,
    gsrlimit: "20",
    gsroffset: offset.toString(),
    prop: "pageimages|extracts",
    exintro: "true",
    explaintext: "true",
    exlimit: "max",
    format: "json",
    origin: "*",
  });

  const response = await fetch(
    "https://en.wikipedia.org/w/api.php?" + searchParams,
  );
  return response.json();
}
