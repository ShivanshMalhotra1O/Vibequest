import { useEffect } from 'react';

export default function AboutPage() {
	useEffect(() => {
		document.title = 'Vibe Quest - About';
	}, []);
	return (
		<>
			<div>
				<img
					src="/images/about.jpg"
					alt="About"
					className="absolute top-0 z-0 object-cover w-full h-96 blur-sm brightness-[0.33]"
				/>
				<div className="flex flex-col items-center gap-4 px-4 py-16 mt-72 min-h-[calc(100dvh-485px)]">
					<div className="flex flex-col items-center max-w-5xl gap-4 text-justify">
						<h2 className="text-3xl font-bold">About Us</h2>
						<p className="text-lg">
							VibeQuest is a platform that offers a wide range of games for all
							ages. Whether you&apos;re a casual gamer or a hardcore gamer,
							you&apos;ll find something to suit your preferences. Our games are
							designed to be fun and engaging, with a variety of gameplay modes
							to keep you entertained. Whether you&apos;re looking for a quick
							pick-up or a more challenging game, we&apos;ve got you covered.
						</p>
						<p className="text-lg">
							Our games are developed by a team of talented developers who have
							put in countless hours of effort to create the best possible
							experience for our players. Whether you&apos;re a casual gamer or
							a hardcore gamer, you&apos;ll find something to suit your
							preferences. Our games are designed to be fun and engaging, with a
							variety of gameplay modes to keep you entertained. Whether
							you&apos;re looking for a quick pick-up or a more challenging
							game, we&apos;ve got you covered.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
