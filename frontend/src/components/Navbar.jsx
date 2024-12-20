import { logOut, toBase64, useUser } from '@/utils';
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@nextui-org/react';
import { CircleUserRoundIcon } from 'lucide-react';

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
						<Dropdown>
							<DropdownTrigger>
								<div className="flex items-center gap-2">
									<p>Hi, {userData?.name}!</p>
									{userData?.image ? (
										<img
											src={`data:image/png;base64,${toBase64(
												userData?.image?.data
											)}`}
											alt="Profile"
											className="w-8 h-8 rounded-full"
										/>
									) : (
										<CircleUserRoundIcon className="w-8 h-8" />
									)}
								</div>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem
									onPress={() => {
										window.location.href = '/profile';
									}}
								>
									Profile
								</DropdownItem>
								<DropdownItem
									color="danger"
									className="w-full text-danger"
									onPress={logOut}
								>
									Logout
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
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
				{userData && (
					<NavbarItem className="flex gap-2 text-base">
						<Dropdown>
							<DropdownTrigger>
								{userData?.image ? (
									<img
										src={`data:image/png;base64,${toBase64(
											userData?.image?.data
										)}`}
										alt="Profile"
										className="w-8 h-8 rounded-full"
									/>
								) : (
									<CircleUserRoundIcon className="w-8 h-8" />
								)}
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem>
									<p>Hi, {userData?.name}!</p>
								</DropdownItem>
								<DropdownItem
									as={Button}
									color="danger"
									className="w-full bg-danger text-danger-foreground"
									onPress={logOut}
									variant="faded"
								>
									Logout
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</NavbarItem>
				)}
			</NavbarContent>

			{/* Mobile Navigation Menu */}
			<NavbarMenu className="mt-2 text-3xl bg-black">
				{userData && (
					<>
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
				{!userData && (
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
