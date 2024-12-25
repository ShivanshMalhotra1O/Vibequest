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
// import SpaceInvaders from '@/components/Games/SpaceInvaders';

import GameComponent from '@/components/Games/GameComponent';
import GamePage from '@/components/Games/GamePage';

import Leaderboard from '@/components/Leaderboard';

import { useUser } from '@/utils';
import { Route, Routes, useNavigate } from 'react-router';
import { Toaster } from 'sonner';

function App() {
	const navigate = useNavigate();

	const { data, isLoading } = useUser();

	const path = window.location.pathname;
	const loginPages = ['/login', '/signup'];
	const nonAuthPages = [...loginPages, '/about', '/', '/leaderboard'];

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

				<Route path="/leaderboard" element={<Leaderboard />} />

				<Route path="/games" element={<GamePage />} />

				<Route
					path="/games/snake-game"
					element={<GameComponent gameName="snake_game" />}
				/>
				<Route path="/games/2048" element={<GameComponent gameName="2048" />} />
				<Route
					path="/games/space-invaders"
					element={<GameComponent gameName="space_invaders" />}
				/>
				<Route
					path="/games/car-game"
					element={<GameComponent gameName="car_game" />}
				/>
				<Route
					path="/games/coin-quest"
					element={<GameComponent gameName="coin_quest" />}
				/>

				<Route
					path="/games/chess"
					element={
						<GameComponent gameName="chess" toUpdateLeaderboard={false} />
					}
				/>
				{/* <Route path="/games/donkey-kong" element={<DonkeyKong />} /> */}
				{/* <Route path="/games/pacman" element={<Pacman />} /> */}
			</Routes>
			<Footer />
			<Toaster richColors />
		</>
	);
}

export default App;
