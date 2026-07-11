import { getWikiResults } from "@/services/wikipedia";
import toCapitalize from "@/utils/toCapitalize";
import Articles from "@/components/ArticlesList";
import ScrollButton from "@/components/ScrollButton";

interface Props {
  params: Promise<{
    searchValue: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { searchValue } = await params;
  const wikiData: Promise<T_ArticlesList> = getWikiResults(searchValue);
  const wiki = await wikiData;

  const displayValue = searchValue.replaceAll("%20", " ");

  if (!wiki?.query?.pages) {
    return {
      title: `${displayValue} Not Found`,
      description: "",
    };
  }

  return {
    title: toCapitalize(displayValue),
    description: `Search results for ${displayValue}`,
  };
}

async function SearchResults({ params }: Props) {
  const { searchValue } = await params;
  const wikiData: Promise<T_ArticlesList> = getWikiResults(searchValue);
  const wiki = await wikiData;
  let articlesList: T_Article[] | undefined = [];
  let nextOffset = 0;

  if (wiki && wiki.query && wiki.query.pages) {
    articlesList = Object.values(wiki.query.pages);
  }

  if (wiki && wiki.continue && wiki.continue.gsroffset) {
    nextOffset = wiki.continue.gsroffset;
  }

  const hasResults = articlesList && articlesList.length > 0;

  return (
    <main className="w-full flex flex-col pt-8 relative">
      <ScrollButton />

      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">
          {hasResults ? (
            <>
              Results for{" "}
              <span className="text-brand-primary italic">
                "{toCapitalize(searchValue.replaceAll("%20", " "))}"
              </span>
            </>
          ) : (
            <span className="text-red-500">
              Nothing found for "{searchValue.replaceAll("%20", " ")}"
            </span>
          )}
        </h2>
        {hasResults && (
          <p className="text-neutral-400">Found articles to explore.</p>
        )}
      </div>

      <Articles
        initialArticles={articlesList}
        initialOffset={nextOffset}
        query={searchValue}
      />
    </main>
  );
}

export default SearchResults;
