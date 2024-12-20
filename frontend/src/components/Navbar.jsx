import {
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@nextui-org/react';

export default function Nav() {
	return (
		<Navbar className="px-2 py-4 text-white bg-black">
			{/* Left Content: Logo and Heading */}
			<NavbarContent className="flex items-center gap-3">
				<NavbarBrand>
					<a href="/" className="flex items-center gap-5 group">
						<img
							src="/images/logo.png"
							alt="Logo"
							className="w-auto h-12 rounded-md"
						/>
						<h1 className="text-3xl font-bold">VibeQuest</h1>
					</a>
				</NavbarBrand>
			</NavbarContent>

			{/* Right Content: Navigation Tags */}
			<NavbarContent
				className="hidden gap-4 text-2xl font-medium sm:flex ml-auto"
				justify="end"
			>
				<NavbarItem>
					<a
						href="/home"
						className={`${
							window.location.pathname === '/home' ? 'text-primary' : ''
						}`}
					>
						Home
					</a>
				</NavbarItem>
				<NavbarItem>
					<a
						href="/about"
						className={`${
							window.location.pathname === '/about' ? 'text-primary' : ''
						}`}
					>
						About
					</a>
				</NavbarItem>
				<NavbarItem>
					<a
						href="/login"
						className={`${
							window.location.pathname === '/login' ? 'text-primary' : ''
						}`}
					>
						Login
					</a>
				</NavbarItem>
				<NavbarItem>
					<a
						href="/signup"
						className={`${
							window.location.pathname === '/signup' ? 'text-primary' : ''
						}`}
					>
						Signup
					</a>
				</NavbarItem>
			</NavbarContent>

			{/* Mobile Menu Toggle */}
			<NavbarContent justify="end" className="sm:hidden">
				<NavbarMenuToggle />
			</NavbarContent>

			{/* Mobile Navigation Menu */}
			<NavbarMenu className="bg-black mt-14 text-3xl">
				<NavbarMenuItem>
					<Link
						href="/home"
						className={`${
							window.location.pathname === '/home' ? 'text-primary' : ''
						}`}
					>
						Home
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						href="/about"
						className={`${
							window.location.pathname === '/about' ? 'text-primary' : ''
						}`}
					>
						About
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						href="/login"
						className={`${
							window.location.pathname === '/login' ? 'text-primary' : ''
						}`}
					>
						Login
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						href="/signup"
						className={`${
							window.location.pathname === '/signup' ? 'text-primary' : ''
						}`}
					>
						Signup
					</Link>
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
}
