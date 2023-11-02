import Link from "next/link";
import Image from "next/image";

function CertainArticle({ certainArticle }: T_CertainArticleProps) {
	const info: T_info = {
		source: "",
	};

	if (certainArticle.thumbnail) {
		Object.entries(certainArticle.thumbnail).forEach((val) => {
			if (val[0] === "source") info.source = val[1] as string;
		});
	}

	return (
		<article className="w-[86%] px-4 pt-3 pb-2 border-[1px] border-neutral-800 rounded-lg">
			<h3 className="flex items-center gap-3">
				{certainArticle.thumbnail && (
					<Image
						src={info.source}
						alt={certainArticle.title}
						width={50}
						height={40}
						loading="lazy"
					/>
				)}
				<Link
					href={`https://en.wikipedia.org/?curid=${certainArticle.pageid}`}
					target="_blank"
					className="
					text-neutral-900
					 text-[16px]
					  font-bold
					   underline
						 underline-offset-2
						 hover:italic 
						 hover:opacity-70">
					{certainArticle.title}
				</Link>
			</h3>

			<p className="text-justify w-[96%] mx-auto mt-3 pt-1 border-t-[1px] border-neutral-500">{certainArticle.extract}</p>
		</article>
	);
}

export default CertainArticle;
