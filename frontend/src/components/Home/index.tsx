import { useEffect } from 'react';

import AboutSection from './AboutSection';
import HeroSection from './HeroSection';
import PopularGamesSection from './PopularGamesSection';

export default function HomePage() {
	useEffect(() => {
		document.title = 'Vibe Quest';
	}, []);
	return (
		<div>
			<HeroSection />
			<PopularGamesSection />
			<AboutSection />
		</div>
	);
}
