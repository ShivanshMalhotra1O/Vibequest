import { logOut, useUser } from '@/utils';
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
	const { data: userData } = useUser();
	return (
		<Navbar
			className="w-full px-2 py-2 text-white bg-black"
			classNames={{
				wrapper: 'max-w-full',
			}}
		>
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
				className="hidden gap-4 ml-auto text-2xl font-medium sm:flex"
				justify="end"
			>
				{userData && (
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
				)}
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
				{userData ? (
					<NavbarItem className="flex gap-2 text-base">
						<p>Hi, {userData?.name}!</p>
						<button className="underline cursor-pointer" onClick={logOut}>
							Logout
						</button>
					</NavbarItem>
				) : (
					<>
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
					</>
				)}
			</NavbarContent>

			{/* Mobile Menu Toggle */}
			<NavbarContent justify="end" className="sm:hidden">
				<NavbarMenuToggle />
			</NavbarContent>

			{/* Mobile Navigation Menu */}
			<NavbarMenu className="mt-2 text-3xl bg-black">
				{userData && (
					<>
						<NavbarMenuItem className="flex flex-col gap-2 text-lg font-semibold text-primary">
							<p>Hi, {userData?.name}!</p>
						</NavbarMenuItem>
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
					</>
				)}
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
				{userData ? (
					<NavbarMenuItem className="flex flex-col gap-2 text-base">
						<button
							className="text-left underline cursor-pointer text-primary w-fit"
							onClick={logOut}
						>
							Logout
						</button>
					</NavbarMenuItem>
				) : (
					<>
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
					</>
				)}
			</NavbarMenu>
		</Navbar>
	);
}
