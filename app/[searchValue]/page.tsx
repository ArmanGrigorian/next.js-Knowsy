import getWikiResults from "@/utils/getWikiResults";
import toCapitalize from "@/utils/toCapitalize";
import Articles from "../../components/ArticlesList";
import ScrollButton from "../../components/ScrollButton";

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

  if (wiki && wiki.query && wiki.query.pages) {
    articlesList = Object.values(wiki.query.pages);
  }

  return (
    <main className="bg-neutral-100 min-h-[calc(100vh-204px)] sm:min-h-[calc(100vh-156px)] relative p-4">
      <ScrollButton />

      <h2 className="text-center py-2 text-xl font-bold text-green-600">
        {articlesList
          ? toCapitalize(searchValue)
          : `Nothing was found for your request "${searchValue}"`}
      </h2>

      <Articles articlesList={articlesList} />
    </main>
  );
}

export default SearchResults;
