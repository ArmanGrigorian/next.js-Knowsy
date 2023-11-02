import toCapitalize from "@/lib/toCapitalize";
import getWikiResults from "@/lib/getWikiResults";
import ScrollButton from "./components/ScrollButton";
import Articles from "./components/Articles";

export async function generateMetadata({ params }: T_SearchResultsProps) {
	const wikiData: Promise<T_ArticlesList> = getWikiResults(params.searchValue);
	const wiki = await wikiData;

	const displayValue = params.searchValue.replaceAll("%20", " ");

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

async function SearchResults({ params }: T_SearchResultsProps) {
	const wikiData: Promise<T_ArticlesList> = getWikiResults(params.searchValue);
	const wiki = await wikiData;
	let articlesList: T_CertainArticle[] | undefined = [];
	
	if (wiki && wiki.query && wiki.query.pages) {
		articlesList = Object.values(wiki.query.pages);
	}

	return (
		<main className="bg-neutral-100 min-h-[calc(100vh-204px)] sm:min-h-[calc(100vh-156px)] relative p-4">
			<ScrollButton />

			<h2 className="text-center py-2 text-xl font-bold text-green-600">
				{articlesList
					? toCapitalize(params.searchValue)
					: `Nothing was found for your request "${params.searchValue}"`}
			</h2>

			<Articles articlesList={articlesList} />
		</main>
	);
}

export default SearchResults;
