import Link from "next/link";
import ArticleListItem from "./ArticlesListItem";

function ArticlesList({ articlesList }: I_ArticlesListProps) {
  return (
    <div className="flex flex-col justify-start items-center gap-6">
      {articlesList &&
        articlesList.map((articleListItem) => {
          return <ArticleListItem key={articleListItem.pageid} articleListItem={articleListItem} />;
        })}

      <Link
        href={"/"}
        className="border px-6 py-1 rounded cursor-pointer border-neutral-600 hover:opacity-80 z-10 hover:bg-green-700 hover:border-green-700 hover:text-white">
        Back
      </Link>
    </div>
  );
}

export default ArticlesList;
