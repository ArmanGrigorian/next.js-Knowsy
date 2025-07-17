interface I_SearchResultsProps {
	params: {
		searchValue: string;
	};
};

interface I_ArticlesListItemProps {
	articleListItem: T_Article;
};

interface I_ArticlesListProps {
	articlesList: T_Article[];
};

type T_Info = {
	source: string;
};

type T_Thumbnail = {
	source: string;
	width: number;
	height: number;
};

type T_Article = {
	pageid: string;
	title: string;
	extract: string;
	thumbnail?: T_Thumbnail;
};

type T_ArticlesList = {
	query?: {
		pages?: T_Result[];
	};
};
