import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import AboutPage from '@/components/About';
import EmotionDetection from '@/components/EmotionDetection';
import HomePage from '@/components/Home';
import LoginPage from '@/components/Login';
import Parallax from '@/components/Parallax';
import SignUpPage from '@/components/SignUp';
import ProfilePage from './components/Profile';

// import CoinQuest from '@/components/Games/CoinQuest';
// import DonkeyKong from '@/components/Games/DonkeyKong';
// import Pacman from '@/components/Games/Pacman';
// import SnakeGame from '@/components/Games/Snake';
// import SpaceInvaders from '@/components/Games/SpaceInvaders';

import GamePage from '@/components/Games/GamePage';

import { useUser } from '@/utils';
import { Route, Routes, useNavigate } from 'react-router';
import { Toaster } from 'sonner';

function App() {
	const navigate = useNavigate();

	const { data, isLoading } = useUser();

	const path = window.location.pathname;
	const loginPages = ['/login', '/signup'];
	const nonAuthPages = [...loginPages, '/about', '/'];

	if (!isLoading && data && loginPages.includes(path)) {
		navigate('/home');
	}
	if (!isLoading && !data && !nonAuthPages.includes(path)) {
		navigate('/login');
	}

	return (
		<>
			<Navbar />
			<Routes>
				<Route index element={<Parallax />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/emotion-detection" element={<EmotionDetection />} />

				<Route path="/games" element={<GamePage />} />

				{/* <Route path="/games/coin-quest" element={<CoinQuest />} />
				<Route path="/games/donkey-kong" element={<DonkeyKong />} />
				<Route path="/games/pacman" element={<Pacman />} />
				<Route path="/games/snake-game" element={<SnakeGame />} />
				<Route path="/games/space-invaders" element={<SpaceInvaders />} /> */}
			</Routes>
			<Footer />
			<Toaster richColors />
		</>
	);
}

export default App;
