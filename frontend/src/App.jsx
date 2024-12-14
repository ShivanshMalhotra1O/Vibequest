import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import AboutPage from '@/components/About';
import HomePage from '@/components/Home';

import { Route, Routes } from 'react-router';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
