import Link from "next/link";

function Footer() {
	return (
		<footer className="h-20 leading-[80px] bg-neutral-900">
			<p className="text-center text-neutral-100">
				Powered by{" "}
				<Link
					target="_blank"
					href={"https://github.com/ArmanGrigorian?tab=repositories"}
					className="underline decoration-neutral-100 underline-offset-2">
					Me
				</Link>
			</p>
		</footer>
	);
}

export default Footer;
