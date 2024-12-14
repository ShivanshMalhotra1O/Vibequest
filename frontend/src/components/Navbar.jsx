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
		<Navbar className="px-6 py-8 text-white bg-black lg:px-8 xl:px-16">
			<NavbarContent>
				<NavbarBrand>
					<a href="/" className="flex items-center gap-4 group">
						<img
							src="/images/logo.png"
							alt="Logo"
							className="w-auto h-10 rounded-md"
						/>
						<h1 className="text-3xl font-bold">VibeQuest</h1>
					</a>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent justify="end" className="sm:hidden">
				<NavbarMenuToggle />
			</NavbarContent>
			<NavbarContent
				className="items-center hidden gap-4 text-lg font-medium sm:flex"
				justify="end"
			>
				<NavbarItem>
					<a
						href="/"
						className={window.location.pathname === '/' ? 'text-primary' : ''}
					>
						Home
					</a>
				</NavbarItem>
				<NavbarItem>
					<a
						href="/about"
						className={
							window.location.pathname === '/about' ? 'text-primary' : ''
						}
					>
						About
					</a>
				</NavbarItem>
				<NavbarItem>
					<a
						href="/login"
						className={
							window.location.pathname === '/login' ? 'text-primary' : ''
						}
					>
						Login
					</a>
				</NavbarItem>
				<NavbarItem>
					<a
						href="/signup"
						className={
							window.location.pathname === '/signup' ? 'text-primary' : ''
						}
					>
						Signup
					</a>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu className="bg-black mt-14">
				<NavbarMenuItem>
					<Link
						href="/"
						className={window.location.pathname === '/' ? 'text-primary' : ''}
					>
						Home
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						href="/about"
						className={
							window.location.pathname === '/about' ? 'text-primary' : ''
						}
					>
						About
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						href="/login"
						className={
							window.location.pathname === '/login' ? 'text-primary' : ''
						}
					>
						Login
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link
						href="/signup"
						className={
							window.location.pathname === '/signup' ? 'text-primary' : ''
						}
					>
						Signup
					</Link>
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
}
