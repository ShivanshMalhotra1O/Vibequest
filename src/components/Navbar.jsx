import { logOut, useUser } from '@/utils';
import {
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from '@nextui-org/react';
import { FaUserCircle } from 'react-icons/fa'; // Profile icon

export default function Nav() {
	const { data: userData } = useUser();

	return (
		<Navbar
			className="w-full px-2 py-2 text-white bg-black"
			classNames={{
				wrapper: 'max-w-full',
			}}
		>
			{/* Left Content: Logo */}
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

			{/* Right Content: Navigation Tags and Profile */}
			<NavbarContent
				className="ml-auto text-2xl font-medium flex items-center gap-4"
				justify="end"
			>
				{/* Home and About */}
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

				{/* Conditional Rendering: Login/Signup or User Info */}
				{userData ? (
					<Dropdown>
						<DropdownTrigger>
							<button className="flex items-center text-white">
								<FaUserCircle size={30} className="mr-2" />
								<span>Hi, {userData?.name}!</span>
							</button>
						</DropdownTrigger>
						<DropdownMenu aria-label="User Actions">
							<DropdownItem key="profile">
								<Link href="/profile">Profile</Link>
							</DropdownItem>
							<DropdownItem key="logout">
								<button
									className="w-full text-left text-red-500"
									onClick={logOut}
								>
									Logout
								</button>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				) : (
					<>
						{/* Login and Signup
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
						</NavbarItem> */}
					</>
				)}
			</NavbarContent>

			{/* Mobile Menu Toggle */}
			<NavbarContent justify="end" className="sm:hidden">
				<NavbarMenuToggle />
			</NavbarContent>
		</Navbar>
	);
}
