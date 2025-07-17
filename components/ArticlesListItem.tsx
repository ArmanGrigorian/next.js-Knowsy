import Link from "next/link";
import Image from "next/image";


function ArticleListItem({ articleListItem }: I_ArticlesListItemProps) {
	const info: T_Info = {
		source: "",
	};

	if (articleListItem.thumbnail) {
		Object.entries(articleListItem.thumbnail).forEach((val) => {
			if (val[0] === "source") info.source = val[1] as string;
		});
	}

	return (
		<article className="w-[86%] flex justify-between items-center gap-4 px-4 pt-3 pb-2 border-[1px] border-neutral-800 rounded-lg">
			<div>
				<h3 className="flex items-center gap-3">
					<Link
						href={`https://en.wikipedia.org/?curid=${articleListItem.pageid}`}
						target="_blank"
						className="
						text-neutral-900
					 	 text-[16px]
					  	font-bold
					  underline
						 underline-offset-2
						 hover:italic 
						 hover:opacity-70">
						{articleListItem.title}
					</Link>
				</h3>

				<p className="text-justify">{articleListItem.extract}</p>
			</div>

			{articleListItem.thumbnail && (
				<Image src={info.source} alt={articleListItem.title} width={60} height={50} loading="lazy" />
			)}
		</article>
	);
}

export default ArticleListItem;
