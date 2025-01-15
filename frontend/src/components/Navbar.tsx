import { logOut, useUser } from '@/utils';
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
} from '@nextui-org/react';
import { CircleUserRoundIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigation hook

export default function Nav() {
  const { data: userData } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize navigation hook

  // Handler for search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handler for search submission
  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      // Navigate to the game search page with the game name
      navigate(`/game?game=${searchTerm.trim().toLowerCase()}`);
    } else {
      alert('Please enter a game name to search.');
    }
  };

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

      {/* Center Content: Search Bar */}
      <NavbarContent className="flex-1 mx-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search games..."
            className="w-full px-4 py-2 rounded-lg border border-gray-500 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            onClick={handleSearchSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </NavbarContent>

      {/* Right Content: Navigation Tags */}
      <NavbarContent
        className="hidden gap-4 ml-auto text-2xl font-medium sm:flex"
        justify="end"
      >
        {userData ? (
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
        ) : (
          <NavbarItem>
            <a
              href="/leaderboard"
              className={`${
                window.location.pathname === '/leaderboard' ? 'text-primary' : ''
              }`}
            >
              Leaderboard
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
                      src={userData.image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <CircleUserRoundIcon className="w-8 h-8" />
                  )}
                </div>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="profile" as={Link} href="/profile">
                  Profile
                </DropdownItem>
                <DropdownItem key="leaderboard" as={Link} href="/leaderboard">
                  Leaderboard
                </DropdownItem>
                <DropdownItem
                  key="logout"
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
    </Navbar>
  );
}
