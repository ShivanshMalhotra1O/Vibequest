import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import AboutPage from '@/components/About';
import EmotionDetection from '@/components/EmotionDetection';
import HomePage from '@/components/Home';
import LoginPage from '@/components/Login';
import Parallax from '@/components/Parallax';
import SignUpPage from '@/components/SignUp';

import CoinQuest from '@/components/Games/CoinQuest';
import DonkeyKong from '@/components/Games/DonkeyKong';
import Pacman from '@/components/Games/Pacman';
import SnakeGame from '@/components/Games/Snake';
import SpaceInvaders from '@/components/Games/SpaceInvaders';

import { Route, Routes } from 'react-router';

function App() {
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
				<Route path="/emotion-detection" element={<EmotionDetection />} />

				<Route path="/games/coin-quest" element={<CoinQuest />} />
				<Route path="/games/donkey-kong" element={<DonkeyKong />} />
				<Route path="/games/pacman" element={<Pacman />} />
				<Route path="/games/snake-game" element={<SnakeGame />} />
				<Route path="/games/space-invaders" element={<SpaceInvaders />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
