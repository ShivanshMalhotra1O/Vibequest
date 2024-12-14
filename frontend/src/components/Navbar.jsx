export default function Navbar() {
	return (
		<nav className="sticky top-0 z-50 flex items-center justify-between w-full px-6 py-8 text-white bg-black lg:px-8 xl:px-16 backdrop-blur-sm">
			<a href="/" className="flex items-center gap-4 group">
				<img
					src="/images/logo.png"
					alt="Logo"
					className="w-auto h-10 rounded-md"
				/>
				<h1 className="text-3xl font-bold">VibeQuest</h1>
			</a>

			<ul className="flex items-center gap-4 text-lg font-medium">
				<li>
					<a
						href="/"
						className={window.location.pathname === '/' ? 'text-primary' : ''}
					>
						Home
					</a>
				</li>
				<li>
					<a
						href="/about"
						className={
							window.location.pathname === '/about' ? 'text-primary' : ''
						}
					>
						About
					</a>
				</li>
				<li>
					<a
						href="/login"
						className={
							window.location.pathname === '/login' ? 'text-primary' : ''
						}
					>
						Login
					</a>
				</li>
				<li>
					<a
						href="/signup"
						className={
							window.location.pathname === '/signup' ? 'text-primary' : ''
						}
					>
						Signup
					</a>
				</li>
			</ul>
		</nav>
	);
}
