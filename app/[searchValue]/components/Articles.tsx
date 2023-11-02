import React from "react";
import CertainArticle from "./CertainArticle";
import Link from "next/link";

function Articles({ articlesList }: T_ArticlesProps) {
	return (
		<div className="flex flex-col justify-start items-center gap-6">
			{articlesList &&
            articlesList.map((certainArticle) => {
					return <CertainArticle key={certainArticle.pageid} certainArticle={certainArticle} />;
				})}

			<Link
				href={"/"}
				className="border-[1px] px-6 py-1 rounded cursor-pointer border-neutral-600 hover:opacity-80 z-10 hover:bg-green-700 hover:border-green-700 hover:text-white">
				Back
			</Link>
		</div>
	);
}

export default Articles;
