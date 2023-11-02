type T_SearchResultsProps = {
	params: {
		searchValue: string;
	};
};

type T_CertainArticleProps = {
	certainArticle: T_CertainArticle;
};

type T_ArticlesProps = {
	articlesList: T_CertainArticle[] | undefined;
};

type T_info = {
	source: string;
};

type T_CertainArticle = {
	pageid: string;
	title: string;
	extract: string;
	thumbnail?: {
		sourse: string;
		width: number;
		height: number;
	};
};

type T_ArticlesList = {
	query?: {
		pages?: T_Result[];
	};
};
