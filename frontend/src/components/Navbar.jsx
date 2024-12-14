export default function Navbar() {
	return (
		<nav className="w-full flex items-center justify-between px-6 py-8 lg:px-8 xl:px-16 bg-black/75 text-white backdrop-blur-sm sticky top-0 z-50">
			<a href="/" className="flex items-center gap-4 group">
				<img
					src="/images/logo.png"
					alt="Logo"
					className="h-10 w-auto rounded-md"
				/>
				<h1 className="text-3xl font-bold">VibeQuest</h1>
			</a>

			<ul className="flex items-center gap-4 text-lg font-medium">
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/about">About</a>
				</li>
			</ul>
		</nav>
	);
}
