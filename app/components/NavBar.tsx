import Link from "next/link";
import Search from "./SearchPanel";

function NavBar() {
	return (
		<nav className="bg-neutral-900 p-4 flex flex-col justify-between items-center md:flex-row md:gap-0 gap-1 sticky top-0 z-[1] drop-shadow-xl">
			<h1 className="text-3xl font-bold text-neutral-100 grid place-content-center mb-2 md:mb-0 hover:text-green-600">
				<Link href={"/"}>📚Knowsy</Link>
			</h1>

			<Search />
		</nav>
	);
}

export default NavBar;
