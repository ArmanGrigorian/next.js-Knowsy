"use client";

function ScrollButton() {
	return (
		<div className="fixed bottom-0 left-0 right-0 w-full max-w-6xl mx-auto p-4">
			<button
				type="button"
				onClick={() => window.scroll(0, 0)}
				className="ml-auto block
          bg-white border-[1px]
             border-green-600 rounded-full w-16 h-16 text-3xl shadow-2xl shadow-neutral-700 hover:bg-green-600 opacity-80">
				🔝
			</button>
		</div>
	);
}

export default ScrollButton;
